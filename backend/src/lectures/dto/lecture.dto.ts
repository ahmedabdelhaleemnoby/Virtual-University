import { ApiProperty, PartialType } from '@nestjs/swagger';
import { VideoProvider } from '@prisma/client';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateVideoLectureDto {
  @ApiProperty({ example: 'uuid-of-subject' })
  @IsUUID()
  @IsNotEmpty()
  subjectId: string;

  @ApiProperty({ example: 'Lecture 1: Introduction' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Detailed overview of the course' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '1A2B3C4D5E6F' })
  @IsString()
  @IsNotEmpty()
  providerVideoId: string;

  @ApiProperty({ enum: VideoProvider, default: VideoProvider.GOOGLE_DRIVE })
  @IsEnum(VideoProvider)
  provider: VideoProvider;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(0)
  displayOrder: number;

  @ApiProperty({ example: true, default: true })
  @IsOptional()
  @IsBoolean()
  isFree?: boolean;

  @ApiProperty({ example: true, default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateVideoLectureDto extends PartialType(CreateVideoLectureDto) { }
