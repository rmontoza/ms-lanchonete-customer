interface IDatabase {
  connect(): Promise<void>;
  query(sql: string, params?: any[]): Promise<void>; // Parâmetro `params` opcional
}

export { IDatabase };
