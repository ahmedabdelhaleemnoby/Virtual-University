import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateFacultyDto {
  @ApiProperty({ example: 'Faculty of Engineering' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'engineering' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ example: 'Detailed description of the faculty', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
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

export class UpdateFacultyDto extends PartialType(CreateFacultyDto) { }
