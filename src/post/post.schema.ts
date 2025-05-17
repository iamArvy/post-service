import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({
  timestamps: true,
  collection: 'messages',
})
export class Post {
  @Prop({ required: true })
  author_id: string;

  @Prop({ required: true })
  author_username: string;

  @Prop({ required: true, type: 'string' })
  author_avatar: string | null;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  media: string[];

  @Prop()
  parent_id: string;

  @Prop({ required: true, default: 0 })
  like_count: number;

  @Prop()
  child_count: number;

  @Prop()
  views_count: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
