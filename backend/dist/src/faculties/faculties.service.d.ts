import { PrismaService } from '../prisma/prisma.service';
import { CreateFacultyDto, UpdateFacultyDto } from './dto/faculty.dto';
export declare class FacultiesService {
    private prisma;
    constructor(prisma: PrismaService);
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
