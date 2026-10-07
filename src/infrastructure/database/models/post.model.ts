import mongoose, { Document, Schema } from 'mongoose';

export interface IPostDocument extends Document {
  title: string;
  content: string;
  createdAt: Date;
}

const PostSchema = new Schema<IPostDocument>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

export const PostModel = mongoose.model<IPostDocument>('Post', PostSchema);
