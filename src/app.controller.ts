import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './guards';

@Controller('posts')
export class AppController {
  constructor(private readonly service: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create_post(
    @Req() req: { user: string },
    @Body() data: { content: string; media: string[] },
  ) {
    const post = this.service.create_post(req.user, data);
    return post;
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/comment')
  create_comment(
    @Req() req: { user: string },
    @Param(':id') id: string,
    @Body() data: { content: string; media: string[] },
  ) {
    const post = this.service.create_child(req.user, id, data);
    return post;
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  async like_post(@Req() req: { user: string }, @Param(':id') id: string) {
    await this.service.like_post(req.user, id);
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/unlike')
  async unlike_post(@Req() req: { user: string }, @Param(':id') id: string) {
    await this.service.unlike_post(req.user, id);
    return true;
  }

  @Get(':id')
  get_post(@Param(':id') id: string) {
    this.service.get_post(id);
  }

  @Get('user/:id')
  get_user_post(@Param(':id') id: string) {
    this.service.get_user_posts(id);
  }

  @Get(':id/comments')
  get_post_children(@Param(':id') id: string) {
    this.service.get_children(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/update')
  update_post(@Req() req: { user: string }, @Param(':id') id: string) {
    this.service.update_post(req.user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/delete')
  async delete_post(@Req() req: { user: string }, @Param(':id') id: string) {
    await this.service.delete_post(req.user, id);
  }
}
