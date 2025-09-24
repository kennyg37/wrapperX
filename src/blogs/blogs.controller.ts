import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { BlogsService } from './blogs.service';
import { CreateBlogDto, UpdateBlogDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('blogs')
@ApiBearerAuth('access-token')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    description: 'Create a blog',
    examples: {
      basic: {
        summary: 'Basic blog',
        value: { title: 'Hello World', content: 'First post content' },
      },
      longForm: {
        summary: 'Long-form blog',
        value: { title: 'Deep Dive', content: 'Lots of detailed content about a topic.' },
      },
    },
  })
  create(@Body() createBlogDto: CreateBlogDto, @Request() req) {
    return this.blogsService.create(createBlogDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto, @Request() req) {
    return this.blogsService.update(id, updateBlogDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.blogsService.remove(id, req.user.id);
  }
}
