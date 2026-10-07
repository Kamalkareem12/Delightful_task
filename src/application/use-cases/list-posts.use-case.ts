import { Post } from '../../domain/entities/post.entity';
import { IPostRepository } from '../../domain/repositories/post.repository.interface';

export class ListPostsUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(): Promise<Post[]> {
    return this.postRepository.findAll();
  }
}
