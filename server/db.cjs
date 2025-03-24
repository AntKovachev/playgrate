const { MongoClient } = require('mongodb');
require('dotenv').config();

const Db = 'mongodb+srv://anton:loldaniggwp2@backenddb.ibkn8.mongodb.net/playgreat?retryWrites=true&w=majority&appName=BackendDB';
const client = new MongoClient(Db);

async function connectDB() {
  try {
    await client.connect();
    console.log('✅ MongoDB Connected');
    return client.db('playgreat');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
}

module.exports = connectDB;
