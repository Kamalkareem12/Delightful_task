export interface PostCreatedPayload {
  postId: string;
  title: string;
  content: string;
  createdAt: string;
}

export class PostCreatedEvent {
  public readonly eventName = 'post.created';
  public readonly occurredOn: Date;
  public readonly payload: PostCreatedPayload;

  constructor(payload: PostCreatedPayload) {
    this.occurredOn = new Date();
    this.payload = payload;
  }
}
