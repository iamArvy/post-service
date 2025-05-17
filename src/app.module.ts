import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { ViewModule } from './view/view.module';
import { ReplyModule } from './reply/reply.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [PostModule, CommentModule, ReplyModule, UserModule, LikeModule, ViewModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
