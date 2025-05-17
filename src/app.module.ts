import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { PrismaService } from './prisma/prisma.service';
import { CommentService } from './comment/comment.service';
import { LikeService } from './like/like.service';
import { ViewService } from './view/view.service';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './strategies';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PostModule,
    MongooseModule.forRoot(process.env.MONGO_DB_URL || ''),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    CommentService,
    LikeService,
    ViewService,
    UserService,
    JwtStrategy,
  ],
})
export class AppModule {}
