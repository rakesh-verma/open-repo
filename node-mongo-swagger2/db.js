const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'swagger2DB';

let db;

async function connectDB() {
  if (db) return db;

  const client = new MongoClient(url);
  await client.connect();
  db = client.db(dbName);

  console.log('✅ MongoDB connected');
  return db;
}

module.exports = connectDB;