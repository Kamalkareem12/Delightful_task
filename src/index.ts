import dotenv from 'dotenv';
dotenv.config();

import { connectMongoDB, disconnectMongoDB } from './infrastructure/database/mongo.connection';
import { MongoPostRepository } from './infrastructure/database/repositories/mongo-post.repository';
import { KafkaEventProducer } from './infrastructure/messaging/kafka.producer';
import { KafkaEventConsumer } from './infrastructure/messaging/kafka.consumer';
import { CreatePostUseCase } from './application/use-cases/create-post.use-case';
import { GetPostUseCase } from './application/use-cases/get-post.use-case';
import { ListPostsUseCase } from './application/use-cases/list-posts.use-case';
import { PostController } from './api/controllers/post.controller';
import { createApp } from './api/app';

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/posts_db';

async function bootstrap() {
  console.log('[Bootstrap] Starting application...');

  // 1. Connect Database
  await connectMongoDB(MONGO_URI);

  // 2. Initialize Infrastructure
  const postRepository = new MongoPostRepository();
  const eventProducer = new KafkaEventProducer();
  const eventConsumer = new KafkaEventConsumer();

  // 3. Connect Kafka Producer & Consumer
  try {
    await eventProducer.connect();
    await eventConsumer.start();
  } catch (error) {
    console.warn('[Bootstrap] Kafka connection warning (will retry automatically):', error);
  }

  // 4. Initialize Application Use Cases
  const createPostUseCase = new CreatePostUseCase(postRepository, eventProducer);
  const getPostUseCase = new GetPostUseCase(postRepository);
  const listPostsUseCase = new ListPostsUseCase(postRepository);

  // 5. Initialize API Controller & Express App
  const postController = new PostController(
    createPostUseCase,
    getPostUseCase,
    listPostsUseCase
  );
  const app = createApp(postController);

  const server = app.listen(PORT, () => {
    console.log(`[Server] REST API listening on port ${PORT}`);
    console.log(`[Server] Endpoints:`);
    console.log(`  - POST /posts     -> Create post`);
    console.log(`  - GET  /posts     -> List posts`);
    console.log(`  - GET  /posts/:id -> Get post by ID`);
    console.log(`  - GET  /health    -> Health check`);
  });

  // Graceful shutdown
  const shutdown = async (signal: string) => {
    console.log(`\n[Server] Received ${signal}. Shutting down gracefully...`);
    server.close(async () => {
      await eventProducer.disconnect();
      await eventConsumer.stop();
      await disconnectMongoDB();
      console.log('[Server] Graceful shutdown completed.');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

bootstrap().catch((err) => {
  console.error('[Bootstrap] Fatal startup error:', err);
  process.exit(1);
});
