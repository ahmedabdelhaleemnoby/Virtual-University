import { ConfigService } from '@nestjs/config';
import { IVideoProvider, VideoMetadata } from '../interfaces/video-provider.interface';
export declare class GoogleDriveProvider implements IVideoProvider {
    private configService;
    private drive;
    constructor(configService: ConfigService);
    getVideoMetadata(videoId: string): Promise<VideoMetadata>;
    getStreamingUrl(videoId: string): Promise<string>;
    validateVideo(videoId: string): Promise<boolean>;
}
