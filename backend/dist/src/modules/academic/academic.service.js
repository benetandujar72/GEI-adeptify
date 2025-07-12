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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const academic_progress_entity_1 = require("./entities/academic-progress.entity");
const user_entity_1 = require("../users/entities/user.entity");
const ai_service_1 = require("../ai/ai.service");
let AcademicService = class AcademicService {
    constructor(academicProgressRepository, userRepository, aiService) {
        this.academicProgressRepository = academicProgressRepository;
        this.userRepository = userRepository;
        this.aiService = aiService;
    }
    async createProgress(progressData) {
        const progress = this.academicProgressRepository.create(progressData);
        if (progress.score !== undefined) {
            progress.aiInsights = await this.generateInsights(progress.studentId, progress.subject, progress.score, progress.maxScore);
        }
        return await this.academicProgressRepository.save(progress);
    }
    async getStudentProgress(studentId, subject) {
        const where = { studentId };
        if (subject) {
            where.subject = subject;
        }
        return await this.academicProgressRepository.find({
            where,
            order: { date: 'DESC' }
        });
    }
    async getStudentAverage(studentId, subject) {
        const progress = await this.getStudentProgress(studentId, subject);
        if (progress.length === 0)
            return 0;
        const totalScore = progress.reduce((sum, p) => sum + (p.score || 0), 0);
        const totalMaxScore = progress.reduce((sum, p) => sum + (p.maxScore || 100), 0);
        return totalMaxScore > 0 ? (totalScore / totalMaxScore) * 100 : 0;
    }
    async getSubjectProgress(studentId, subject) {
        const progress = await this.getStudentProgress(studentId, subject);
        if (progress.length === 0) {
            return {
                average: 0,
                trend: 'stable',
                recentScores: [],
                recommendations: ['Encara no tens avaluacions en aquesta assignatura.']
            };
        }
        const scores = progress.map(p => p.percentage).filter(s => s > 0);
        const average = scores.length > 0 ? scores.reduce((sum, s) => sum + s, 0) / scores.length : 0;
        const recentScores = scores.slice(0, 5);
        let trend = 'stable';
        if (recentScores.length >= 2) {
            const firstHalf = recentScores.slice(0, Math.ceil(recentScores.length / 2));
            const secondHalf = recentScores.slice(Math.ceil(recentScores.length / 2));
            const firstAvg = firstHalf.reduce((sum, s) => sum + s, 0) / firstHalf.length;
            const secondAvg = secondHalf.reduce((sum, s) => sum + s, 0) / secondHalf.length;
            if (secondAvg > firstAvg + 5)
                trend = 'improving';
            else if (secondAvg < firstAvg - 5)
                trend = 'declining';
        }
        const recommendations = await this.generateRecommendations(average, trend, subject);
        return {
            average,
            trend,
            recentScores,
            recommendations
        };
    }
    async updateProgress(id, updateData) {
        const progress = await this.academicProgressRepository.findOne({ where: { id } });
        if (!progress) {
            throw new Error('Academic progress not found');
        }
        Object.assign(progress, updateData);
        if (updateData.score !== undefined) {
            progress.aiInsights = await this.generateInsights(progress.studentId, progress.subject, progress.score, progress.maxScore);
        }
        return await this.academicProgressRepository.save(progress);
    }
    async deleteProgress(id) {
        await this.academicProgressRepository.delete(id);
    }
    async generateInsights(studentId, subject, score, maxScore = 100) {
        const percentage = (score / maxScore) * 100;
        let trend = 'stable';
        let riskLevel = 'low';
        let recommendation = '';
        if (percentage >= 90) {
            recommendation = 'Excel·lent treball! Continua mantenint aquest alt nivell.';
            riskLevel = 'low';
        }
        else if (percentage >= 80) {
            recommendation = 'Bon treball. Pots millorar una mica més amb més pràctica.';
            riskLevel = 'low';
        }
        else if (percentage >= 70) {
            recommendation = 'Treball acceptable. Necessites més esforç per millorar.';
            riskLevel = 'medium';
        }
        else if (percentage >= 60) {
            recommendation = 'Atenció: Necessites ajuda addicional per aprovar.';
            riskLevel = 'high';
        }
        else {
            recommendation = 'Urgent: Necessites suport immediat per evitar el suspens.';
            riskLevel = 'high';
        }
        return {
            trend,
            recommendation,
            riskLevel,
            strengths: percentage >= 80 ? ['Bona comprensió dels conceptes bàsics'] : [],
            areasForImprovement: percentage < 80 ? ['Necessita més pràctica', 'Revisar conceptes fonamentals'] : [],
            predictedNextScore: Math.min(100, percentage + (percentage >= 80 ? 5 : 10))
        };
    }
    async generateRecommendations(average, trend, subject) {
        const recommendations = [];
        if (average < 60) {
            recommendations.push('Necessites suport addicional per aprovar aquesta assignatura.');
            recommendations.push('Considera demanar ajuda al professor o un tutor.');
        }
        else if (average < 80) {
            recommendations.push('Pots millorar amb més pràctica i estudi.');
            recommendations.push('Revisa els conceptes que no entens completament.');
        }
        else {
            recommendations.push('Excel·lent progrés! Continua així.');
        }
        if (trend === 'declining') {
            recommendations.push('El teu rendiment està baixant. Revisa els teus mètodes d\'estudi.');
        }
        else if (trend === 'improving') {
            recommendations.push('El teu progrés està millorant. Manté la motivació!');
        }
        return recommendations;
    }
};
exports.AcademicService = AcademicService;
exports.AcademicService = AcademicService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(academic_progress_entity_1.AcademicProgress)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        ai_service_1.AiService])
], AcademicService);
//# sourceMappingURL=academic.service.js.map