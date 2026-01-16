import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GoogleDriveProvider } from './providers/google-drive.provider';
import { VideoService } from './video.service';

@Module({
  imports: [ConfigModule],
  providers: [
    VideoService,
    GoogleDriveProvider,
  ],
  exports: [VideoService],
})
export class VideoModule { }
