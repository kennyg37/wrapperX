import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService ) {}

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        console.log(dto);
        if (!dto.email || !dto.password) {
            return "Email and password are required";
        }
        return this.authService.signup(dto);
    }

    @Post('login')
    login(@Body() dto: AuthDto) {
        if (!dto.email || !dto.password) {
            return "Email and password are required";
        }
        return this.authService.login(dto);
    }
}