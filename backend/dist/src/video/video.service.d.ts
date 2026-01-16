import { VideoProvider } from '@prisma/client';
import { GoogleDriveProvider } from './providers/google-drive.provider';
export declare class VideoService {
    private googleDriveProvider;
    constructor(googleDriveProvider: GoogleDriveProvider);
    private getProvider;
    getVideoMetadata(provider: VideoProvider, videoId: string): Promise<import("./interfaces/video-provider.interface").VideoMetadata>;
    getStreamingUrl(provider: VideoProvider, videoId: string): Promise<string>;
    validateVideo(provider: VideoProvider, videoId: string): Promise<boolean>;
}
