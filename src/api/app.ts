import express, { Application } from 'express';
import cors from 'cors';
import { PostController } from './controllers/post.controller';
import { createPostRoutes } from './routes/post.routes';
import { errorHandler } from './middlewares/error.middleware';

export function createApp(postController: PostController): Application {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Health check endpoint
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
  });

  // REST API routes for Posts
  app.use('/posts', createPostRoutes(postController));

  // Global Error Handler
  app.use(errorHandler);

  return app;
}
