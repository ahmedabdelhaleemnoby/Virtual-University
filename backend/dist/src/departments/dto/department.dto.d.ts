export declare class CreateDepartmentDto {
    facultyId: string;
    name: string;
    slug: string;
    description?: string;
    imageUrl?: string;
    displayOrder?: number;
    isActive?: boolean;
}
declare const UpdateDepartmentDto_base: import("@nestjs/common").Type<Partial<CreateDepartmentDto>>;
export declare class UpdateDepartmentDto extends UpdateDepartmentDto_base {
}
export {};
