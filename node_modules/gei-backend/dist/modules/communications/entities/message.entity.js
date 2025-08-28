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
exports.Message = exports.MessagePriority = exports.MessageType = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
var MessageType;
(function (MessageType) {
    MessageType["DIRECT"] = "direct";
    MessageType["BROADCAST"] = "broadcast";
    MessageType["URGENT"] = "urgent";
    MessageType["SYSTEM"] = "system";
})(MessageType || (exports.MessageType = MessageType = {}));
var MessagePriority;
(function (MessagePriority) {
    MessagePriority["LOW"] = "low";
    MessagePriority["NORMAL"] = "normal";
    MessagePriority["HIGH"] = "high";
    MessagePriority["URGENT"] = "urgent";
})(MessagePriority || (exports.MessagePriority = MessagePriority = {}));
let Message = class Message {
};
exports.Message = Message;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Message.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Message.prototype, "senderId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Message.prototype, "receiverId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "subject", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Message.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: MessageType, default: MessageType.DIRECT }),
    __metadata("design:type", String)
], Message.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: MessagePriority, default: MessagePriority.NORMAL }),
    __metadata("design:type", String)
], Message.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Message.prototype, "isRead", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Message.prototype, "parentMessageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Array)
], Message.prototype, "attachments", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Message.prototype, "translatedContent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], Message.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Message.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Message.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.id),
    (0, typeorm_1.JoinColumn)({ name: 'senderId' }),
    __metadata("design:type", user_entity_1.User)
], Message.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.id),
    (0, typeorm_1.JoinColumn)({ name: 'receiverId' }),
    __metadata("design:type", user_entity_1.User)
], Message.prototype, "receiver", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Message, message => message.id),
    (0, typeorm_1.JoinColumn)({ name: 'parentMessageId' }),
    __metadata("design:type", Message)
], Message.prototype, "parentMessage", void 0);
exports.Message = Message = __decorate([
    (0, typeorm_1.Entity)('messages'),
    (0, typeorm_1.Index)(['senderId', 'receiverId']),
    (0, typeorm_1.Index)(['receiverId', 'isRead'])
], Message);
//# sourceMappingURL=message.entity.js.map