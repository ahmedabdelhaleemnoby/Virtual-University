"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleDriveProvider = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_1 = require("@prisma/client");
const googleapis_1 = require("googleapis");
let GoogleDriveProvider = class GoogleDriveProvider {
    configService;
    drive;
    constructor(configService) {
        this.configService = configService;
        const apiKey = this.configService.get('GOOGLE_DRIVE_API_KEY');
        this.drive = googleapis_1.google.drive({ version: 'v3', auth: apiKey });
    }
    async getVideoMetadata(videoId) {
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
                provider: client_1.VideoProvider.GOOGLE_DRIVE,
                embedUrl: file.webViewLink?.replace('/view', '/preview') ?? undefined,
                downloadUrl: file.webContentLink ?? undefined,
            };
        }
        catch (error) {
            if (error.code === 404) {
                throw new common_1.NotFoundException(`Google Drive file ${videoId} not found or not public`);
            }
            throw new common_1.InternalServerErrorException('Error fetching Google Drive metadata');
        }
    }
    async getStreamingUrl(videoId) {
        const metadata = await this.getVideoMetadata(videoId);
        return metadata.embedUrl || '';
    }
    async validateVideo(videoId) {
        try {
            await this.drive.files.get({ fileId: videoId, fields: 'id' });
            return true;
        }
        catch {
            return false;
        }
    }
};
exports.GoogleDriveProvider = GoogleDriveProvider;
exports.GoogleDriveProvider = GoogleDriveProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], GoogleDriveProvider);
//# sourceMappingURL=google-drive.provider.js.map