import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { EnrollmentStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) { }

  async create(studentId: string, createEnrollmentDto: CreateEnrollmentDto) {
    const { subjectId } = createEnrollmentDto;

    // Check if subject exists
    const subject = await this.prisma.subject.findUnique({
      where: { id: subjectId },
    });
    if (!subject) {
      throw new NotFoundException(`Subject with ID ${subjectId} not found`);
    }

    // Check if already enrolled
    const existing = await this.prisma.enrollment.findUnique({
      where: {
        studentId_subjectId: {
          studentId,
          subjectId,
        },
      },
    });

    if (existing) {
      throw new ConflictException('Student is already enrolled in this subject');
    }

    return this.prisma.enrollment.create({
      data: {
        studentId,
        subjectId,
        status: EnrollmentStatus.ACTIVE, // Default to ACTIVE for now
        enrolledAt: new Date(),
      },
      include: {
        subject: true,
      },
    });
  }

  async findMyEnrollments(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: { studentId },
      include: {
        subject: {
          include: {
            department: {
              include: { faculty: true },
            },
            instructor: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
      orderBy: { enrolledAt: 'desc' },
    });
  }
}
