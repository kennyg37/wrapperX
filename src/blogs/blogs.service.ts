import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto, UpdateBlogDto } from './dto';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) {}

  async create(createBlogDto: CreateBlogDto, authorId: string) {
    return this.prisma.blog.create({
      data: {
        ...createBlogDto,
        authorId,
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.blog.findMany({
      include: {
        author: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.blog.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async update(id: string, updateBlogDto: UpdateBlogDto, userId: string) {
    const blog = await this.prisma.blog.findUnique({
      where: { id },
    });

    if (!blog || blog.authorId !== userId) {
      throw new Error('Blog not found or unauthorized');
    }

    return this.prisma.blog.update({
      where: { id },
      data: updateBlogDto,
      include: {
        author: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async remove(id: string, userId: string) {
    const blog = await this.prisma.blog.findUnique({
      where: { id },
    });

    if (!blog || blog.authorId !== userId) {
      throw new Error('Blog not found or unauthorized');
    }

    return this.prisma.blog.delete({
      where: { id },
    });
  }
}
