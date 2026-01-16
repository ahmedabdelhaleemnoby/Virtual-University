import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateSubjectDto, UpdateSubjectDto } from './dto/subject.dto';
import { SubjectsService } from './subjects.service';

@ApiTags('subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.INSTRUCTOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new subject (Admin/Instructor only)' })
  @ApiResponse({ status: 201, description: 'Subject created successfully' })
  async create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectsService.create(createSubjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all subjects' })
  @ApiQuery({ name: 'departmentId', required: false })
  @ApiResponse({ status: 200, description: 'Return all subjects' })
  async findAll(@Query('departmentId') departmentId?: string) {
    return this.subjectsService.findAll(departmentId);
  }

  @Get(':idOrSlug')
  @ApiOperation({ summary: 'Get a subject by ID or slug' })
  @ApiResponse({ status: 200, description: 'Return the subject' })
  @ApiResponse({ status: 404, description: 'Subject not found' })
  async findOne(@Param('idOrSlug') idOrSlug: string) {
    return this.subjectsService.findOne(idOrSlug);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.INSTRUCTOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a subject (Admin/Instructor only)' })
  @ApiResponse({ status: 200, description: 'Subject updated successfully' })
  async update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectsService.update(id, updateSubjectDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a subject (Admin only)' })
  @ApiResponse({ status: 200, description: 'Subject deleted successfully' })
  async remove(@Param('id') id: string) {
    return this.subjectsService.remove(id);
  }
}
