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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDepartmentDto = exports.CreateDepartmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateDepartmentDto {
    facultyId;
    name;
    slug;
    description;
    imageUrl;
    displayOrder;
    isActive;
}
exports.CreateDepartmentDto = CreateDepartmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-faculty' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDepartmentDto.prototype, "facultyId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Computer Science Department' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDepartmentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'computer-science' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDepartmentDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Detailed description of the department', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDepartmentDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/dept.jpg', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDepartmentDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateDepartmentDto.prototype, "displayOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateDepartmentDto.prototype, "isActive", void 0);
class UpdateDepartmentDto extends (0, swagger_1.PartialType)(CreateDepartmentDto) {
}
exports.UpdateDepartmentDto = UpdateDepartmentDto;
//# sourceMappingURL=department.dto.js.map