import '../inversify.config';
import express, { Express } from 'express';
import { container } from '../inversify.config';
import { setupSwagger } from './swagger';
import { CustomerController } from './adapter/driver/api/controllers/CustomerController';

import { TYPES } from '../types';
import { IDatabase } from './adapter/driven/infra/interfaces/IDatabase';

const app: Express = express();
const PORT = process.env.PORT || 3000;

const database = container.get<IDatabase>(TYPES.Database);
database.connect();

app.use(express.json());

setupSwagger(app);

const customerController = container.get<CustomerController>(TYPES.CustomerController);


app.use(customerController.getRouter());



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
