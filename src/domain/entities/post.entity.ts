export interface PostProps {
  id?: string;
  title: string;
  content: string;
  createdAt?: Date;
}

export class Post {
  private readonly _id?: string;
  private readonly _title: string;
  private readonly _content: string;
  private readonly _createdAt: Date;

  constructor(props: PostProps) {
    if (!props.title || props.title.trim() === '') {
      throw new Error('Post title cannot be empty.');
    }
    if (!props.content || props.content.trim() === '') {
      throw new Error('Post content cannot be empty.');
    }

    this._id = props.id;
    this._title = props.title.trim();
    this._content = props.content.trim();
    this._createdAt = props.createdAt || new Date();
  }

  get id(): string | undefined {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get content(): string {
    return this._content;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  toJSON() {
    return {
      id: this._id,
      title: this._title,
      content: this._content,
      createdAt: this._createdAt,
    };
  }
}
