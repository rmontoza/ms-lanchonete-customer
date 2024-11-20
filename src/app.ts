import '../inversify.config';
import express, { Express } from 'express';
import { container } from '../inversify.config';
import { setupSwagger } from './swagger';
import { CustomerController } from './adapter/driver/api/controllers/CustomerController';

import { TYPES } from '../types';
import { IDatabase } from './adapter/driven/infra/interfaces/IDatabase';
import fs from 'fs';
import path from 'path';

const app: Express = express();
const PORT = process.env.PORT || 3000;

const database = container.get<IDatabase>(TYPES.Database);

(async () => {
  try {
    // Conecta ao banco de dados
    await database.connect();
    console.log('Database connected successfully.');

    // Executa a migration
    const migrationPath = path.resolve(__dirname, '../migration/mysql.migration.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

    const statements = migrationSQL.split(';');

    for (const statement of statements) {
      if (statement.trim()) {
        await database.query(statement.trim());
      }
    }
    console.log('Migration executed successfully.');
  } catch (error) {
    console.error('Error during database initialization:', error);
    process.exit(1); // Encerra o processo se a migração falhar
  }
})();

app.use(express.json());

setupSwagger(app);

const customerController = container.get<CustomerController>(TYPES.CustomerController);

app.use(customerController.getRouter());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
