import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { EnrollmentsService } from './enrollments.service';

@ApiTags('enrollments')
@Controller('enrollments')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) { }

  @Post()
  @Roles(UserRole.STUDENT, UserRole.ADMIN)
  @ApiOperation({ summary: 'Enroll a student in a subject' })
  @ApiResponse({ status: 201, description: 'Successfully enrolled' })
  async create(@Request() req: any, @Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentsService.create(req.user.id, createEnrollmentDto);
  }

  @Get('my')
  @Roles(UserRole.STUDENT, UserRole.ADMIN, UserRole.INSTRUCTOR)
  @ApiOperation({ summary: 'Get current user enrollments' })
  @ApiResponse({ status: 200, description: 'Returns enrollments' })
  async findMy(@Request() req: any) {
    return this.enrollmentsService.findMyEnrollments(req.user.id);
  }
}
