const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const connectDB = require('./db');

const app = express();
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

/**
 * @swagger
 * definitions:
 *   Customer:
 *     type: object
 *     required:
 *       - id
 *       - customerDetails
 *       - contactDetails
 *     properties:
 *       id:
 *         type: string
 *         example: "12345"
 *       customerDetails:
 *         type: object
 *         properties:
 *           firstName:
 *             type: string
 *           lastname:
 *             type: string
 *       contactDetails:
 *         type: object
 *         properties:
 *           email:
 *             type: string
 */

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create customer
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: customer
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Customer'
 *     responses:
 *       201:
 *         description: Customer created
 */
app.post('/customers', async (req, res) => {
  try {
    const db = await connectDB();

    const payload = {
      ...req.body,
      createdAt: new Date()
    };

    await db.collection('customers').insertOne(payload);

    res.status(201).json({ message: 'Customer saved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));