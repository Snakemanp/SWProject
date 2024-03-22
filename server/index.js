const express = require('express');
const nodemailer = require('nodemailer')
const cors = require('cors');
const {connectToDatabase} = require('./data')
const {cloudinary}=require('./cloudimage')
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

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'chase.shields92@ethereal.email',
        pass: 'QeRRMYM4v5BwSbhAZJ'
    }
});


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
        requestData.url='https://th.bing.com/th/id/OIP.e35f-y2MkeVR4oDiXDG9vgHaHa?rs=1&pid=ImgDetMain';
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
            res.status(401).json({ error: 'Unauthorized',message: 'Incorrect Username or Password'});
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

app.post('/reset', async (req, res) => {
    const requestData = req.body;
    console.log(requestData);

    try {
        const user = await data.collection('accounts').findOne({ username: requestData.username });
        if (user && user.email === requestData.email) {
            try {
                const info = await transporter.sendMail({
                    from: 'chase.shields92@ethereal.email',
                    to: user.email,
                    subject: 'Password Recovery',
                    text: `Your password is: ${user.password}`
                });
                
                console.log('Email sent:', info.messageId);
                res.status(200).json({ message: 'Password sent to your email' });
            } catch (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ error: 'Error sending email' });
            }
        } else {
            res.status(401).json({ error: 'Unauthorized', message: 'Incorrect Username or Email' });
        }
    } catch (error) {
        console.error('Error querying document:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

module.exports={
    app,
}