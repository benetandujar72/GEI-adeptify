
import { DataSource } from 'typeorm';
import { databaseConfig } from '../config/database.config';
import { ConfigService } from '@nestjs/config';
import { InitialDataSeed } from './seeds/initial-data.seed';

async function runSeed() {
  const configService = new ConfigService();
  const dataSource = new DataSource(databaseConfig(configService));

  try {
    await dataSource.initialize();
    console.log('🔌 Connexió a la base de dades establerta');

    // Executar el seeder
    const seed = new InitialDataSeed();
    await seed.run(dataSource);

    console.log('🌱 Seeding completat amb èxit!');
  } catch (error) {
    console.error('❌ Error durant el seeding:', error);
  } finally {
    await dataSource.destroy();
    console.log('🔌 Connexió a la base de dades tancada');
  }
}

runSeed();
