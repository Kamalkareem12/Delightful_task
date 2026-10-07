import { IPostRepository } from '../../../domain/repositories/post.repository.interface';
import { Post } from '../../../domain/entities/post.entity';
import { PostModel, IPostDocument } from '../models/post.model';

export class MongoPostRepository implements IPostRepository {
  private toDomain(doc: IPostDocument): Post {
    return new Post({
      id: doc._id.toString(),
      title: doc.title,
      content: doc.content,
      createdAt: doc.createdAt,
    });
  }

  async create(post: Post): Promise<Post> {
    const createdDoc = await PostModel.create({
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
    });

    return this.toDomain(createdDoc);
  }

  async findById(id: string): Promise<Post | null> {
    try {
      const doc = await PostModel.findById(id).exec();
      if (!doc) {
        return null;
      }
      return this.toDomain(doc);
    } catch {
      // Invalid ObjectId format will return null
      return null;
    }
  }

  async findAll(): Promise<Post[]> {
    const docs = await PostModel.find().sort({ createdAt: -1 }).exec();
    return docs.map((doc) => this.toDomain(doc));
  }
}
