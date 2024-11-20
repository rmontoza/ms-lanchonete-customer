import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import path from 'path';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tech Challenge Lanchonete API',
      version: '1.0.0',
      description: 'Documentação da API da lanchonete',
    },
    servers: [
      {
        url: 'http://afc18233acd6040e38b5395599548c95-2064986359.sa-east-1.elb.amazonaws.com',
      },
    ],
  },
  apis: [path.resolve(__dirname, './**/*.js')],
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express): void {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}