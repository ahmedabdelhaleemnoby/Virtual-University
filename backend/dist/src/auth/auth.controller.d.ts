import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            role: any;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            role: any;
        };
    }>;
}
