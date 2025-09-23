import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async signup(dto: AuthDto) {
        const hash = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hash,
                firstName: dto.firstName ?? "",
                lastName: dto.lastName ?? ""
            }
        })

        return user;
    }

    async login(dto: AuthDto) {
        const hash = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email }
        });
        if (!user) {
            return "User not found";
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) {
            return "Invalid password";
        }
        return {
            message: "Login successful",
            user: { 
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                id: user.id
            }
        }
    }

}