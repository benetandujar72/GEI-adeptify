import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            role: any;
            fullName: any;
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: import("../users/entities/user.entity").UserRole;
            status: import("../users/entities/user.entity").UserStatus;
            fullName: string;
        };
        message: string;
    }>;
    googleAuth(): Promise<void>;
    googleAuthRedirect(req: any): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: import("../users/entities/user.entity").UserRole;
            fullName: string;
        };
    }>;
    refreshToken(body: {
        refreshToken: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    changePassword(req: any, body: {
        oldPassword: string;
        newPassword: string;
    }): Promise<{
        message: string;
    }>;
    forgotPassword(body: {
        email: string;
    }): Promise<{
        message: string;
    }>;
    resetPassword(body: {
        token: string;
        newPassword: string;
    }): Promise<{
        message: string;
    }>;
    getProfile(req: any): Promise<{
        id: string;
        email: string;
        role: import("../users/entities/user.entity").UserRole;
        schoolId: string;
    }>;
    logout(): Promise<{
        message: string;
    }>;
}
