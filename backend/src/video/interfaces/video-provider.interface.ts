import { VideoProvider } from '@prisma/client';

export interface VideoMetadata {
  id: string;
  title: string;
  duration?: number; // in seconds
  thumbnailUrl?: string;
  provider: VideoProvider;
  embedUrl?: string;
  downloadUrl?: string;
}

export interface IVideoProvider {
  /**
   * Get metadata for a specific video
   */
  getVideoMetadata(videoId: string): Promise<VideoMetadata>;

  /**
   * Get a secure, temporary streaming URL or embed link
   */
  getStreamingUrl(videoId: string): Promise<string>;

  /**
   * Verify if a video exists and is accessible
   */
  validateVideo(videoId: string): Promise<boolean>;
}
