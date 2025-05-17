import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './post.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private model: Model<PostDocument>,
  ) {}

  create(data: Partial<Post>): Promise<PostDocument> {
    return this.model.create(data);
  }

  post(filters: FilterQuery<Post>) {
    return this.model.findOne(filters);
  }

  posts(filters: FilterQuery<Post>) {
    return this.model.find(filters);
  }
  // create(createPostDto: CreatePostDto) {
  //   return 'This action adds a new post';
  // }

  // findAll() {
  //   return `This action returns all post`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} post`;
  // }

  // update(id: number, updatePostDto: UpdatePostDto) {
  //   return `This action updates a #${id} post`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} post`;
  // }
}
