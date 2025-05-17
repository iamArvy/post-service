import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // private model = this.prisma.user;

  // create(): Promise<PostDocument> {
  //   return this.prisma.user.create(data);
  // }

  async user(params: {
    where: Prisma.UserWhereUniqueInput;
    select?: Prisma.UserSelect;
  }): Promise<User | null> {
    return await this.prisma.user.findUnique(params);
  }

  // posts(filters: FilterQuery<Post>) {
  //   return this.model.find(filters);
  // }
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
