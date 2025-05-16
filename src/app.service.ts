import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  create_post() {}

  create_comment() {}

  create_reply() {}

  like() {}

  get_post() {}

  get_user_posts() {}

  get_comments() {}

  get_replies() {}
}
