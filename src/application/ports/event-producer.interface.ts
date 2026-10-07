import { PostCreatedEvent } from '../../domain/events/post-created.event';

export interface IEventProducer {
  publishPostCreated(event: PostCreatedEvent): Promise<void>;
}
