"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiModule = void 0;
const common_1 = require("@nestjs/common");
const ai_controller_1 = require("./ai.controller");
const ai_service_1 = require("./ai.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const resource_entity_1 = require("../resources/entities/resource.entity");
const reservation_entity_1 = require("../reservations/entities/reservation.entity");
const academic_progress_entity_1 = require("../academic/entities/academic-progress.entity");
const message_entity_1 = require("../communications/entities/message.entity");
const notification_entity_1 = require("../communications/entities/notification.entity");
const gamification_points_entity_1 = require("../gamification/entities/gamification-points.entity");
let AiModule = class AiModule {
};
exports.AiModule = AiModule;
exports.AiModule = AiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_entity_1.User,
                resource_entity_1.Resource,
                reservation_entity_1.Reservation,
                academic_progress_entity_1.AcademicProgress,
                message_entity_1.Message,
                notification_entity_1.Notification,
                gamification_points_entity_1.GamificationPoints,
            ]),
        ],
        controllers: [ai_controller_1.AiController],
        providers: [ai_service_1.AiService],
        exports: [ai_service_1.AiService],
    })
], AiModule);
//# sourceMappingURL=ai.module.js.map