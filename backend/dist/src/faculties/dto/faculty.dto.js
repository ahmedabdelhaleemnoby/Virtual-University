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
exports.UpdateFacultyDto = exports.CreateFacultyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateFacultyDto {
    name;
    slug;
    description;
    imageUrl;
    displayOrder;
    isActive;
}
exports.CreateFacultyDto = CreateFacultyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Faculty of Engineering' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFacultyDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'engineering' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateFacultyDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Detailed description of the faculty', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFacultyDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/image.jpg', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateFacultyDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateFacultyDto.prototype, "displayOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateFacultyDto.prototype, "isActive", void 0);
class UpdateFacultyDto extends (0, swagger_1.PartialType)(CreateFacultyDto) {
}
exports.UpdateFacultyDto = UpdateFacultyDto;
//# sourceMappingURL=faculty.dto.js.map