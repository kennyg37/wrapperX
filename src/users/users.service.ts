import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

type SafeUser = Omit<User, 'password'>;

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async create(data: Prisma.UserCreateInput): Promise<SafeUser> {
        return this.prisma.user.create({
            data,
            select: {
                id: true,
                email: true,
                username: true,
                firstName: true,
                lastName: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    async findAll(): Promise<SafeUser[]> {
        return this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                username: true,
                firstName: true,
                lastName: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    async findOne(id: string): Promise<SafeUser | null> {
        return this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                username: true,
                firstName: true,
                lastName: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    async update(id: string, data: Prisma.UserUpdateInput): Promise<SafeUser> {
        return this.prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                email: true,
                username: true,
                firstName: true,
                lastName: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    async remove(id: string): Promise<SafeUser> {
        return this.prisma.user.delete({
            where: { id },
            select: {
                id: true,
                email: true,
                username: true,
                firstName: true,
                lastName: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
}
