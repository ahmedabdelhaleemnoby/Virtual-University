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
exports.DepartmentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const departments_service_1 = require("./departments.service");
const department_dto_1 = require("./dto/department.dto");
let DepartmentsController = class DepartmentsController {
    departmentsService;
    constructor(departmentsService) {
        this.departmentsService = departmentsService;
    }
    async create(createDepartmentDto) {
        return this.departmentsService.create(createDepartmentDto);
    }
    async findAll(facultyId) {
        return this.departmentsService.findAll(facultyId);
    }
    async findOne(id) {
        return this.departmentsService.findOne(id);
    }
    async update(id, updateDepartmentDto) {
        return this.departmentsService.update(id, updateDepartmentDto);
    }
    async remove(id) {
        return this.departmentsService.remove(id);
    }
};
exports.DepartmentsController = DepartmentsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new department (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Department created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [department_dto_1.CreateDepartmentDto]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all departments' }),
    (0, swagger_1.ApiQuery)({ name: 'facultyId', required: false, description: 'Filter by faculty ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all departments' }),
    __param(0, (0, common_1.Query)('facultyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a department by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return the department' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Department not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a department (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Department updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, department_dto_1.UpdateDepartmentDto]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a department (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Department deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DepartmentsController.prototype, "remove", null);
exports.DepartmentsController = DepartmentsController = __decorate([
    (0, swagger_1.ApiTags)('departments'),
    (0, common_1.Controller)('departments'),
    __metadata("design:paramtypes", [departments_service_1.DepartmentsService])
], DepartmentsController);
//# sourceMappingURL=departments.controller.js.map