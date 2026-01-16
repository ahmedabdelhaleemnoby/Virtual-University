import { VideoProvider } from '@prisma/client';
export declare class CreateVideoLectureDto {
    subjectId: string;
    title: string;
    description?: string;
    providerVideoId: string;
    provider: VideoProvider;
    displayOrder: number;
    isFree?: boolean;
    isActive?: boolean;
}
declare const UpdateVideoLectureDto_base: import("@nestjs/common").Type<Partial<CreateVideoLectureDto>>;
export declare class UpdateVideoLectureDto extends UpdateVideoLectureDto_base {
}
export {};
