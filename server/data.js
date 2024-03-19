const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
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
