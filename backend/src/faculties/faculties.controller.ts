import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateFacultyDto, UpdateFacultyDto } from './dto/faculty.dto';
import { FacultiesService } from './faculties.service';

@ApiTags('faculties')
@Controller('faculties')
export class FacultiesController {
  constructor(private readonly facultiesService: FacultiesService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new faculty (Admin only)' })
  @ApiResponse({ status: 201, description: 'Faculty created successfully' })
  async create(@Body() createFacultyDto: CreateFacultyDto) {
    return this.facultiesService.create(createFacultyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all faculties' })
  @ApiResponse({ status: 200, description: 'Return all faculties' })
  async findAll() {
    return this.facultiesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a faculty by ID' })
  @ApiResponse({ status: 200, description: 'Return the faculty' })
  @ApiResponse({ status: 404, description: 'Faculty not found' })
  async findOne(@Param('id') id: string) {
    return this.facultiesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a faculty (Admin only)' })
  @ApiResponse({ status: 200, description: 'Faculty updated successfully' })
  async update(@Param('id') id: string, @Body() updateFacultyDto: UpdateFacultyDto) {
    return this.facultiesService.update(id, updateFacultyDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a faculty (Admin only)' })
  @ApiResponse({ status: 200, description: 'Faculty deleted successfully' })
  async remove(@Param('id') id: string) {
    return this.facultiesService.remove(id);
  }
}
