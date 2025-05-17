import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.LikeCreateInput) {
    return await this.prisma.like.create({ data });
  }

  async like(params: { where: Prisma.LikeWhereUniqueInput }) {
    return await this.prisma.like.findUnique(params);
  }

  async remove(where: Prisma.LikeWhereUniqueInput) {
    return await this.prisma.like.delete({ where });
  }
}
