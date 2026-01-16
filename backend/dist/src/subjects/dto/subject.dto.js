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
exports.UpdateSubjectDto = exports.CreateSubjectDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class CreateSubjectDto {
    departmentId;
    instructorId;
    title;
    slug;
    description;
    imageUrl;
    price;
    currency;
    durationWeeks;
    difficultyLevel;
    prerequisites;
    learningOutcomes;
    videoProvider;
    isPublished;
}
exports.CreateSubjectDto = CreateSubjectDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-department' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSubjectDto.prototype, "departmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-instructor', required: false }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSubjectDto.prototype, "instructorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Introduction to Web Development' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], CreateSubjectDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'web-development-intro' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSubjectDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A comprehensive guide to modern web development', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSubjectDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/subject.jpg', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSubjectDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 49.99 }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateSubjectDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'USD', required: false, default: 'USD' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSubjectDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateSubjectDto.prototype, "durationWeeks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.DifficultyLevel, default: client_1.DifficultyLevel.BEGINNER }),
    (0, class_validator_1.IsEnum)(client_1.DifficultyLevel),
    __metadata("design:type", String)
], CreateSubjectDto.prototype, "difficultyLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Basic Computer Knowledge', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSubjectDto.prototype, "prerequisites", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Build a full-stack app', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSubjectDto.prototype, "learningOutcomes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.VideoProvider, default: client_1.VideoProvider.GOOGLE_DRIVE }),
    (0, class_validator_1.IsEnum)(client_1.VideoProvider),
    __metadata("design:type", String)
], CreateSubjectDto.prototype, "videoProvider", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateSubjectDto.prototype, "isPublished", void 0);
class UpdateSubjectDto extends (0, swagger_1.PartialType)(CreateSubjectDto) {
}
exports.UpdateSubjectDto = UpdateSubjectDto;
//# sourceMappingURL=subject.dto.js.map