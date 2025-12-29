const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'Node Express MongoDB Swagger App'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./app.js']
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;