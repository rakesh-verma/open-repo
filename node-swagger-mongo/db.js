const { MongoClient } = require('mongodb');

const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'testdb';

let db;

async function connectDB() {
  if (db) return db;

  const client = await MongoClient.connect(MONGO_URL);
  db = client.db(DB_NAME);

  console.log('MongoDB connected');
  return db;
}

module.exports = connectDB;