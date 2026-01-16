"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let SubjectsService = class SubjectsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createSubjectDto) {
        const dept = await this.prisma.department.findUnique({
            where: { id: createSubjectDto.departmentId },
        });
        if (!dept) {
            throw new common_1.NotFoundException(`Department with ID ${createSubjectDto.departmentId} not found`);
        }
        const existing = await this.prisma.subject.findUnique({
            where: { slug: createSubjectDto.slug },
        });
        if (existing) {
            throw new common_1.ConflictException('Subject with this slug already exists');
        }
        const { price, ...rest } = createSubjectDto;
        return this.prisma.subject.create({
            data: {
                ...rest,
                price: new client_1.Prisma.Decimal(price),
            },
        });
    }
    async findAll(departmentId) {
        return this.prisma.subject.findMany({
            where: departmentId ? { departmentId } : {},
            include: {
                department: { select: { name: true, faculty: { select: { name: true } } } },
                instructor: { select: { firstName: true, lastName: true } },
            },
        });
    }
    async findOne(idOrSlug) {
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
            throw new common_1.NotFoundException(`Subject not found`);
        }
        return subject;
    }
    async update(id, updateSubjectDto) {
        await this.findOne(id);
        if (updateSubjectDto.slug) {
            const existing = await this.prisma.subject.findFirst({
                where: { slug: updateSubjectDto.slug, NOT: { id } },
            });
            if (existing) {
                throw new common_1.ConflictException('Another subject with this slug already exists');
            }
        }
        const { price, ...rest } = updateSubjectDto;
        const data = { ...rest };
        if (price !== undefined) {
            data.price = new client_1.Prisma.Decimal(price);
        }
        return this.prisma.subject.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.subject.delete({
            where: { id },
        });
    }
};
exports.SubjectsService = SubjectsService;
exports.SubjectsService = SubjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubjectsService);
//# sourceMappingURL=subjects.service.js.map