const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.DATA_URL;
const dbName = 'myDatabase';

async function connectToDatabase() {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(dbName);
}

module.exports = {
    connectToDatabase
};
