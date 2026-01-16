import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DepartmentsModule } from './departments/departments.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { FacultiesModule } from './faculties/faculties.module';
import { LecturesModule } from './lectures/lectures.module';
import { PrismaModule } from './prisma/prisma.module';
import { SubjectsModule } from './subjects/subjects.module';
import { UsersModule } from './users/users.module';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    FacultiesModule,
    DepartmentsModule,
    SubjectsModule,
    VideoModule,
    LecturesModule,
    EnrollmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
