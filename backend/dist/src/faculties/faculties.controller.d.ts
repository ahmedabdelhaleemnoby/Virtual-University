import { CreateFacultyDto, UpdateFacultyDto } from './dto/faculty.dto';
import { FacultiesService } from './faculties.service';
export declare class FacultiesController {
    private readonly facultiesService;
    constructor(facultiesService: FacultiesService);
    create(createFacultyDto: CreateFacultyDto): Promise<{
        id: string;
        name: string;
        slug: string;
        description: string | null;
        imageUrl: string | null;
        displayOrder: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        slug: string;
        description: string | null;
        imageUrl: string | null;
        displayOrder: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        departments: {
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
        }[];
    } & {
        id: string;
        name: string;
        slug: string;
        description: string | null;
        imageUrl: string | null;
        displayOrder: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateFacultyDto: UpdateFacultyDto): Promise<{
        id: string;
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
