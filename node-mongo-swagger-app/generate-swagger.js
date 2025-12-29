const fs = require('fs');
const yaml = require('js-yaml');
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node API Library',
      version: '1.0.0'
    }
  },
  apis: ['./app.js']   // adjust if needed
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Convert to YAML
const yamlSpec = yaml.dump(swaggerSpec);

// Write to file
fs.writeFileSync('./swagger.yaml', yamlSpec, 'utf8');

console.log('✅ Swagger YAML generated: swagger.yaml');