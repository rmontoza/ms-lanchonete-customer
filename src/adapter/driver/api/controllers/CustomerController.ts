import express, { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { ICustomerUseCase } from '../../../../core/domain/application/usecases/Customer/ICustomerUseCase';
import { HandleError } from './errors/HandleError'

import { TYPES } from '../../../../../types';

const err = new HandleError();

@injectable()
export class CustomerController {
  private router = express.Router();
  
  constructor(
    @inject(TYPES.CustomerUseCase) private costumerUseCase: ICustomerUseCase,
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/api/customers', this.createCustomer.bind(this));
    this.router.get('/api/customers/:document', this.identifyCustomer.bind(this));

  }

/**
 * @swagger
 * tags:
 *   - name: Customer
 *     description: Operações relacionadas ao Cliente
 */

  /**
 * @swagger
 * /api/customers:
 *   post:
 *     tags: [Customer]
 *     summary: Cria um novo cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *               document:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 customerName:
 *                   type: string
 *                 document:
 *                   type: string
 *       500:
 *         description: Erro interno do servidor
 */
  private async createCustomer(req: Request, res: Response) {
    try {
      const { customerName, document } = req.body;
      const order = await this.costumerUseCase.createCustomer(customerName, document);
      res.status(201).json(order);
    } catch (error) {
      err.handleError(res, error);
    }
  }

  /**
 * @swagger
 *  /api/customers/{document}:
 *    get:
 *      summary: Identifica o cliente pelo documento
 *      tags: [Customer]
 *      parameters:
 *        - in: path
 *          name: document
 *          schema:
 *            type: string
 *          required: true
 *          description: Documento do cliente
 *      responses:
 *        "200":
 *          description: Cliente encontrado
 *          content:
 *            application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 customerName:
 *                   type: string
 *                 document:
 *                   type: string
 *        "404":
 *          description: Cliente não encontrado
 */
  private async identifyCustomer(req: Request, res: Response) {
    try {
      const { document } = req.params;
      const order = await this.costumerUseCase.identifyCustomer(document);
      res.status(200).json(order);
    } catch (error) {
      err.handleError(res, error);
    }
  }
  public getRouter() {
    return this.router;
  }
}