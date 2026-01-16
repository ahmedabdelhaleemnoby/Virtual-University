import { PrismaService } from '../prisma/prisma.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
export declare class EnrollmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(studentId: string, createEnrollmentDto: CreateEnrollmentDto): Promise<{
        subject: {
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
        };
    } & {
        id: string;
        studentId: string;
        subjectId: string;
        paymentId: string | null;
        status: import(".prisma/client").$Enums.EnrollmentStatus;
        enrolledAt: Date | null;
        completedAt: Date | null;
        expiresAt: Date | null;
        progress: import(".prisma/client").Prisma.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findMyEnrollments(studentId: string): Promise<({
        subject: {
            department: {
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
            };
            instructor: {
                firstName: string;
                lastName: string;
            } | null;
        } & {
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
        };
    } & {
        id: string;
        studentId: string;
        subjectId: string;
        paymentId: string | null;
        status: import(".prisma/client").$Enums.EnrollmentStatus;
        enrolledAt: Date | null;
        completedAt: Date | null;
        expiresAt: Date | null;
        progress: import(".prisma/client").Prisma.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
}
