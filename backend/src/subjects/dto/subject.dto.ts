import { ApiProperty, PartialType } from '@nestjs/swagger';
import { DifficultyLevel, VideoProvider } from '@prisma/client';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min, MinLength } from 'class-validator';

export class CreateSubjectDto {
  @ApiProperty({ example: 'uuid-of-department' })
  @IsUUID()
  @IsNotEmpty()
  departmentId: string;

  @ApiProperty({ example: 'uuid-of-instructor', required: false })
  @IsUUID()
  @IsOptional()
  instructorId?: string;

  @ApiProperty({ example: 'Introduction to Web Development' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @ApiProperty({ example: 'web-development-intro' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ example: 'A comprehensive guide to modern web development', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'https://example.com/subject.jpg', required: false })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({ example: 49.99 })
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 'USD', required: false, default: 'USD' })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ example: 12, required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  durationWeeks?: number;

  @ApiProperty({ enum: DifficultyLevel, default: DifficultyLevel.BEGINNER })
  @IsEnum(DifficultyLevel)
  difficultyLevel: DifficultyLevel;

  @ApiProperty({ example: 'Basic Computer Knowledge', required: false })
  @IsOptional()
  @IsString()
  prerequisites?: string;

  @ApiProperty({ example: 'Build a full-stack app', required: false })
  @IsOptional()
  @IsString()
  learningOutcomes?: string;

  @ApiProperty({ enum: VideoProvider, default: VideoProvider.GOOGLE_DRIVE })
  @IsEnum(VideoProvider)
  videoProvider: VideoProvider;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) { }
