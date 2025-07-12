"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const communications_controller_1 = require("./communications.controller");
const communications_service_1 = require("./communications.service");
const message_entity_1 = require("./entities/message.entity");
const notification_entity_1 = require("./entities/notification.entity");
const user_entity_1 = require("../users/entities/user.entity");
const ai_module_1 = require("../ai/ai.module");
let CommunicationsModule = class CommunicationsModule {
};
exports.CommunicationsModule = CommunicationsModule;
exports.CommunicationsModule = CommunicationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([message_entity_1.Message, notification_entity_1.Notification, user_entity_1.User]),
            ai_module_1.AiModule
        ],
        controllers: [communications_controller_1.CommunicationsController],
        providers: [communications_service_1.CommunicationsService],
        exports: [communications_service_1.CommunicationsService],
    })
], CommunicationsModule);
//# sourceMappingURL=communications.module.js.map