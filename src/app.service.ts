import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PostService } from './post/post.service';
import { UserService } from './user/user.service';
import { LikeService } from './like/like.service';
import { CommentService } from './comment/comment.service';
import { ViewService } from './view/view.service';

@Injectable()
export class AppService {
  constructor(
    private post: PostService,
    private user: UserService,
    private like: LikeService,
    private comment: CommentService,
    private view: ViewService,
  ) {}

  private readonly logger = new Logger(PostService.name);

  async create_post(uid: string, data: { content: string; media: string[] }) {
    const user = await this.user.user({ where: { user_id: uid } });
    if (!user) throw new NotFoundException();
    const post = this.post.create({
      author_id: uid,
      author_username: user.name,
      author_avatar: user.avatar ?? undefined,
      content: data.content,
      media: data.media,
    });

    return post;
  }

  async create_child(
    uid: string,
    pid: string,
    data: { content: string; media: string[] },
  ) {
    const user = await this.user.user({ where: { user_id: uid } });
    if (!user) throw new NotFoundException();
    const parent = await this.post.post({ _id: pid });
    if (!parent) throw new NotFoundException('Post not found');

    const post = await this.post.create({
      author_id: uid,
      author_username: user.name,
      author_avatar: user.avatar ?? undefined,
      content: data.content,
      media: data.media,
      parent_id: pid,
    });

    if (!post) throw new ForbiddenException('Something went wrong');

    await this.comment.create({
      parent_post: pid,
      child_post: post.id as string,
    });
    parent.child_count++;
    await parent.save();

    return post;
  }

  async like_post(uid: string, pid: string) {
    // try {
    const post = await this.post.post({ _id: pid }).lean();
    if (!post) throw new NotFoundException();

    const user_like = await this.like.like({
      where: {
        post_id_user_id: {
          post_id: pid,
          user_id: uid,
        },
      },
    });

    if (user_like) throw new BadRequestException('User already liked post');

    await this.like.create({
      user: { connect: { user_id: uid } },
      post_id: pid,
    });
    post.like_count++;
    await post.save();
    return post;
    // } catch (error) {
    //   this.logger.error('Error creating post', error);
    //   throw new InternalServerErrorException('Unable to create post');
    // }
  }

  async unlike_post(uid: string, pid: string) {
    const post = await this.post.post({ _id: pid }).lean();
    if (!post) throw new NotFoundException();

    const user_like = await this.like.like({
      where: {
        post_id_user_id: {
          post_id: pid,
          user_id: uid,
        },
      },
    });

    if (!user_like) throw new BadRequestException("User hasn't liked post yet");

    await this.like.remove({
      post_id_user_id: {
        post_id: pid,
        user_id: uid,
      },
    });
    post.like_count--;
    await post.save();
    return post;
  }

  async get_post(pid: string) {
    const post = await this.post.post({ _id: pid }).lean();
    if (!post) throw new NotFoundException('Post not found');
    post.views_count++;
    await post.save();
    return post;
  }

  get_user_posts(aid: string) {
    return this.post
      .posts({
        author_id: aid,
      })
      .lean();
  }

  async get_children(pid: string) {
    const comments = await this.comment.comments({
      where: { parent_post: pid },
    });

    const postsIds = comments.map((comment) => comment.child_post);
    return this.post.posts({
      _id: { $in: postsIds },
    });
  }

  async update_post(
    uid: string,
    pid: string,
    data: { content: string; media: string[] },
  ) {
    const post = await this.post.post({ _id: pid });
    if (!post) throw new NotFoundException('Post not found');
    if (post.author_id !== uid)
      throw new UnauthorizedException('Only Owner of Post can edit post');

    await post.updateOne({ data });
    await post.save();
    return post;
  }

  async delete_post(uid: string, pid: string) {
    const post = await this.post.post({ _id: pid });
    if (!post) throw new NotFoundException('Post not found for user');
    if (post.author_id !== uid)
      throw new UnauthorizedException('Not Owner of Post');
    await post.deleteOne();
    return post;
  }
}
