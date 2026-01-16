import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateDepartmentDto {
  @ApiProperty({ example: 'uuid-of-faculty' })
  @IsUUID()
  @IsNotEmpty()
  facultyId: string;

  @ApiProperty({ example: 'Computer Science Department' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'computer-science' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ example: 'Detailed description of the department', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'https://example.com/dept.jpg', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  displayOrder?: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) { }
