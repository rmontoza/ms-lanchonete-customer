
import mysql from 'mysql2/promise';
import 'dotenv/config';
import { IDatabase } from '../interfaces/IDatabase';
import 'reflect-metadata';
import { injectable } from 'inversify';

@injectable()
export class MySQLDatabase implements IDatabase {
    private connection: any;

    constructor() {
        this.connect();
    }
    async connect(): Promise<void> {
        this.connection = await mysql.createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            multipleStatements: true, // Permitir múltiplas instruções
        });
        console.log('MySQL Database connected successfully!');
    }

    async query(sql: string, params: any[] = []) {
        try {
            const [rows] = await this.connection.execute(sql, params);
            return rows;
        } catch (error) {
            console.error('Database query error:', error);
            throw error;
        }
    }
}
