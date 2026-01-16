import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VideoService } from '../video/video.service';
import { CreateVideoLectureDto, UpdateVideoLectureDto } from './dto/lecture.dto';

@Injectable()
export class LecturesService {
  constructor(
    private prisma: PrismaService,
    private videoService: VideoService,
  ) { }

  async create(createDto: CreateVideoLectureDto) {
    // Validate subject existence
    const subject = await this.prisma.subject.findUnique({
      where: { id: createDto.subjectId },
    });
    if (!subject) {
      throw new NotFoundException(`Subject with ID ${createDto.subjectId} not found`);
    }

    // Optional: Validate video exists on the provider
    // await this.videoService.validateVideo(createDto.provider, createDto.providerVideoId);

    const { provider, ...rest } = createDto;

    return this.prisma.videoLecture.create({
      data: {
        ...rest,
        videoProvider: provider,
      },
    });
  }

  async findAll(subjectId: string) {
    return this.prisma.videoLecture.findMany({
      where: { subjectId },
      orderBy: { displayOrder: 'asc' },
    });
  }

  async findOne(id: string) {
    const lecture = await this.prisma.videoLecture.findUnique({
      where: { id },
      include: { subject: true },
    });
    if (!lecture) {
      throw new NotFoundException(`Lecture with ID ${id} not found`);
    }

    // Fetch the actual streaming/embed URL from the provider
    const streamingUrl = await this.videoService.getStreamingUrl(
      lecture.videoProvider,
      lecture.providerVideoId,
    );

    return {
      ...lecture,
      streamingUrl,
    };
  }

  async update(id: string, updateDto: UpdateVideoLectureDto) {
    await this.findOne(id);
    return this.prisma.videoLecture.update({
      where: { id },
      data: updateDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.videoLecture.delete({
      where: { id },
    });
  }
}
