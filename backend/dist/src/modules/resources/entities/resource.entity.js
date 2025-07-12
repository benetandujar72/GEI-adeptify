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
exports.Resource = exports.ResourceStatus = exports.ResourceType = void 0;
const typeorm_1 = require("typeorm");
const school_entity_1 = require("../../schools/entities/school.entity");
var ResourceType;
(function (ResourceType) {
    ResourceType["CLASSROOM"] = "classroom";
    ResourceType["LABORATORY"] = "laboratory";
    ResourceType["GYMNASIUM"] = "gymnasium";
    ResourceType["LIBRARY"] = "library";
    ResourceType["AUDITORIUM"] = "auditorium";
    ResourceType["COMPUTER_ROOM"] = "computer_room";
    ResourceType["MUSIC_ROOM"] = "music_room";
    ResourceType["ART_ROOM"] = "art_room";
    ResourceType["CAFETERIA"] = "cafeteria";
    ResourceType["PLAYGROUND"] = "playground";
    ResourceType["EQUIPMENT"] = "equipment";
    ResourceType["VEHICLE"] = "vehicle";
})(ResourceType || (exports.ResourceType = ResourceType = {}));
var ResourceStatus;
(function (ResourceStatus) {
    ResourceStatus["AVAILABLE"] = "available";
    ResourceStatus["OCCUPIED"] = "occupied";
    ResourceStatus["MAINTENANCE"] = "maintenance";
    ResourceStatus["RESERVED"] = "reserved";
    ResourceStatus["OUT_OF_SERVICE"] = "out_of_service";
})(ResourceStatus || (exports.ResourceStatus = ResourceStatus = {}));
let Resource = class Resource {
    get isAvailable() {
        return this.status === ResourceStatus.AVAILABLE;
    }
    get isBookable() {
        return this.isActive && this.status !== ResourceStatus.OUT_OF_SERVICE;
    }
    get fullLocation() {
        const parts = [this.building, this.floor, this.roomNumber].filter(Boolean);
        return parts.join(' - ');
    }
};
exports.Resource = Resource;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Resource.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Resource.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Resource.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ResourceType,
    }),
    __metadata("design:type", String)
], Resource.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ResourceStatus,
        default: ResourceStatus.AVAILABLE,
    }),
    __metadata("design:type", String)
], Resource.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Resource.prototype, "schoolId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => school_entity_1.School, school => school.resources),
    (0, typeorm_1.JoinColumn)({ name: 'schoolId' }),
    __metadata("design:type", school_entity_1.School)
], Resource.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Resource.prototype, "building", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Resource.prototype, "floor", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Resource.prototype, "roomNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Resource.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Resource.prototype, "features", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Resource.prototype, "schedule", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Resource.prototype, "restrictions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Resource.prototype, "maintenance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Resource.prototype, "hourlyRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Resource.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], Resource.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], Resource.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Resource.prototype, "responsibleTeacherId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Resource.prototype, "departmentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Resource.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Resource.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Resource.prototype, "updatedAt", void 0);
exports.Resource = Resource = __decorate([
    (0, typeorm_1.Entity)('resources'),
    (0, typeorm_1.Index)(['name', 'schoolId'], { unique: true })
], Resource);
//# sourceMappingURL=resource.entity.js.map