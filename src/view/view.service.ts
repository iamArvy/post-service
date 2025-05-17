import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ViewService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ViewCreateInput) {
    return await this.prisma.view.create({ data });
  }

  async remove(where: Prisma.ViewWhereUniqueInput) {
    return await this.prisma.view.delete({ where });
  }
}
