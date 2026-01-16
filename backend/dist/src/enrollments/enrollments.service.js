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
exports.EnrollmentsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let EnrollmentsService = class EnrollmentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(studentId, createEnrollmentDto) {
        const { subjectId } = createEnrollmentDto;
        const subject = await this.prisma.subject.findUnique({
            where: { id: subjectId },
        });
        if (!subject) {
            throw new common_1.NotFoundException(`Subject with ID ${subjectId} not found`);
        }
        const existing = await this.prisma.enrollment.findUnique({
            where: {
                studentId_subjectId: {
                    studentId,
                    subjectId,
                },
            },
        });
        if (existing) {
            throw new common_1.ConflictException('Student is already enrolled in this subject');
        }
        return this.prisma.enrollment.create({
            data: {
                studentId,
                subjectId,
                status: client_1.EnrollmentStatus.ACTIVE,
                enrolledAt: new Date(),
            },
            include: {
                subject: true,
            },
        });
    }
    async findMyEnrollments(studentId) {
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
};
exports.EnrollmentsService = EnrollmentsService;
exports.EnrollmentsService = EnrollmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EnrollmentsService);
//# sourceMappingURL=enrollments.service.js.map