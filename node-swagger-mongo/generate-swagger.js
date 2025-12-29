const fs = require('fs');
const yaml = require('js-yaml');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      title: 'Node API Library',
      version: '1.0.0',
      description: 'Node Express + MongoDB API'
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  },
  apis: ['./app.js'] // where your swagger comments are
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Write YAML file
const yamlSpec = yaml.dump(swaggerSpec, { noRefs: true });

fs.writeFileSync('swagger.yaml', yamlSpec, 'utf8');

console.log('✅ swagger.yaml generated');