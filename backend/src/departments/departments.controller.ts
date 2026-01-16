import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto/department.dto';

@ApiTags('departments')
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new department (Admin only)' })
  @ApiResponse({ status: 201, description: 'Department created successfully' })
  async create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all departments' })
  @ApiQuery({ name: 'facultyId', required: false, description: 'Filter by faculty ID' })
  @ApiResponse({ status: 200, description: 'Return all departments' })
  async findAll(@Query('facultyId') facultyId?: string) {
    return this.departmentsService.findAll(facultyId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a department by ID' })
  @ApiResponse({ status: 200, description: 'Return the department' })
  @ApiResponse({ status: 404, description: 'Department not found' })
  async findOne(@Param('id') id: string) {
    return this.departmentsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a department (Admin only)' })
  @ApiResponse({ status: 200, description: 'Department updated successfully' })
  async update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentsService.update(id, updateDepartmentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a department (Admin only)' })
  @ApiResponse({ status: 200, description: 'Department deleted successfully' })
  async remove(@Param('id') id: string) {
    return this.departmentsService.remove(id);
  }
}
