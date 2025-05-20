import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UseGuards } from '@nestjs/common';
import { Post } from './app.entity';
import { GqlAuthGuard } from './guards';
import { CreatePostInput } from './app.inputs';

@Resolver()
export class AppResolver {
  constructor(
    private readonly service: AppService,
    private readonly userService: UserService,
  ) {}

  @Query(() => String)
  health(): string {
    return 'OK';
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Post, { name: 'create' })
  async create_post(
    @Context() req: { user: string },
    @Args() data: CreatePostInput,
  ) {
    const user = await this.userService.user(req.user);
    const post = this.service.create(user, data);
    return post;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Post, { name: ':id/comment' })
  async create_comment(
    @Context() req: { user: string },
    @Args('id') pid: string,
    @Args() data: CreatePostInput,
  ) {
    const user = await this.userService.user(req.user);
    const post = await this.service.comment(user, data, pid);
    return post;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { name: ':id/like' })
  async like_post(@Context() req: { user: string }, @Args('id') id: string) {
    await this.service.like_post(req.user, id);
    return true;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { name: ':id/unlike' })
  async unlike_post(@Context() req: { user: string }, @Args('id') id: string) {
    await this.service.unlike_post(req.user, id);
    return true;
  }

  @Query(() => Post, { name: ':id' })
  get_post(@Args('id') id: string) {
    return this.service.get(id);
  }

  @Query(() => [Post], { name: 'user/:id' })
  get_user_post(@Args('id') id: string) {
    return this.service.get_user_posts(id);
  }

  @Query(() => [Post], { name: ':id/comments' })
  async get_post_children(@Args('id') id: string) {
    return await this.service.get_post_comments(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Post, { name: ':id/update' })
  async update_post(
    @Context() req: { user: string },
    @Args('id') id: string,
    @Args() data: CreatePostInput,
  ) {
    const post = await this.service.get_user_post(req.user, id);
    await post.updateOne(data);
    await post.save();
    return post;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Post, { name: ':id/delete' })
  async delete_post(@Context() req: { user: string }, @Args('id') id: string) {
    const post = await this.service.get_user_post(req.user, id);
    await post.deleteOne();
    return post;
  }
}
