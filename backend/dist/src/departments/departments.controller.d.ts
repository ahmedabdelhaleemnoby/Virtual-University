import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto/department.dto';
export declare class DepartmentsController {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    create(createDepartmentDto: CreateDepartmentDto): Promise<{
        id: string;
        facultyId: string;
        name: string;
        slug: string;
        description: string | null;
        imageUrl: string | null;
        displayOrder: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(facultyId?: string): Promise<({
        faculty: {
            name: string;
        };
    } & {
        id: string;
        facultyId: string;
        name: string;
        slug: string;
        description: string | null;
        imageUrl: string | null;
        displayOrder: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        faculty: {
            id: string;
            name: string;
            slug: string;
            description: string | null;
            imageUrl: string | null;
            displayOrder: number;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        subjects: {
            id: string;
            departmentId: string;
            instructorId: string | null;
            title: string;
            slug: string;
            description: string | null;
            imageUrl: string | null;
            price: import("@prisma/client/runtime/library").Decimal;
            currency: string;
            durationWeeks: number | null;
            difficultyLevel: import(".prisma/client").$Enums.DifficultyLevel;
            prerequisites: string | null;
            learningOutcomes: string | null;
            videoProvider: import(".prisma/client").$Enums.VideoProvider;
            metadata: import(".prisma/client").Prisma.JsonValue | null;
            isPublished: boolean;
            publishedAt: Date | null;
            enrollmentsCount: number;
            averageRating: import("@prisma/client/runtime/library").Decimal;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        facultyId: string;
        name: string;
        slug: string;
        description: string | null;
        imageUrl: string | null;
        displayOrder: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<{
        id: string;
        facultyId: string;
        name: string;
        slug: string;
        description: string | null;
        imageUrl: string | null;
        displayOrder: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        facultyId: string;
        name: string;
        slug: string;
        description: string | null;
        imageUrl: string | null;
        displayOrder: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
