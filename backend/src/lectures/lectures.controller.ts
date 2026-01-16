import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateVideoLectureDto, UpdateVideoLectureDto } from './dto/lecture.dto';
import { LecturesService } from './lectures.service';

@ApiTags('lectures')
@Controller('lectures')
export class LecturesController {
  constructor(private readonly lecturesService: LecturesService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.INSTRUCTOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new video lecture (Admin/Instructor only)' })
  @ApiResponse({ status: 201, description: 'Lecture created successfully' })
  async create(@Body() createDto: CreateVideoLectureDto) {
    return this.lecturesService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all lectures for a subject' })
  @ApiQuery({ name: 'subjectId', required: true })
  @ApiResponse({ status: 200, description: 'Return all lectures for the subject' })
  async findAll(@Query('subjectId') subjectId: string) {
    return this.lecturesService.findAll(subjectId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific lecture with streaming details' })
  @ApiResponse({ status: 200, description: 'Return the lecture' })
  @ApiResponse({ status: 404, description: 'Lecture not found' })
  async findOne(@Param('id') id: string) {
    return this.lecturesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.INSTRUCTOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a lecture (Admin/Instructor only)' })
  @ApiResponse({ status: 200, description: 'Lecture updated successfully' })
  async update(@Param('id') id: string, @Body() updateDto: UpdateVideoLectureDto) {
    return this.lecturesService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a lecture (Admin only)' })
  @ApiResponse({ status: 200, description: 'Lecture deleted successfully' })
  async remove(@Param('id') id: string) {
    return this.lecturesService.remove(id);
  }
}
