const { MongoClient } = require('mongodb');
require('dotenv').config({ path: './config.env' });

async function main() {
  const Db = process.env.ATLAS_URI;
  const client = new MongoClient(Db);

  try {
    await client.connect();
    console.log('Database connected successfully');

    const collection = client.db('playgreat').collection('Users');

    const users = await collection.find().toArray();
    console.log('Users:', users);

    const collections = await client.db('playgreat').collections();
    collections.forEach((col) => {
      console.log(col.namespace);
    });

  } catch (e) {
    console.error('Error connecting to the database:', e);
  } finally {
    await client.close();
  }
}

main();
