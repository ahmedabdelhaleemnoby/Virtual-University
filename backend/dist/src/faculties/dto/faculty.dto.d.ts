export declare class CreateFacultyDto {
    name: string;
    slug: string;
    description?: string;
    imageUrl?: string;
    displayOrder?: number;
    isActive?: boolean;
}
declare const UpdateFacultyDto_base: import("@nestjs/common").Type<Partial<CreateFacultyDto>>;
export declare class UpdateFacultyDto extends UpdateFacultyDto_base {
}
export {};
