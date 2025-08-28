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
exports.AcademicProgress = exports.EvaluationType = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
var EvaluationType;
(function (EvaluationType) {
    EvaluationType["QUIZ"] = "quiz";
    EvaluationType["EXAM"] = "exam";
    EvaluationType["ASSIGNMENT"] = "assignment";
    EvaluationType["PROJECT"] = "project";
    EvaluationType["PARTICIPATION"] = "participation";
    EvaluationType["HOMEWORK"] = "homework";
    EvaluationType["PRESENTATION"] = "presentation";
    EvaluationType["LABORATORY"] = "laboratory";
})(EvaluationType || (exports.EvaluationType = EvaluationType = {}));
let AcademicProgress = class AcademicProgress {
    get percentage() {
        if (!this.score || !this.maxScore)
            return 0;
        return (this.score / this.maxScore) * 100;
    }
    get grade() {
        const percentage = this.percentage;
        if (percentage >= 90)
            return 'A';
        if (percentage >= 80)
            return 'B';
        if (percentage >= 70)
            return 'C';
        if (percentage >= 60)
            return 'D';
        return 'F';
    }
    get isPassing() {
        return this.percentage >= 60;
    }
};
exports.AcademicProgress = AcademicProgress;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AcademicProgress.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], AcademicProgress.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], AcademicProgress.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: EvaluationType }),
    __metadata("design:type", String)
], AcademicProgress.prototype, "evaluationType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], AcademicProgress.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], AcademicProgress.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], AcademicProgress.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 100 }),
    __metadata("design:type", Number)
], AcademicProgress.prototype, "maxScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], AcademicProgress.prototype, "feedback", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], AcademicProgress.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], AcademicProgress.prototype, "aiInsights", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], AcademicProgress.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AcademicProgress.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AcademicProgress.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.id),
    (0, typeorm_1.JoinColumn)({ name: 'studentId' }),
    __metadata("design:type", user_entity_1.User)
], AcademicProgress.prototype, "student", void 0);
exports.AcademicProgress = AcademicProgress = __decorate([
    (0, typeorm_1.Entity)('academic_progress'),
    (0, typeorm_1.Index)(['studentId', 'subject']),
    (0, typeorm_1.Index)(['studentId', 'date'])
], AcademicProgress);
//# sourceMappingURL=academic-progress.entity.js.map