const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
    res.json({"users": ["userOne", "UserTwo", "UserThree"]});
});

app.post('/signin', (req, res) => {
    const requestData = req.body;
    console.log(requestData); // Logging the received object
    res.send('Data received successfully');
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
