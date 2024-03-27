require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { connectToDatabase } = require('./data');
const { ObjectId } = require('mongodb');
const { uploadimg } = require('./cloudimage');
const axios = require('axios');
const multer = require('multer');
const opencage = require('opencage-api-client');
const { getDistance } = require('geolib');
const Razorpay = require("razorpay");
const crypto = require("crypto");

const stripe=require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const port = 5000;
let data;
const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());
const upload = multer({ dest: 'uploads/' });

// Function to get coordinates for a given address
async function getCoordinates(address) {
    try {
        const data = await opencage.geocode({ q: address });
        if (data.status.code === 200 && data.results.length > 0) {
            const place = data.results[0];
            const coordinates = place.geometry;
            return coordinates;
        } else {
            console.log('Error: Unable to fetch coordinates');
            return null;
        }
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

connectToDatabase()
    .then(database=>{
        data=database;
})

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

app.post('/signup', async (req, res) => {
    const requestData = req.body;
    
    // Example: Insert data into a MongoDB collection
    if(await data.collection('accounts').findOne({ username: requestData.username })){
        res.status(501).json({ message: 'OOPS! Username unavailable' });
        console.log("Alredy exists");
        return;
    }
    try {
        requestData.url='https://th.bing.com/th/id/OIP.e35f-y2MkeVR4oDiXDG9vgHaHa?rs=1&pid=ImgDetMain';
        const coordinates = await getCoordinates(requestData.location);
        if (!coordinates) {
            return res.status(500).json({ error: 'Error fetching coordinates' });
        }
        requestData.geometry = coordinates;
        console.log(requestData);
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
            res.json({ message: 'Signin successful', accounttype: user.userType, id:user._id});
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

app.get('/user/restaurants', async (req, res) => {
    const { user } = req.query;
    try {
        const userData = await data.collection('accounts').findOne({ username: user });
        if (!userData || !userData.geometry) {
            return res.status(400).json({ error: 'User or user location not found' });
        }
        const userLocation = userData.geometry;

        // Get all restaurants from the database
        const restaurants = await data.collection('accounts').find({ userType: 'RESTAURANT' }).toArray();

        // Filter restaurants within 10km radius
        const nearbyRestaurants = restaurants.filter(restaurant => {
            if (!restaurant.geometry) {
                return false; // Skip restaurants with missing or undefined geometry
            }
            const restaurantLocation = restaurant.geometry;
            const distance = getDistance(userLocation, restaurantLocation);
            const distanceInKm = distance / 1000; // Convert meters to kilometers
            return distanceInKm <= 10;
        });

        // Map the restaurants to include only necessary fields and check if menu exists
        const formattedRestaurants = nearbyRestaurants.map(restaurant => ({
            username: restaurant.username,
            url: restaurant.url,
            location: restaurant.location,
            menu: restaurant.menu ? restaurant.menu : null // Check if menu exists
        }));
        
        res.json(formattedRestaurants);
    } catch (error) {
        console.error('Error querying restaurants:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/user/:username/update', async (req, res) => {
    const { username } = req.params;
    const updatedData = req.body;

    try {
        // Find the user document by username
        const user = await data.collection('accounts').findOne({ username: username });

        if (user) {
            // Update the user document with the new data
            await data.collection('accounts').updateOne(
                { username },
                { $set: updatedData }
            );

            res.json({ message: 'Profile updated successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating profile:', error);
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

app.get('/user/:username', async (req, res) => {
    const {username} = req.params;
    // Example: Query data from a MongoDB collection
    try {
        const user = await data.collection('accounts').findOne({ username: username });
        if (user ) {
            res.json(user);
        } else {
            res.status(401).json({ error: 'Unauthorized',message: 'Unauthorized'});
        }
    } catch (error) {
        console.error('Error querying document:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/Restaurants/:username/orders', async (req, res) => {
    const { username } = req.params;
    const day = new Date();
    try {
        const user = await data.collection('orders').findOne({ username: username });
        if (user) {
            // Check if user.orders is an object containing orders for each day
            if (user.orders && typeof user.orders === 'object') {
                const todayOrders = user.orders[day.getDate()];
                if (todayOrders) {
                    res.json(todayOrders);
                } else {
                    res.json({ error: 'No orders found for today' });
                }
            } else {
                res.json({ error: 'Orders not found or invalid format' });
            }
        } else {
            res.json({ error: 'User not found',date: day.getDate()});
        }
    } catch (error) {
        console.error('Error querying document:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/Restaurants/:username/menu', async (req, res) => {
    const { username } = req.params;
    try {
        const user = await data.collection('accounts').findOne({ username: username });
        if (user) {
            if (user.menu) {
                const menu = user.menu;
                res.json({menu:menu});
            } else {
                res.json({ error: 'No Menu yet' });
            }
        } else {
            res.json({ error: 'User not found',date: day.getDate()});
        }
    } catch (error) {
        console.error('Error querying document:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/Restaurants/:username/menu/:itemname', async (req, res) => {
    const { username,itemname } = req.params;
    try {
        const user = await data.collection('accounts').findOne({ username: username });
        if (user) {
            if (user.menu) {
                if(itemname){
                    const item=user.menu[itemname];
                    res.json({item:item});
                }
            } else {
                res.json({ error: 'No Menu yet' });
            }
        } else {
            res.json({ error: 'User not found',date: day.getDate()});
        }
    } catch (error) {
        console.error('Error querying document:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/Restaurants/:username/menu/add', async (req, res) => {
    const { username } = req.params;
    const newItem = req.body;

    try {
        // Find the user document by username
        const user = await data.collection('accounts').findOne({ username: username });

        if (user) {
            // If the menu field doesn't exist yet, create it as an empty object
            if (!user.menu) {
                user.menu = {};
            }

            // Use the Name field as the itemId
            const itemId = newItem.Name;

            // Add the new item to the menu object using the itemId as the key
            user.menu[itemId] = {
                url: newItem.url,
                Description: newItem.description,
                count: newItem.count,
                price: newItem.price
            };

            // Update the user document in the database
            await data.collection('accounts').updateOne(
                { username },
                { $set: { menu: user.menu } }
            );

            res.json({ message: 'Item added to menu successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error querying document:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/Restaurants/menu/delete',async(req,res)=>{
    const requestData = req.body;
    try {
        const user = await data.collection('accounts').findOne({ username: requestData.username });
        if (user) {
            delete user.menu[requestData.itemname];
            await data.collection('accounts').updateOne(
                { username: requestData.username },
                { $set: { menu: user.menu } }
            );
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error querying document:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        // Check if file is present in request
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        console.log('Uploaded file:', req.file.path);
        const result = await uploadimg(req.file.path);

        // Return the URL to the frontend
        console.log(result);
        res.json({ url: result });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/dist', async (req, res) => {
    try {
        const { user1, user2 } = req.query;
        const u1 = await data.collection('accounts').findOne({ username: user1 });
        const u2 = await data.collection('accounts').findOne({ username: user2 });
        if (!u1 || !u2) {
            return res.status(404).json({ error: 'One or both users not found' });
        }
        if (!u1.geometry || !u2.geometry) {
            return res.status(400).json({ error: 'User objects missing geometry information' });
        }
        let distance = getDistance(u1.geometry, u2.geometry);
        res.json({ distance: distance });
    } catch (error) {
        console.error('Error calculating distance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/id',async(req,res)=>{
    const {id}=req.query;
    try{
        console.log('ID:', id);
        const user = await data.collection('accounts').findOne({ _id: new ObjectId(id) });
        res.json(user);
    }
    catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.post("/order", async (req, res) => {
    console.log(req.body);
    try {
      const razorpay = new Razorpay({
        key_id: 'rzp_test_LlOuAePLt2waoI',
        key_secret: 'yBfic4BzBGIWl8MBjBqIErL4',
      });
  
      const options = req.body;
      const order = await razorpay.orders.create(options);
      console.log('entered');
  
      if (!order) {
        console.log('error encountered');
        return res.status(500).send("Error");
      }
  
      res.json(order);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error");
    }
  });
  
  app.post("/order/validate", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const sha = crypto.createHmac("sha256",'yBfic4BzBGIWl8MBjBqIErL4' );
    //order_id + "|" + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Transaction is not legit!" });
    }
  
    res.json({
      msg: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

module.exports=app;
