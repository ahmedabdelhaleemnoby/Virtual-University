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
exports.EnrollmentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const create_enrollment_dto_1 = require("./dto/create-enrollment.dto");
const enrollments_service_1 = require("./enrollments.service");
let EnrollmentsController = class EnrollmentsController {
    enrollmentsService;
    constructor(enrollmentsService) {
        this.enrollmentsService = enrollmentsService;
    }
    async create(req, createEnrollmentDto) {
        return this.enrollmentsService.create(req.user.id, createEnrollmentDto);
    }
    async findMy(req) {
        return this.enrollmentsService.findMyEnrollments(req.user.id);
    }
};
exports.EnrollmentsController = EnrollmentsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(client_1.UserRole.STUDENT, client_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Enroll a student in a subject' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Successfully enrolled' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_enrollment_dto_1.CreateEnrollmentDto]),
    __metadata("design:returntype", Promise)
], EnrollmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('my'),
    (0, roles_decorator_1.Roles)(client_1.UserRole.STUDENT, client_1.UserRole.ADMIN, client_1.UserRole.INSTRUCTOR),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user enrollments' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns enrollments' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EnrollmentsController.prototype, "findMy", null);
exports.EnrollmentsController = EnrollmentsController = __decorate([
    (0, swagger_1.ApiTags)('enrollments'),
    (0, common_1.Controller)('enrollments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [enrollments_service_1.EnrollmentsService])
], EnrollmentsController);
//# sourceMappingURL=enrollments.controller.js.map