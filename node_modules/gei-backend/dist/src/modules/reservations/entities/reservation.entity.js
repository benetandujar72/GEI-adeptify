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
exports.Reservation = exports.ReservationType = exports.ReservationStatus = void 0;
const typeorm_1 = require("typeorm");
var ReservationStatus;
(function (ReservationStatus) {
    ReservationStatus["PENDING"] = "pending";
    ReservationStatus["CONFIRMED"] = "confirmed";
    ReservationStatus["CANCELLED"] = "cancelled";
    ReservationStatus["COMPLETED"] = "completed";
    ReservationStatus["REJECTED"] = "rejected";
})(ReservationStatus || (exports.ReservationStatus = ReservationStatus = {}));
var ReservationType;
(function (ReservationType) {
    ReservationType["CLASS"] = "class";
    ReservationType["MEETING"] = "meeting";
    ReservationType["EVENT"] = "event";
    ReservationType["MAINTENANCE"] = "maintenance";
    ReservationType["PERSONAL"] = "personal";
    ReservationType["EXTRA_CURRICULAR"] = "extra_curricular";
})(ReservationType || (exports.ReservationType = ReservationType = {}));
let Reservation = class Reservation {
    get duration() {
        return (this.endTime.getTime() - this.startTime.getTime()) / (1000 * 60 * 60);
    }
    get isActive() {
        const now = new Date();
        return this.status === ReservationStatus.CONFIRMED &&
            this.startTime <= now &&
            this.endTime >= now;
    }
    get isUpcoming() {
        return this.status === ReservationStatus.CONFIRMED &&
            this.startTime > new Date();
    }
    get isRecurring() {
        return !!this.recurring;
    }
    get isPendingApproval() {
        return this.status === ReservationStatus.PENDING;
    }
};
exports.Reservation = Reservation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Reservation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Reservation.prototype, "resourceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Reservation.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    __metadata("design:type", String)
], Reservation.prototype, "schoolId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Reservation.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Reservation.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Reservation.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Reservation.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ReservationType }),
    __metadata("design:type", String)
], Reservation.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ReservationStatus, default: ReservationStatus.PENDING }),
    __metadata("design:type", String)
], Reservation.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Reservation.prototype, "aiProcessing", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Reservation.prototype, "participants", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Reservation.prototype, "requirements", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Reservation.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Reservation.prototype, "recurring", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Reservation.prototype, "parentReservationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Reservation.prototype, "approvedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Reservation.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Reservation.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], Reservation.prototype, "cancelledBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Reservation.prototype, "cancelledAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Reservation.prototype, "cancellationReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Reservation.prototype, "feedback", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Reservation.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Reservation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Reservation.prototype, "updatedAt", void 0);
exports.Reservation = Reservation = __decorate([
    (0, typeorm_1.Entity)('reservations'),
    (0, typeorm_1.Index)(['resourceId', 'startTime', 'endTime']),
    (0, typeorm_1.Index)(['userId', 'startTime'])
], Reservation);
//# sourceMappingURL=reservation.entity.js.map