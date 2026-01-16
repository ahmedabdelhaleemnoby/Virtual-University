import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFacultyDto, UpdateFacultyDto } from './dto/faculty.dto';

@Injectable()
export class FacultiesService {
  constructor(private prisma: PrismaService) { }

  async create(createFacultyDto: CreateFacultyDto) {
    const existing = await this.prisma.faculty.findUnique({
      where: { slug: createFacultyDto.slug },
    });
    if (existing) {
      throw new ConflictException('Faculty with this slug already exists');
    }
    return this.prisma.faculty.create({
      data: createFacultyDto,
    });
  }

  async findAll() {
    return this.prisma.faculty.findMany({
      orderBy: { displayOrder: 'asc' },
    });
  }

  async findOne(id: string) {
    const faculty = await this.prisma.faculty.findUnique({
      where: { id },
      include: { departments: true },
    });
    if (!faculty) {
      throw new NotFoundException(`Faculty with ID ${id} not found`);
    }
    return faculty;
  }

  async update(id: string, updateFacultyDto: UpdateFacultyDto) {
    await this.findOne(id);
    if (updateFacultyDto.slug) {
      const existing = await this.prisma.faculty.findFirst({
        where: { slug: updateFacultyDto.slug, NOT: { id } },
      });
      if (existing) {
        throw new ConflictException('Another faculty with this slug already exists');
      }
    }
    return this.prisma.faculty.update({
      where: { id },
      data: updateFacultyDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.faculty.delete({
      where: { id },
    });
  }
}
