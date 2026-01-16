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
exports.FacultiesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FacultiesService = class FacultiesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createFacultyDto) {
        const existing = await this.prisma.faculty.findUnique({
            where: { slug: createFacultyDto.slug },
        });
        if (existing) {
            throw new common_1.ConflictException('Faculty with this slug already exists');
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
    async findOne(id) {
        const faculty = await this.prisma.faculty.findUnique({
            where: { id },
            include: { departments: true },
        });
        if (!faculty) {
            throw new common_1.NotFoundException(`Faculty with ID ${id} not found`);
        }
        return faculty;
    }
    async update(id, updateFacultyDto) {
        await this.findOne(id);
        if (updateFacultyDto.slug) {
            const existing = await this.prisma.faculty.findFirst({
                where: { slug: updateFacultyDto.slug, NOT: { id } },
            });
            if (existing) {
                throw new common_1.ConflictException('Another faculty with this slug already exists');
            }
        }
        return this.prisma.faculty.update({
            where: { id },
            data: updateFacultyDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.faculty.delete({
            where: { id },
        });
    }
};
exports.FacultiesService = FacultiesService;
exports.FacultiesService = FacultiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FacultiesService);
//# sourceMappingURL=faculties.service.js.map