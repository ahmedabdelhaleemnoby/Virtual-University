import { UserRole } from '@prisma/client';
export declare class RegisterDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: UserRole;
    country?: string;
    phone?: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
