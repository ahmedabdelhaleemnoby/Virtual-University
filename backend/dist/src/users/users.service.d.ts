import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    update(id: string, data: Prisma.UserUpdateInput): Promise<User>;
    create(data: any): Promise<User>;
    remove(id: string): Promise<User>;
}
