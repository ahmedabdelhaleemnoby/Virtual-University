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
exports.FacultiesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const faculty_dto_1 = require("./dto/faculty.dto");
const faculties_service_1 = require("./faculties.service");
let FacultiesController = class FacultiesController {
    facultiesService;
    constructor(facultiesService) {
        this.facultiesService = facultiesService;
    }
    async create(createFacultyDto) {
        return this.facultiesService.create(createFacultyDto);
    }
    async findAll() {
        return this.facultiesService.findAll();
    }
    async findOne(id) {
        return this.facultiesService.findOne(id);
    }
    async update(id, updateFacultyDto) {
        return this.facultiesService.update(id, updateFacultyDto);
    }
    async remove(id) {
        return this.facultiesService.remove(id);
    }
};
exports.FacultiesController = FacultiesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new faculty (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Faculty created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [faculty_dto_1.CreateFacultyDto]),
    __metadata("design:returntype", Promise)
], FacultiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all faculties' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all faculties' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FacultiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a faculty by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the faculty' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Faculty not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FacultiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a faculty (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Faculty updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, faculty_dto_1.UpdateFacultyDto]),
    __metadata("design:returntype", Promise)
], FacultiesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a faculty (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Faculty deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FacultiesController.prototype, "remove", null);
exports.FacultiesController = FacultiesController = __decorate([
    (0, swagger_1.ApiTags)('faculties'),
    (0, common_1.Controller)('faculties'),
    __metadata("design:paramtypes", [faculties_service_1.FacultiesService])
], FacultiesController);
//# sourceMappingURL=faculties.controller.js.map