import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findOne(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async create(data: any): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const rawPassword = data.password || data.passwordHash;
    const hashedPassword = await bcrypt.hash(rawPassword, salt);

    const { password, ...rest } = data;

    return this.prisma.user.create({
      data: {
        ...rest,
        passwordHash: hashedPassword,
      },
    });
  }

  async remove(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
