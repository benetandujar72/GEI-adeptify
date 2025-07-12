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
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const user_entity_1 = require("../entities/user.entity");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Format d\'email invàlid' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'El nom ha de ser una cadena de text' }),
    (0, class_validator_1.MinLength)(2, { message: 'El nom ha de tenir almenys 2 caràcters' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'El cognom ha de ser una cadena de text' }),
    (0, class_validator_1.MinLength)(2, { message: 'El cognom ha de tenir almenys 2 caràcters' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(user_entity_1.UserRole, { message: 'Rol d\'usuari invàlid' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(4, { message: 'ID d\'escola invàlid' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "schoolId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'El telèfon ha de ser una cadena de text' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'La bio ha de ser una cadena de text' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "bio", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(4, { message: 'ID de classe invàlid' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "classId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(4, { message: 'ID de família invàlid' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "familyId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateUserDto.prototype, "academicInfo", void 0);
//# sourceMappingURL=create-user.dto.js.map