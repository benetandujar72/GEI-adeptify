

import { DataSource } from 'typeorm';
import { User, UserRole } from '../../modules/users/entities/user.entity';
import { School } from '../../modules/schools/entities/school.entity';
import { Resource, ResourceType } from '../../modules/resources/entities/resource.entity';
import { GamificationPoints } from '../../modules/gamification/entities/gamification-points.entity';

export class InitialDataSeed {
  public async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const schoolRepository = dataSource.getRepository(School);
    const resourceRepository = dataSource.getRepository(Resource);
    const gamificationRepository = dataSource.getRepository(GamificationPoints);

    // Crear escuela de demostración
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

    // Crear usuarios de demostración
    const users = [
      {
        email: 'director@demo.gei.edu',
        firstName: 'Maria',
        lastName: 'González',
        role: UserRole.ADMIN,
        profilePicture: 'https://via.placeholder.com/150/4A90E2/FFFFFF?text=MG',
        schoolId: savedSchool.id.toString()
      },
      {
        email: 'profesor@demo.gei.edu',
        firstName: 'Joan',
        lastName: 'Martínez',
        role: UserRole.TEACHER,
        profilePicture: 'https://via.placeholder.com/150/7ED321/FFFFFF?text=JM',
        schoolId: savedSchool.id.toString()
      },
      {
        email: 'parent@demo.gei.edu',
        firstName: 'Anna',
        lastName: 'Pérez',
        role: UserRole.PARENT,
        profilePicture: 'https://via.placeholder.com/150/F5A623/FFFFFF?text=AP',
        schoolId: savedSchool.id.toString()
      },
      {
        email: 'student@demo.gei.edu',
        firstName: 'Pau',
        lastName: 'López',
        role: UserRole.STUDENT,
        profilePicture: 'https://via.placeholder.com/150/50E3C2/FFFFFF?text=PL',
        schoolId: savedSchool.id.toString()
      }
    ];

    const savedUsers = await userRepository.save(users);

    // Crear recursos de demostració usando el repository para evitar problemas de tipos
    const resources = [];
    const resourcesData = [
      {
        name: 'Aula d\'Informàtica',
        description: 'Aula equipada amb 30 ordinadors',
        type: ResourceType.CLASSROOM,
        capacity: 30,
        building: 'Planta 1',
        roomNumber: 'Ala Est',
        features: {
          computers: 30,
          projector: true,
          whiteboard: true,
          internet: true
        },
        schoolId: savedSchool.id.toString()
      },
      {
        name: 'Laboratori de Ciències',
        description: 'Laboratori amb equipament científic complet',
        type: ResourceType.LABORATORY,
        capacity: 25,
        building: 'Planta 2',
        roomNumber: 'Ala Nord',
        features: {
          projector: true,
          internet: true,
          airConditioning: true
        },
        schoolId: savedSchool.id.toString()
      },
      {
        name: 'Gimnàs Principal',
        description: 'Espai poliesportiu principal',
        type: ResourceType.GYMNASIUM,
        capacity: 50,
        building: 'Planta Baixa',
        features: {
          audioSystem: true,
          accessibility: true
        },
        schoolId: savedSchool.id.toString()
      },
      {
        name: 'Espai Esportiu',
        description: 'Zona d\'esports i activitats físiques',
        type: ResourceType.SPORTS,
        capacity: 40,
        building: 'Planta Baixa',
        features: {
          audioSystem: true,
          accessibility: true
        },
        schoolId: savedSchool.id.toString()
      },
      {
        name: 'Biblioteca',
        description: 'Biblioteca amb zona d\'estudi silenciós',
        type: ResourceType.LIBRARY,
        capacity: 40,
        building: 'Planta 1',
        roomNumber: 'Centre',
        features: {
          computers: 10,
          internet: true,
          projector: false,
          whiteboard: false
        },
        schoolId: savedSchool.id.toString()
      },
      {
        name: 'Sala d\'Estudi',
        description: 'Sala específica per a l\'estudi individual',
        type: ResourceType.STUDY,
        capacity: 20,
        building: 'Planta 2',
        roomNumber: 'Sud',
        features: {
          internet: true,
          projector: false,
          whiteboard: true
        },
        schoolId: savedSchool.id.toString()
      }
    ];

    for (const resourceData of resourcesData) {
      const resource = resourceRepository.create(resourceData);
      resources.push(await resourceRepository.save(resource));
    }
    const savedResources = resources;

    // Crear punts de gamificació per als usuaris
    for (const user of savedUsers) {
      if (user.role === UserRole.STUDENT) {
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
