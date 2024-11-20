import 'reflect-metadata';
import { Container } from 'inversify';
import { IDatabase } from './src/adapter/driven/infra/interfaces/IDatabase';
import { TYPES } from './types'
import { ICustomerRepository } from './src/core/domain/repositories/ICostumerRepository';
import { CustomerController } from './src/adapter/driver/api/controllers/CustomerController';
import { ICustomerUseCase } from './src/core/domain/application/usecases/Customer/ICustomerUseCase';
import { CustomerUseCase } from './src/core/domain/application/usecases/Customer/CustomerUseCase';
import dotenv from 'dotenv';
import { MySQLDatabase } from './src/adapter/driven/infra/databases/MySQLDatabase';
import { CustomerRepository } from './src/adapter/driven/infra/repositories/CustomerRepository';
dotenv.config();

const container = new Container();

// Bindings
//Use Cases
container.bind<ICustomerUseCase>(TYPES.CustomerUseCase).to(CustomerUseCase);


//Repositorys
container.bind<ICustomerRepository>(TYPES.CustomerRepository).to(CustomerRepository);

//Controllers
container.bind<CustomerController>(TYPES.CustomerController).to(CustomerController);



//Databases
//container.bind<IDatabase>(TYPES.Database).toConstantValue(new MongoDatabase(`${process.env.MONGODB_URI}`));
container.bind<IDatabase>(TYPES.Database).to(MySQLDatabase);
container.bind<MySQLDatabase>(MySQLDatabase).to(MySQLDatabase);

export { container };

