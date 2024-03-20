const express = require('express');
const cors = require('cors');
const {connectToDatabase} = require('./data')
const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());
let data;
connectToDatabase()
    .then(database=>{
        data=database;
    })

app.post('/signup', async (req, res) => {
    const requestData = req.body;
    console.log(requestData);
    
    // Example: Insert data into a MongoDB collection
    if(await data.collection('accounts').findOne({ username: requestData.username })){
        res.status(501).json({ message: 'OOPS! Username unavailable' });
        console.log("Alredy exists");
        return;
    }
    try {
        const result = await data.collection('accounts').insertOne(requestData);
        console.log('Inserted document with _id:', result.insertedId);
        res.json({ message: 'Data received successfully' });
    } catch (error) {
        console.error('Error inserting document:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/signin', async (req, res) => {
    const requestData = req.body;
    console.log(requestData);

    // Example: Query data from a MongoDB collection
    try {
        const user = await data.collection('accounts').findOne({ username: requestData.username });
        if (user && user.password === requestData.password) {
            res.json({ message: 'Signin successful' });
        } else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    } catch (error) {
        console.error('Error querying document:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/restaurants', async (req, res) => {
    try {
        // Assuming you have a collection named 'restaurants' in your database
        const restaurants = await data.collection('accounts').find({userType: 'RESTAURANT'}).toArray();
        res.json(restaurants);
    } catch (error) {
        console.error('Error querying restaurants:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
