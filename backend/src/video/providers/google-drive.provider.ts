import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VideoProvider } from '@prisma/client';
import { drive_v3, google } from 'googleapis';
import { IVideoProvider, VideoMetadata } from '../interfaces/video-provider.interface';

@Injectable()
export class GoogleDriveProvider implements IVideoProvider {
  private drive: drive_v3.Drive;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GOOGLE_DRIVE_API_KEY');
    this.drive = google.drive({ version: 'v3', auth: apiKey });
  }

  async getVideoMetadata(videoId: string): Promise<VideoMetadata> {
    try {
      const response = await this.drive.files.get({
        fileId: videoId,
        fields: 'id, name, videoMediaMetadata, thumbnailLink, webViewLink, webContentLink',
      });

      const file = response.data;

      return {
        id: file.id || videoId,
        title: file.name || 'Untitled Video',
        duration: file.videoMediaMetadata?.durationMillis
          ? Math.round(Number(file.videoMediaMetadata.durationMillis) / 1000)
          : undefined,
        thumbnailUrl: file.thumbnailLink ?? undefined,
        provider: VideoProvider.GOOGLE_DRIVE,
        embedUrl: file.webViewLink?.replace('/view', '/preview') ?? undefined,
        downloadUrl: file.webContentLink ?? undefined,
      };
    } catch (error) {
      if (error.code === 404) {
        throw new NotFoundException(`Google Drive file ${videoId} not found or not public`);
      }
      throw new InternalServerErrorException('Error fetching Google Drive metadata');
    }
  }

  async getStreamingUrl(videoId: string): Promise<string> {
    const metadata = await this.getVideoMetadata(videoId);
    return metadata.embedUrl || '';
  }

  async validateVideo(videoId: string): Promise<boolean> {
    try {
      await this.drive.files.get({ fileId: videoId, fields: 'id' });
      return true;
    } catch {
      return false;
    }
  }
}
