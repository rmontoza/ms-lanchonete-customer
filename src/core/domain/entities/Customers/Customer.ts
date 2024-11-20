export default class Customer {
    public id: string;
    public customerName: string;
    public document: string;
  
    constructor(id: string, customerName: string, document: string) {
      this.id = id;
      this.customerName = customerName;
      this.document = document;

    }
  }
  