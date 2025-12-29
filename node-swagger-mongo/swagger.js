const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      title: 'Customer API',
      version: '1.0.0',
      description: 'Node + Mongo + Swagger 2.0'
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  },
  apis: ['./app.js']
};

module.exports = swaggerJSDoc(swaggerOptions);