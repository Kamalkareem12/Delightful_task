import { Post } from '../../domain/entities/post.entity';
import { IPostRepository } from '../../domain/repositories/post.repository.interface';
import { IEventProducer } from '../ports/event-producer.interface';
import { PostCreatedEvent } from '../../domain/events/post-created.event';

export interface CreatePostDTO {
  title: string;
  content: string;
}

export class CreatePostUseCase {
  constructor(
    private readonly postRepository: IPostRepository,
    private readonly eventProducer: IEventProducer
  ) {}

  async execute(dto: CreatePostDTO): Promise<Post> {
    const post = new Post({
      title: dto.title,
      content: dto.content,
    });

    const savedPost = await this.postRepository.create(post);

    if (savedPost.id) {
      const event = new PostCreatedEvent({
        postId: savedPost.id,
        title: savedPost.title,
        content: savedPost.content,
        createdAt: savedPost.createdAt.toISOString(),
      });

      await this.eventProducer.publishPostCreated(event);
    }

    return savedPost;
  }
}
