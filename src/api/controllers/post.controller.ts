import { Request, Response, NextFunction } from 'express';
import { CreatePostUseCase } from '../../application/use-cases/create-post.use-case';
import { GetPostUseCase } from '../../application/use-cases/get-post.use-case';
import { ListPostsUseCase } from '../../application/use-cases/list-posts.use-case';

export class PostController {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly getPostUseCase: GetPostUseCase,
    private readonly listPostsUseCase: ListPostsUseCase
  ) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { title, content } = req.body;
      if (!title || typeof title !== 'string' || !content || typeof content !== 'string') {
        res.status(400).json({
          success: false,
          error: 'Title and content are required strings.',
        });
        return;
      }

      const post = await this.createPostUseCase.execute({ title, content });
      res.status(201).json({
        success: true,
        data: post.toJSON(),
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const post = await this.getPostUseCase.execute(id);

      if (!post) {
        res.status(404).json({
          success: false,
          error: `Post with ID "${id}" was not found.`,
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: post.toJSON(),
      });
    } catch (error) {
      next(error);
    }
  };

  list = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const posts = await this.listPostsUseCase.execute();
      res.status(200).json({
        success: true,
        data: posts.map((post) => post.toJSON()),
      });
    } catch (error) {
      next(error);
    }
  };
}
