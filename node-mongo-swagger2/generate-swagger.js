const fs = require('fs');
const yaml = require('js-yaml');
const swaggerSpec = require('./swagger'); // your swagger.js

// Convert JSON → YAML
const swaggerYaml = yaml.dump(swaggerSpec);

// Write file
fs.writeFileSync('swagger.yaml', swaggerYaml, 'utf8');

console.log('✅ swagger.yaml generated successfully');