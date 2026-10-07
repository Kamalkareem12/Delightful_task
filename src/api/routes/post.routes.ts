import { Router } from 'express';
import { PostController } from '../controllers/post.controller';

export function createPostRoutes(postController: PostController): Router {
  const router = Router();

  router.post('/', postController.create);
  router.get('/', postController.list);
  router.get('/:id', postController.getById);

  return router;
}
