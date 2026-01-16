import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubjectDto, UpdateSubjectDto } from './dto/subject.dto';

@Injectable()
export class SubjectsService {
  constructor(private prisma: PrismaService) { }

  async create(createSubjectDto: CreateSubjectDto) {
    // Check department existence
    const dept = await this.prisma.department.findUnique({
      where: { id: createSubjectDto.departmentId },
    });
    if (!dept) {
      throw new NotFoundException(`Department with ID ${createSubjectDto.departmentId} not found`);
    }

    // Check slug uniqueness
    const existing = await this.prisma.subject.findUnique({
      where: { slug: createSubjectDto.slug },
    });
    if (existing) {
      throw new ConflictException('Subject with this slug already exists');
    }

    const { price, ...rest } = createSubjectDto;

    return this.prisma.subject.create({
      data: {
        ...rest,
        price: new Prisma.Decimal(price),
      },
    });
  }

  async findAll(departmentId?: string) {
    return this.prisma.subject.findMany({
      where: departmentId ? { departmentId } : {},
      include: {
        department: { select: { name: true, faculty: { select: { name: true } } } },
        instructor: { select: { firstName: true, lastName: true } },
      },
    });
  }

  async findOne(idOrSlug: string) {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrSlug);

    const subject = await this.prisma.subject.findUnique({
      where: isUuid ? { id: idOrSlug } : { slug: idOrSlug },
      include: {
        department: { include: { faculty: true } },
        instructor: true,
        videos: { orderBy: { displayOrder: 'asc' } },
        materials: { orderBy: { displayOrder: 'asc' } },
      },
    });

    if (!subject) {
      throw new NotFoundException(`Subject not found`);
    }
    return subject;
  }

  async update(id: string, updateSubjectDto: UpdateSubjectDto) {
    await this.findOne(id);

    if (updateSubjectDto.slug) {
      const existing = await this.prisma.subject.findFirst({
        where: { slug: updateSubjectDto.slug, NOT: { id } },
      });
      if (existing) {
        throw new ConflictException('Another subject with this slug already exists');
      }
    }

    const { price, ...rest } = updateSubjectDto;
    const data: any = { ...rest };
    if (price !== undefined) {
      data.price = new Prisma.Decimal(price);
    }

    return this.prisma.subject.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.subject.delete({
      where: { id },
    });
  }
}
