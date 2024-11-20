import Customer from '../entities/Customers/Customer';

export interface ICustomerRepository {
  createCustomer(costumer: Customer): Promise<Customer>;
  findCustomer(document: string): Promise<Customer | null>;
}