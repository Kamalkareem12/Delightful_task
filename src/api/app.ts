import express, { Application } from 'express';
import cors from 'cors';
import { PostController } from './controllers/post.controller';
import { createPostRoutes } from './routes/post.routes';
import { errorHandler } from './middlewares/error.middleware';

import { getDashboardHtml } from './views/dashboard';

export function createApp(postController: PostController): Application {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Interactive UI Dashboard at root
  app.get('/', (_req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(getDashboardHtml());
  });

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
