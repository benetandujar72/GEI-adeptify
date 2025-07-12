"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const database_config_1 = require("../config/database.config");
const config_1 = require("@nestjs/config");
const initial_data_seed_1 = require("./seeds/initial-data.seed");
async function runSeed() {
    const configService = new config_1.ConfigService();
    const dataSource = new typeorm_1.DataSource((0, database_config_1.databaseConfig)(configService));
    try {
        await dataSource.initialize();
        console.log('🔌 Connexió a la base de dades establerta');
        const seed = new initial_data_seed_1.InitialDataSeed();
        await seed.run(dataSource);
        console.log('🌱 Seeding completat amb èxit!');
    }
    catch (error) {
        console.error('❌ Error durant el seeding:', error);
    }
    finally {
        await dataSource.destroy();
        console.log('🔌 Connexió a la base de dades tancada');
    }
}
runSeed();
//# sourceMappingURL=seed.js.map