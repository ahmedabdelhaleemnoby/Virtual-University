import { BadRequestException, Injectable } from '@nestjs/common';
import { VideoProvider } from '@prisma/client';
import { IVideoProvider } from './interfaces/video-provider.interface';
import { GoogleDriveProvider } from './providers/google-drive.provider';

@Injectable()
export class VideoService {
  constructor(
    private googleDriveProvider: GoogleDriveProvider,
    // Add more providers here (VimeoProvider, S3Provider, etc.)
  ) { }

  /**
   * Returns the appropriate provider implementation
   */
  private getProvider(provider: VideoProvider): IVideoProvider {
    switch (provider) {
      case VideoProvider.GOOGLE_DRIVE:
        return this.googleDriveProvider;
      default:
        throw new BadRequestException(`Video provider ${provider} is not supported yet`);
    }
  }

  async getVideoMetadata(provider: VideoProvider, videoId: string) {
    return this.getProvider(provider).getVideoMetadata(videoId);
  }

  async getStreamingUrl(provider: VideoProvider, videoId: string) {
    return this.getProvider(provider).getStreamingUrl(videoId);
  }

  async validateVideo(provider: VideoProvider, videoId: string) {
    return this.getProvider(provider).validateVideo(videoId);
  }
}
