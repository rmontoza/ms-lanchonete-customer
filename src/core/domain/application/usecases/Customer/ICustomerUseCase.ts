import Costumer from '../../../entities/Customers/Customer';


export interface ICustomerUseCase {
    createCustomer(customerName: string, document: string): Promise<Costumer>;
    identifyCustomer(document: string): Promise<Costumer>;
}