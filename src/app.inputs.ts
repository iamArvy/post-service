import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreatePostInput {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Hi, This is a post creation test',
    description: 'Content for the post',
  })
  content: string;

  @IsArray()
  @ApiProperty({
    example: ['https://example.com/cat.jpg', 'https://example.com/dog.mp4'],
    description: 'An array containing the url for the media files in the post',
  })
  media: string[];
}

// export class UpdatePostInput implements PartialType<CreatePostInput> {}
