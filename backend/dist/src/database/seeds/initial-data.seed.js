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
                schoolId: parseInt(savedSchool.id)
            },
            {
                email: 'profesor@demo.gei.edu',
                firstName: 'Joan',
                lastName: 'Martínez',
                role: user_entity_1.UserRole.TEACHER,
                profilePicture: 'https://via.placeholder.com/150/7ED321/FFFFFF?text=JM',
                schoolId: parseInt(savedSchool.id)
            },
            {
                email: 'parent@demo.gei.edu',
                firstName: 'Anna',
                lastName: 'Pérez',
                role: user_entity_1.UserRole.PARENT,
                profilePicture: 'https://via.placeholder.com/150/F5A623/FFFFFF?text=AP',
                schoolId: parseInt(savedSchool.id)
            },
            {
                email: 'student@demo.gei.edu',
                firstName: 'Pau',
                lastName: 'López',
                role: user_entity_1.UserRole.STUDENT,
                profilePicture: 'https://via.placeholder.com/150/50E3C2/FFFFFF?text=PL',
                schoolId: parseInt(savedSchool.id)
            }
        ];
        const savedUsers = await userRepository.save(users);
        const resources = [];
        const resourcesData = [
            {
                name: 'Aula d\'Informàtica',
                description: 'Aula equipada amb 30 ordinadors',
                type: resource_entity_1.ResourceType.CLASSROOM,
                capacity: 30,
                building: 'Planta 1',
                roomNumber: 'Ala Est',
                features: {
                    computers: 30,
                    projector: true,
                    whiteboard: true,
                    internet: true
                },
                schoolId: parseInt(savedSchool.id)
            },
            {
                name: 'Laboratori de Ciències',
                description: 'Laboratori amb equipament científic complet',
                type: resource_entity_1.ResourceType.LABORATORY,
                capacity: 25,
                building: 'Planta 2',
                roomNumber: 'Ala Nord',
                features: {
                    projector: true,
                    internet: true,
                    airConditioning: true
                },
                schoolId: parseInt(savedSchool.id)
            },
            {
                name: 'Gimnàs Principal',
                description: 'Espai poliesportiu principal',
                type: resource_entity_1.ResourceType.SPORTS,
                capacity: 50,
                building: 'Planta Baixa',
                features: {
                    audioSystem: true,
                    accessibility: true
                },
                schoolId: parseInt(savedSchool.id)
            },
            {
                name: 'Biblioteca',
                description: 'Biblioteca amb zona d\'estudi silenciós',
                type: resource_entity_1.ResourceType.STUDY,
                capacity: 40,
                building: 'Planta 1',
                roomNumber: 'Centre',
                features: {
                    computers: 10,
                    internet: true,
                    projector: false,
                    whiteboard: false
                },
                schoolId: parseInt(savedSchool.id)
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