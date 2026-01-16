import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { EnrollmentsService } from './enrollments.service';
export declare class EnrollmentsController {
    private readonly enrollmentsService;
    constructor(enrollmentsService: EnrollmentsService);
    create(req: any, createEnrollmentDto: CreateEnrollmentDto): Promise<{
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
    findMy(req: any): Promise<({
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
