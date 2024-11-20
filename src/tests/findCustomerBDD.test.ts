import { defineFeature, loadFeature } from 'jest-cucumber';
import { CustomerRepository } from '../adapter/driven/infra/repositories/CustomerRepository';
import { MySQLDatabase } from '../adapter/driven/infra/databases/MySQLDatabase';
import Customer from '../core/domain/entities/Customers/Customer';

jest.mock('../adapter/driven/infra/databases/MySQLDatabase');

const feature = loadFeature('src/tests/features/find-customer.feature');

defineFeature(feature, (test) => {
    let repository: CustomerRepository;
    let dbMock: jest.Mocked<MySQLDatabase>;
    let result: Customer | null;

    beforeEach(() => {
        dbMock = new MySQLDatabase() as jest.Mocked<MySQLDatabase>;
        repository = new CustomerRepository(dbMock);
        result = null;
    });

    test('O cliente existe no banco de dados', ({ given, when, then }) => {
        given('que existe um cliente com o documento "123456789" no banco de dados', () => {
            dbMock.query.mockResolvedValueOnce([
                { id: '1', customerName: 'John Doe', document: '123456789' },
            ]);
        });

        when('eu procuro pelo cliente com o documento "123456789"', async () => {
            result = await repository.findCustomer('123456789');
        });

        then('eu devo receber os detalhes do cliente:', (table) => {
            const expectedCustomer = table[0];
            expect(result).toEqual(
                new Customer(
                    expectedCustomer.id,
                    expectedCustomer.customerName,
                    expectedCustomer.document

                )
            );
        });
    });

    test('O cliente não existe no banco de dados', ({ given, when, then }) => {
        given('que não existe um cliente com o documento "987654321" no banco de dados', () => {
            dbMock.query.mockResolvedValueOnce([]);
        });

        when('eu procuro pelo cliente com o documento "987654321"', async () => {
            result = await repository.findCustomer('987654321');
        });

        then('eu devo receber "null"', () => {
            expect(result).toBeNull();
        });
    });
});
