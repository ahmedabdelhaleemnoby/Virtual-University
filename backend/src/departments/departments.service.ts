import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto/department.dto';

@Injectable()
export class DepartmentsService {
  constructor(private prisma: PrismaService) { }

  async create(createDepartmentDto: CreateDepartmentDto) {
    // Check faculty existence
    const faculty = await this.prisma.faculty.findUnique({
      where: { id: createDepartmentDto.facultyId },
    });
    if (!faculty) {
      throw new NotFoundException(`Faculty with ID ${createDepartmentDto.facultyId} not found`);
    }

    const existing = await this.prisma.department.findUnique({
      where: { slug: createDepartmentDto.slug },
    });
    if (existing) {
      throw new ConflictException('Department with this slug already exists');
    }

    return this.prisma.department.create({
      data: createDepartmentDto,
    });
  }

  async findAll(facultyId?: string) {
    return this.prisma.department.findMany({
      where: facultyId ? { facultyId } : {},
      orderBy: { displayOrder: 'asc' },
      include: { faculty: { select: { name: true } } },
    });
  }

  async findOne(id: string) {
    const department = await this.prisma.department.findUnique({
      where: { id },
      include: { faculty: true, subjects: true },
    });
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return department;
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    await this.findOne(id);
    if (updateDepartmentDto.slug) {
      const existing = await this.prisma.department.findFirst({
        where: { slug: updateDepartmentDto.slug, NOT: { id } },
      });
      if (existing) {
        throw new ConflictException('Another department with this slug already exists');
      }
    }
    return this.prisma.department.update({
      where: { id },
      data: updateDepartmentDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.department.delete({
      where: { id },
    });
  }
}
