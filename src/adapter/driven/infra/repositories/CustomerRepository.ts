import { MySQLDatabase } from '../databases/MySQLDatabase';
import { ICustomerRepository } from '../../../../core/domain/repositories/ICostumerRepository';
import { injectable } from 'inversify';
import Customer from '../../../../core/domain/entities/Customers/Customer';

@injectable()
export class CustomerRepository implements ICustomerRepository {
    private db: MySQLDatabase;

    constructor(database: MySQLDatabase) {
        this.db = database;
    }
    async findCustomer(document: string): Promise<Customer | null> {
        const sql = `SELECT id, customerName, document FROM Customers WHERE document = ?`;
        const result: any[] = await this.db.query(sql, [document]);

        if (result.length === 0) {
            return null; // Retorna null se nenhum cliente for encontrado
        }

        const row = result[0];
        return new Customer( row.id, row.customerName, row.document); // Cria uma instância do cliente
    }
    async createCustomer(customer: Customer): Promise<Customer> {
        const sql = `INSERT INTO Customers (customerName, document, created_at) VALUES (?, ?, NOW())`;
        const result: any = await this.db.query(sql, [
            customer.customerName,
            customer.document
        ]);

        return new Customer(result.insertId.toString(), customer.customerName!, customer.document!);

    }

}
