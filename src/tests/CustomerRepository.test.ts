import { CustomerRepository } from '../adapter/driven/infra/repositories/CustomerRepository';
import { MySQLDatabase } from '../adapter/driven/infra/databases/MySQLDatabase';
import Customer  from '../core/domain/entities/Customers/Customer';

jest.mock('../adapter/driven/infra/databases/MySQLDatabase');

describe('CustomerRepository', () => {
    let repository: CustomerRepository;
    let dbMock: jest.Mocked<MySQLDatabase>;

    beforeEach(() => {
        console.log('Inicializando os mocks e instâncias...');
        dbMock = new MySQLDatabase() as jest.Mocked<MySQLDatabase>;
        repository = new CustomerRepository(dbMock);
    });

    it('deve criar um cliente e retornar o ID', async () => {
        console.log('Teste: criar um cliente e retornar o ID');
        const customer = new Customer('0', 'John Doe', '123456789');
        dbMock.query.mockResolvedValueOnce({ insertId: 1 });

        try {
            const customerId = await repository.createCustomer(customer);
            console.log('Cliente criado com sucesso, ID:', customerId);

            expect(dbMock.query).toHaveBeenCalledWith(
                'INSERT INTO Customers (customerName, document, created_at) VALUES (?, ?, NOW())',
                ['John Doe', '123456789']
            );
            expect(customerId.id).toBe('1');
        } catch (error) {
            console.error('Erro ao criar o cliente:', error);
            throw error; // Deixe o Jest registrar o erro
        }
    });

    it('deve encontrar um cliente pelo documento', async () => {
        console.log('Teste: buscar cliente pelo documento');
        const document = '123456789';
        dbMock.query.mockResolvedValueOnce([
            { id: '1', customerName: 'John Doe', document: '123456789' },
        ]);

        try {
            const customer = await repository.findCustomer(document);
            console.log('Cliente encontrado:', customer);

            expect(dbMock.query).toHaveBeenCalledWith(
                'SELECT id, customerName, document FROM Customers WHERE document = ?',
                [document]
            );
            expect(customer).toEqual(new Customer('1', 'John Doe', '123456789'));
        } catch (error) {
            console.error('Erro ao buscar cliente:', error);
            throw error; // Deixe o Jest registrar o erro
        }
    });

    it('deve retornar null se o cliente não for encontrado pelo documento', async () => {
        console.log('Teste: cliente não encontrado pelo documento');
        const document = '987654321';
        dbMock.query.mockResolvedValueOnce([]);

        try {
            const customer = await repository.findCustomer(document);
            console.log('Resultado esperado: null, Resultado obtido:', customer);

            expect(dbMock.query).toHaveBeenCalledWith(
                'SELECT id, customerName, document FROM Customers WHERE document = ?',
                [document]
            );
            expect(customer).toBeNull();
        } catch (error) {
            console.error('Erro ao buscar cliente que não existe:', error);
            throw error; // Deixe o Jest registrar o erro
        }
    });

    it('deve lançar um erro se a criação falhar', async () => {
        console.log('Teste: erro ao criar cliente');
        const customer = new Customer('Jane Doe', '987654321', '0');
        dbMock.query.mockRejectedValueOnce(new Error('Duplicate entry'));

        try {
            await expect(repository.createCustomer(customer)).rejects.toThrow(
                'Duplicate entry'
            );
        } catch (error) {
            console.error('Erro esperado, falha na criação:', error);
            throw error; // Deixe o Jest registrar o erro
        }
    });
});
