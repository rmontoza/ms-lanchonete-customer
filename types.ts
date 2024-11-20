
const TYPES = {
    OrderUseCase: Symbol.for('OrderUseCase'),
    CustomerUseCase: Symbol.for('CustomerUseCase'),
    ProductUseCase: Symbol.for('ProductUseCase'),
    CheckoutUseCase: Symbol.for('CheckoutUseCase'),

    OrderController: Symbol.for('OrderController'),
    CustomerController: Symbol.for('CustomerController'),
    ProductController: Symbol.for('ProductController'),

    CheckoutController: Symbol.for('CheckoutController'),

    OrderRepository: Symbol.for('OrderRepository'),
    CustomerRepository: Symbol.for('CustomerRepository'),
    ProductRepository: Symbol.for('ProductRepository'),
    CheckoutRepository: Symbol.for('CheckoutRepository'),


    Database: Symbol.for('Database')
  };

export {TYPES};