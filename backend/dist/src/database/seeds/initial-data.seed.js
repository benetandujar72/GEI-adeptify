"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialDataSeed = void 0;
const user_entity_1 = require("../../modules/users/entities/user.entity");
const school_entity_1 = require("../../modules/schools/entities/school.entity");
const resource_entity_1 = require("../../modules/resources/entities/resource.entity");
const gamification_points_entity_1 = require("../../modules/gamification/entities/gamification-points.entity");
class InitialDataSeed {
    async run(dataSource) {
        const userRepository = dataSource.getRepository(user_entity_1.User);
        const schoolRepository = dataSource.getRepository(school_entity_1.School);
        const resourceRepository = dataSource.getRepository(resource_entity_1.Resource);
        const gamificationRepository = dataSource.getRepository(gamification_points_entity_1.GamificationPoints);
        const demoSchool = schoolRepository.create({
            name: 'Escola Demostració GEI',
            code: 'DEMO_GEI',
            address: 'Carrer de la Tecnologia, 123, Barcelona',
            phone: '+34 93 123 45 67',
            email: 'info@demo.gei.edu',
            settings: {
                timezone: 'Europe/Madrid',
                language: 'ca',
                features: {
                    ai_enabled: true,
                    gamification_enabled: true,
                    communication_enabled: true
                }
            }
        });
        const savedSchool = await schoolRepository.save(demoSchool);
        const users = [
            {
                email: 'director@demo.gei.edu',
                firstName: 'Maria',
                lastName: 'González',
                role: user_entity_1.UserRole.ADMIN,
                profilePicture: 'https://via.placeholder.com/150/4A90E2/FFFFFF?text=MG',
                schoolId: savedSchool.id
            },
            {
                email: 'profesor@demo.gei.edu',
                firstName: 'Joan',
                lastName: 'Martínez',
                role: user_entity_1.UserRole.TEACHER,
                profilePicture: 'https://via.placeholder.com/150/7ED321/FFFFFF?text=JM',
                schoolId: savedSchool.id
            },
            {
                email: 'parent@demo.gei.edu',
                firstName: 'Anna',
                lastName: 'Pérez',
                role: user_entity_1.UserRole.PARENT,
                profilePicture: 'https://via.placeholder.com/150/F5A623/FFFFFF?text=AP',
                schoolId: savedSchool.id
            },
            {
                email: 'student@demo.gei.edu',
                firstName: 'Pau',
                lastName: 'López',
                role: user_entity_1.UserRole.STUDENT,
                profilePicture: 'https://via.placeholder.com/150/50E3C2/FFFFFF?text=PL',
                schoolId: savedSchool.id
            }
        ];
        const savedUsers = await userRepository.save(users);
        const resources = [];
        const resourcesData = [
            {
                name: 'Aula d\'Informàtica',
                description: 'Aula equipada amb 30 ordinadors',
                type: 'classroom',
                capacity: 30,
                location: 'Planta 1, Ala Est',
                features: ['ordinadors', 'projector', 'pantalla_interactiva'],
                schoolId: savedSchool.id
            },
            {
                name: 'Laboratori de Ciències',
                description: 'Laboratori amb equipament científic complet',
                type: 'laboratory',
                capacity: 25,
                location: 'Planta 2, Ala Nord',
                features: ['microscopis', 'material_quimic', 'campana_extractora'],
                schoolId: savedSchool.id
            },
            {
                name: 'Gimnàs Principal',
                description: 'Espai poliesportiu principal',
                type: 'sports',
                capacity: 50,
                location: 'Planta Baixa',
                features: ['canastes_basquet', 'porteries_futbol', 'material_esportiu'],
                schoolId: savedSchool.id
            },
            {
                name: 'Biblioteca',
                description: 'Biblioteca amb zona d\'estudi silenciós',
                type: 'study',
                capacity: 40,
                location: 'Planta 1, Centre',
                features: ['wifi', 'ordinadors', 'zona_silenciosa'],
                schoolId: savedSchool.id
            }
        ];
        for (const resourceData of resourcesData) {
            const resource = resourceRepository.create(resourceData);
            resources.push(await resourceRepository.save(resource));
        }
        const savedResources = resources;
        for (const user of savedUsers) {
            if (user.role === user_entity_1.UserRole.STUDENT) {
                const gamificationData = gamificationRepository.create({
                    userId: user.id,
                    points: Math.floor(Math.random() * 500) + 100,
                    level: Math.floor(Math.random() * 5) + 1,
                    xp: Math.floor(Math.random() * 1000) + 200,
                    badges: ['first_login', 'early_bird'],
                    achievements: ['Primer dia', 'Estudiant actiu']
                });
                await gamificationRepository.save(gamificationData);
            }
        }
        console.log('✅ Base de dades inicialitzada amb dades de demostració');
        console.log(`✅ Escola creada: ${savedSchool.name}`);
        console.log(`✅ ${savedUsers.length} usuaris creats`);
        console.log(`✅ ${savedResources.length} recursos creats`);
    }
}
exports.InitialDataSeed = InitialDataSeed;
//# sourceMappingURL=initial-data.seed.js.map