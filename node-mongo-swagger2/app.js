const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const connectDB = require('./db');

const app = express();
const PORT = 3000;

app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - name
 *       - email
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       createdAt:
 *         type: string
 *         format: date-time
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a user
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       201:
 *         description: User created
 */
app.post('/users', async (req, res) => {
  const db = await connectDB();

  const user = {
    ...req.body,
    createdAt: new Date()
  };

  const result = await db.collection('users').insertOne(user);
  res.status(201).json({ id: result.insertedId, ...user });
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 */
app.get('/users', async (req, res) => {
  const db = await connectDB();
  const users = await db.collection('users').find().toArray();
  res.json(users);
});

/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: Get latest user by email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
app.get('/users/:email', async (req, res) => {
  const db = await connectDB();

  const user = await db.collection('users')
    .find({ email: req.params.email })
    .sort({ createdAt: -1 })
    .limit(1)
    .toArray();

  if (!user.length) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user[0]);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running: http://localhost:${PORT}`);
  console.log(`📘 Swagger UI: http://localhost:${PORT}/api-docs`);
});