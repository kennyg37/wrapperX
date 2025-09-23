import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
class AuthController {
    constructor( public readonly authService: AuthService ) {}
}