"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LecturesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const lecture_dto_1 = require("./dto/lecture.dto");
const lectures_service_1 = require("./lectures.service");
let LecturesController = class LecturesController {
    lecturesService;
    constructor(lecturesService) {
        this.lecturesService = lecturesService;
    }
    async create(createDto) {
        return this.lecturesService.create(createDto);
    }
    async findAll(subjectId) {
        return this.lecturesService.findAll(subjectId);
    }
    async findOne(id) {
        return this.lecturesService.findOne(id);
    }
    async update(id, updateDto) {
        return this.lecturesService.update(id, updateDto);
    }
    async remove(id) {
        return this.lecturesService.remove(id);
    }
};
exports.LecturesController = LecturesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.INSTRUCTOR),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new video lecture (Admin/Instructor only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Lecture created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lecture_dto_1.CreateVideoLectureDto]),
    __metadata("design:returntype", Promise)
], LecturesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all lectures for a subject' }),
    (0, swagger_1.ApiQuery)({ name: 'subjectId', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all lectures for the subject' }),
    __param(0, (0, common_1.Query)('subjectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LecturesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific lecture with streaming details' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the lecture' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Lecture not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LecturesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.INSTRUCTOR),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a lecture (Admin/Instructor only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lecture updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, lecture_dto_1.UpdateVideoLectureDto]),
    __metadata("design:returntype", Promise)
], LecturesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a lecture (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lecture deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LecturesController.prototype, "remove", null);
exports.LecturesController = LecturesController = __decorate([
    (0, swagger_1.ApiTags)('lectures'),
    (0, common_1.Controller)('lectures'),
    __metadata("design:paramtypes", [lectures_service_1.LecturesService])
], LecturesController);
//# sourceMappingURL=lectures.controller.js.map