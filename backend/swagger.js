import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SlimMom API',
      version: '1.0.0',
      description: 'Backend API documentation for the SlimMom application',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Server',
      },
      {
        url: 'YOUR_RENDER_OR_VERCEL_LINK_HERE', // Deploy linkini buraya ekleyeceksin
        description: 'Production Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./docs/*.yaml'],
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = app => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
