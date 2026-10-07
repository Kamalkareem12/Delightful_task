import { Post } from '../../domain/entities/post.entity';
import { IPostRepository } from '../../domain/repositories/post.repository.interface';

export class GetPostUseCase {
  constructor(private readonly postRepository: IPostRepository) {}

  async execute(id: string): Promise<Post | null> {
    if (!id || id.trim() === '') {
      throw new Error('Post ID must be provided.');
    }
    return this.postRepository.findById(id.trim());
  }
}
