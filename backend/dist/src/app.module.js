"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const departments_module_1 = require("./departments/departments.module");
const enrollments_module_1 = require("./enrollments/enrollments.module");
const faculties_module_1 = require("./faculties/faculties.module");
const lectures_module_1 = require("./lectures/lectures.module");
const prisma_module_1 = require("./prisma/prisma.module");
const subjects_module_1 = require("./subjects/subjects.module");
const users_module_1 = require("./users/users.module");
const video_module_1 = require("./video/video.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            faculties_module_1.FacultiesModule,
            departments_module_1.DepartmentsModule,
            subjects_module_1.SubjectsModule,
            video_module_1.VideoModule,
            lectures_module_1.LecturesModule,
            enrollments_module_1.EnrollmentsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map