
import { DataSource } from 'typeorm';
import { User, UserRole } from '../../modules/users/entities/user.entity';
import { School } from '../../modules/schools/entities/school.entity';
import { Resource } from '../../modules/resources/entities/resource.entity';
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
        schoolId: savedSchool.id
      },
      {
        email: 'profesor@demo.gei.edu',
        firstName: 'Joan',
        lastName: 'Martínez',
        role: UserRole.TEACHER,
        profilePicture: 'https://via.placeholder.com/150/7ED321/FFFFFF?text=JM',
        schoolId: savedSchool.id
      },
      {
        email: 'parent@demo.gei.edu',
        firstName: 'Anna',
        lastName: 'Pérez',
        role: UserRole.PARENT,
        profilePicture: 'https://via.placeholder.com/150/F5A623/FFFFFF?text=AP',
        schoolId: savedSchool.id
      },
      {
        email: 'student@demo.gei.edu',
        firstName: 'Pau',
        lastName: 'López',
        role: UserRole.STUDENT,
        profilePicture: 'https://via.placeholder.com/150/50E3C2/FFFFFF?text=PL',
        schoolId: savedSchool.id
      }
    ];

    const savedUsers = await userRepository.save(users);

    // Crear recursos de demostració usando el repository para evitar problemas de tipos
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
