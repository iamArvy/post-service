import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CommentCreateInput) {
    return await this.prisma.comment.create({ data });
  }

  async comments(params: { where: Prisma.CommentWhereInput }) {
    return await this.prisma.comment.findMany(params);
  }

  async remove(where: Prisma.CommentWhereUniqueInput) {
    return await this.prisma.comment.delete({ where });
  }
}
