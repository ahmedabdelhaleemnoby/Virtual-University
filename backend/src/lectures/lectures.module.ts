import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { VideoModule } from '../video/video.module';
import { LecturesController } from './lectures.controller';
import { LecturesService } from './lectures.service';

@Module({
  imports: [PrismaModule, VideoModule],
  controllers: [LecturesController],
  providers: [LecturesService],
})
export class LecturesModule { }
