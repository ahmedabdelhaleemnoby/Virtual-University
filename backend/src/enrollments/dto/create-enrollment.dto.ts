import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEnrollmentDto {
  @ApiProperty({ description: 'The ID of the subject to enroll in' })
  @IsString()
  @IsNotEmpty()
  subjectId: string;
}
