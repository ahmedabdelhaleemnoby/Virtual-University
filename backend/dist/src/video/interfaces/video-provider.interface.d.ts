import { VideoProvider } from '@prisma/client';
export interface VideoMetadata {
    id: string;
    title: string;
    duration?: number;
    thumbnailUrl?: string;
    provider: VideoProvider;
    embedUrl?: string;
    downloadUrl?: string;
}
export interface IVideoProvider {
    getVideoMetadata(videoId: string): Promise<VideoMetadata>;
    getStreamingUrl(videoId: string): Promise<string>;
    validateVideo(videoId: string): Promise<boolean>;
}
