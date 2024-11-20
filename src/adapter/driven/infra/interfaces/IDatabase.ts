interface IDatabase {
    connect(): Promise<void>;
  }
  
  export { IDatabase };