import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty({ example: 'My first post', description: 'Blog title', default: 'My first post' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'This is the content of my blog post.', default: 'This is the content of my blog post.' })
  @IsString()
  @IsNotEmpty()
  content: string;
}

export class UpdateBlogDto {
  @ApiPropertyOptional({ example: 'Updated title', default: 'Updated title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Updated content', default: 'Updated content' })
  @IsOptional()
  @IsString()
  content?: string;
}
