const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      title: 'User API (Swagger 2.0)',
      description: 'Node Express MongoDB API with Swagger 2.0',
      version: '1.0.0'
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  },
  apis: ['./app.js']
};

module.exports = swaggerJSDoc(options);