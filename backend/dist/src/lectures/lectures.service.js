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
exports.LecturesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const video_service_1 = require("../video/video.service");
let LecturesService = class LecturesService {
    prisma;
    videoService;
    constructor(prisma, videoService) {
        this.prisma = prisma;
        this.videoService = videoService;
    }
    async create(createDto) {
        const subject = await this.prisma.subject.findUnique({
            where: { id: createDto.subjectId },
        });
        if (!subject) {
            throw new common_1.NotFoundException(`Subject with ID ${createDto.subjectId} not found`);
        }
        const { provider, ...rest } = createDto;
        return this.prisma.videoLecture.create({
            data: {
                ...rest,
                videoProvider: provider,
            },
        });
    }
    async findAll(subjectId) {
        return this.prisma.videoLecture.findMany({
            where: { subjectId },
            orderBy: { displayOrder: 'asc' },
        });
    }
    async findOne(id) {
        const lecture = await this.prisma.videoLecture.findUnique({
            where: { id },
            include: { subject: true },
        });
        if (!lecture) {
            throw new common_1.NotFoundException(`Lecture with ID ${id} not found`);
        }
        const streamingUrl = await this.videoService.getStreamingUrl(lecture.videoProvider, lecture.providerVideoId);
        return {
            ...lecture,
            streamingUrl,
        };
    }
    async update(id, updateDto) {
        await this.findOne(id);
        return this.prisma.videoLecture.update({
            where: { id },
            data: updateDto,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.videoLecture.delete({
            where: { id },
        });
    }
};
exports.LecturesService = LecturesService;
exports.LecturesService = LecturesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        video_service_1.VideoService])
], LecturesService);
//# sourceMappingURL=lectures.service.js.map