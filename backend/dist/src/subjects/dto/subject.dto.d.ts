import { DifficultyLevel, VideoProvider } from '@prisma/client';
export declare class CreateSubjectDto {
    departmentId: string;
    instructorId?: string;
    title: string;
    slug: string;
    description?: string;
    imageUrl?: string;
    price: number;
    currency?: string;
    durationWeeks?: number;
    difficultyLevel: DifficultyLevel;
    prerequisites?: string;
    learningOutcomes?: string;
    videoProvider: VideoProvider;
    isPublished?: boolean;
}
declare const UpdateSubjectDto_base: import("@nestjs/common").Type<Partial<CreateSubjectDto>>;
export declare class UpdateSubjectDto extends UpdateSubjectDto_base {
}
export {};
