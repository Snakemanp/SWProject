<<<<<<< HEAD
// require('dotenv').config();

// const express = require('express');
// const nodemailer = require('nodemailer');
// const cors = require('cors');
// const { connectToDatabase } = require('./data');
// const { ObjectId } = require('mongodb');
// const { uploadimg } = require('./cloudimage');
// const axios = require('axios');
// const multer = require('multer');
// const opencage = require('opencage-api-client');
// const { getDistance } = require('geolib');
// const moment = require('moment');
// const stripe=require('stripe')(process.env.STRIPE_KEY);

// const port = 5000;
// let data;
// const app = express();
// app.use(cors({
//     origin: 'http://localhost:5173',
// }));
// //app.use(cors());
// app.use(express.json());
// const upload = multer({ dest: 'uploads/' });
// let backendObject={start:'00-00-00',stop:'23-59-59'};

// // Function to get coordinates for a given address
// async function getCoordinates(address) {
//     try {
//         const data = await opencage.geocode({ q: address });
//         if (data.status.code === 200 && data.results.length > 0) {
//             const place = data.results[0];
//             const coordinates = place.geometry;
//             return coordinates;
//         } else {
//             //console.log('Error: Unable to fetch coordinates');
//             return null;
//         }
//     } catch (error) {
//         console.error('Error:', error.message);
//         return null;
//     }
// }

// connectToDatabase()
//     .then(database=>{
//         data=database;
// })

// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: process.env.EMAIL_NAME,
//         pass: process.env.EMAIL_PASSWORD
//     }
// });

// app.get('/validatePasskey', (req, res) => {
//     const passkey = req.query.passkey;
//     const expectedPasskey = '22CS10015';
//     console.log(passkey);

//     if (passkey === expectedPasskey) {
//         res.status(200).send('Passkey is valid');
//     } else {
//         res.status(400).send('Passkey is invalid');
//     }
// });

// app.post('/setTimes', (req, res) => {
//     const { start, stop } = req.body;
    
//     if (!start || !stop) {
//         return res.status(400).json({ error: 'Both start and stop times are required.' });
//     }

//     backendObject.start = start;
//     backendObject.stop = stop;

//     res.status(200).json({ message: 'Start and stop times set successfully.' });
// });


// app.post('/signup', async (req, res) => {
//     const requestData = req.body;
    
//     // Example: Insert data into a MongoDB collection
//     if(await data.collection('accounts').findOne({ username: requestData.username })){
//         res.status(501).json({ message: 'OOPS! Username unavailable' });
//         //console.log("Alredy exists");
//         return;
//     }
//     try {
//         requestData.url='https://th.bing.com/th/id/OIP.e35f-y2MkeVR4oDiXDG9vgHaHa?rs=1&pid=ImgDetMain';
//         const coordinates = await getCoordinates(requestData.location);
//         if (!coordinates) {
//             return res.status(500).json({ error: 'Error fetching coordinates' });
//         }
//         requestData.geometry = coordinates;
//         //console.log(requestData);
//         const result = await data.collection('accounts').insertOne(requestData);
//         //console.log('Inserted document with _id:', result.insertedId);
//         res.json({ message: 'Data received successfully' });
//     } catch (error) {
//         console.error('Error inserting document:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// function isBetweenTimes(currentTime, startTime, stopTime) {
//     return moment(currentTime, 'HH:mm:ss').isBetween(moment(startTime, 'HH:mm:ss'), moment(stopTime, 'HH:mm:ss'), null, '[]');
// }

// app.post('/signin', async (req, res) => {
//     const requestData = req.body;

//     try {
//         const user = await data.collection('accounts').findOne({ username: requestData.username });

//         if (!user) {
//             return res.status(401).json({ error: 'Unauthorized', message: 'User not found.' });
//         }

//         if (user.userType === 'RESTAURANT') {
//             // Check if the current time is between start and stop times
//             const currentTime = moment().format('HH:mm:ss');
//             if (!isBetweenTimes(currentTime, backendObject.start, backendObject.stop)) {
//                 return res.status(401).json({ error: 'Unauthorized', message: 'Login not allowed at this time' });
//             }
//         }

//         if (user.password === requestData.password) {
//             return res.json({ message: 'Signin successful', accounttype: user.userType, id: user._id });
//         } else {
//             return res.status(401).json({ error: 'Unauthorized', message: 'Incorrect Username or Password' });
//         }
//     } catch (error) {
//         console.error('Error querying document:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.get('/restaurants', async (req, res) => {
//     try {
//         // Assuming you have a collection named 'restaurants' in your database
//         const restaurants = await data.collection('accounts').find({userType: 'RESTAURANT'}).toArray();
//         res.json(restaurants);
//     } catch (error) {
//         console.error('Error querying restaurants:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.get('/customers', async (req, res) => {
//     try {
//         // Assuming you have a collection named 'restaurants' in your database
//         const restaurants = await data.collection('accounts').find({userType: 'CUSTOMER'}).toArray();
//         res.json(restaurants);
//     } catch (error) {
//         console.error('Error querying restaurants:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.get('/Ngo', async (req, res) => {
//     try {
//         // Assuming you have a collection named 'restaurants' in your database
//         const restaurants = await data.collection('accounts').find({userType: 'NGO'}).toArray();
//         res.json(restaurants);
//     } catch (error) {
//         console.error('Error querying restaurants:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.get('/list/:required', async (req, res) => {
//     const { user } = req.query;
//     const {required} = req.params;
//     let type;
//     if(required==='restaurants'){
//         type="RESTAURANT";
//     }
//     if(required==='Ngo'){
//         type="NGO";
//     }
//     try {
//         const userData = await data.collection('accounts').findOne({ username: user });
//         if (!userData || !userData.geometry) {
//             return res.status(400).json({ error: 'User or user location not found' });
//         }
//         const userLocation = userData.geometry;

//         // Get all restaurants from the database
//         const restaurants = await data.collection('accounts').find({ userType: type }).toArray();

//         // Filter restaurants within 10km radius
//         const nearbyRestaurants = restaurants.filter(restaurant => {
//             if (!restaurant.geometry) {
//                 return false; // Skip restaurants with missing or undefined geometry
//             }
//             const restaurantLocation = restaurant.geometry;
//             const distance = getDistance(userLocation, restaurantLocation);
//             const distanceInKm = distance / 1000; // Convert meters to kilometers
//             return distanceInKm <= 10;
//         });

//         // Map the restaurants to include only necessary fields and check if menu exists
//         const formattedRestaurants = nearbyRestaurants.map(restaurant => ({
//             username: restaurant.username,
//             url: restaurant.url,
//             location: restaurant.location,
//             menu: restaurant.menu ? restaurant.menu : null // Check if menu exists
//         }));
        
//         res.json(formattedRestaurants);
//     } catch (error) {
//         console.error('Error querying restaurants:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.put('/user/:username/update', async (req, res) => {
//     const { username } = req.params;
//     const updatedData = req.body;
//     const coordinates = await getCoordinates(updatedData.location);
//     updatedData.geometry = coordinates;

//     try {
//         // Find the user document by username
//         const user = await data.collection('accounts').findOne({ username: username });

//         if (user) {
//             // Update the user document with the new data
//             await data.collection('accounts').updateOne(
//                 { username },
//                 { $set: updatedData }
//             );

//             res.json({ message: 'Profile updated successfully' });
//         } else {
//             res.status(404).json({ error: 'User not found' });
//         }
//     } catch (error) {
//         console.error('Error updating profile:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });


// app.post('/reset', async (req, res) => {
//     const requestData = req.body;
//     //console.log(requestData);

//     try {
//         const user = await data.collection('accounts').findOne({ username: requestData.username });
//         if (user && user.email === requestData.email) {
//             try {
//                 const info = await transporter.sendMail({
//                     from: 'chase.shields92@ethereal.email',
//                     to: user.email,
//                     subject: 'Password Recovery',
//                     text: `Your password is: ${user.password}`
//                 });
                
//                 //console.log('Email sent:', info.messageId);
//                 res.status(200).json({ message: 'Password sent to your email' });
//             } catch (error) {
//                 console.error('Error sending email:', error);
//                 res.status(500).json({ error: 'Error sending email' });
//             }
//         } else {
//             res.status(401).json({ error: 'Unauthorized', message: 'Incorrect Username or Email' });
//         }
//     } catch (error) {
//         console.error('Error querying document:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.get('/user/:username', async (req, res) => {
//     const {username} = req.params;
//     // Example: Query data from a MongoDB collection
//     try {
//         const user = await data.collection('accounts').findOne({ username: username });
//         if (user ) {
//             res.json(user);
//         } else {
//             res.status(401).json({ error: 'Unauthorized',message: 'Unauthorized'});
//         }
//     } catch (error) {
//         console.error('Error querying document:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.get('/Restaurants/:username/orders', async (req, res) => {
//     const { username } = req.params;
//     const { day } = req.query;
//     try {
//         const userOrders = await data.collection('orders').findOne({ username: username });
//         res.json({orders:userOrders.items[day]})
//     } catch (error) {
//         console.error('Error querying document:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.get('/Restaurants/:username/menu', async (req, res) => {
//     const { username } = req.params;
//     try {
//         const user = await data.collection('accounts').findOne({ username: username });
//         if (user) {
//             if (user.menu) {
//                 const menu = user.menu;
//                 res.json({menu:menu});
//             } else {
//                 res.json({ error: 'No Menu yet' });
//             }
//         } else {
//             res.json({ error: 'User not found',date: day.getDate()});
//         }
//     } catch (error) {
//         console.error('Error querying document:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.get('/Restaurants/:username/menu/:itemname', async (req, res) => {
//     const { username,itemname } = req.params;
//     try {
//         const user = await data.collection('accounts').findOne({ username: username });
//         if (user) {
//             if (user.menu) {
//                 if(itemname){
//                     const item=user.menu[itemname];
//                     res.json({item:item});
//                 }
//             } else {
//                 res.json({ error: 'No Menu yet' });
//             }
//         } else {
//             res.json({ error: 'User not found',date: day.getDate()});
//         }
//     } catch (error) {
//         console.error('Error querying document:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.post('/Restaurants/:username/menu/add', async (req, res) => {
//     const { username } = req.params;
//     const newItem = req.body;

//     try {
//         // Find the user document by username
//         const user = await data.collection('accounts').findOne({ username: username });

//         if (user) {
//             // If the menu field doesn't exist yet, create it as an empty object
//             if (!user.menu) {
//                 user.menu = {};
//             }

//             // Use the Name field as the itemId
//             const itemId = newItem.Name;

//             // Add the new item to the menu object using the itemId as the key
//             user.menu[itemId] = {
//                 url: newItem.url,
//                 Description: newItem.description,
//                 count: newItem.count,
//                 price: newItem.price
//             };

//             // Update the user document in the database
//             await data.collection('accounts').updateOne(
//                 { username },
//                 { $set: { menu: user.menu } }
//             );

//             res.json({ message: 'Item added to menu successfully' });
//         } else {
//             res.status(404).json({ error: 'User not found' });
//         }
//     } catch (error) {
//         console.error('Error querying document:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.post('/Restaurants/menu/delete',async(req,res)=>{
//     const requestData = req.body;
//     try {
//         const user = await data.collection('accounts').findOne({ username: requestData.username });
//         if (user) {
//             delete user.menu[requestData.itemname];
//             await data.collection('accounts').updateOne(
//                 { username: requestData.username },
//                 { $set: { menu: user.menu } }
//             );
//         } else {
//             res.status(404).json({ error: 'User not found' });
//         }
//     } catch (error) {
//         console.error('Error querying document:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.post('/upload', upload.single('image'), async (req, res) => {
//     try {
//         // Check if file is present in request
//         if (!req.file) {
//             return res.status(400).json({ error: 'No file uploaded' });
//         }
//         //console.log('Uploaded file:', req.file.path);
//         const result = await uploadimg(req.file.path);

//         // Return the URL to the frontend
//         //console.log(result);
//         res.json({ url: result });
//     } catch (error) {
//         console.error('Error uploading file:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// app.get('/dist', async (req, res) => {
//     try {
//         const { user1, user2 } = req.query;
//         const u1 = await data.collection('accounts').findOne({ username: user1 });
//         const u2 = await data.collection('accounts').findOne({ username: user2 });
//         if (!u1 || !u2) {
//             return res.status(404).json({ error: 'One or both users not found' });
//         }
//         if (!u1.geometry || !u2.geometry) {
//             return res.status(400).json({ error: 'User objects missing geometry information' });
//         }
//         let distance = getDistance(u1.geometry, u2.geometry);
//         res.json({ distance: distance });
//     } catch (error) {
//         console.error('Error calculating distance:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });
// app.get('/id',async(req,res)=>{
//     const {id}=req.query;
//     try{
//         //console.log('ID:', id);
//         const user = await data.collection('accounts').findOne({ _id: new ObjectId(id) });
//         res.json(user);
//     }
//     catch (error) {
//         console.error('Error uploading file:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// })

//     app.post('/user/payment/:mode', async (req, res) => {
//         const {id} = req.query;
//         const {mode} = req.params;
//         const to=req.body['to'];
//         try {
//         const lineItems = []; 
//         for (const item of req.body['cart']) {
//             const restaurant = item.restaurant;
//             const itemName = item.item;
//             const menu = await data.collection('accounts').findOne({ username: restaurant });
//             const menuItem=menu.menu[itemName];
//             //console.log(menuItem);
//             const lineItem = {
//                 price_data: {
//                     currency: 'inr',
//                     product_data: {
//                         name: `${itemName} - ${restaurant}`
//                     },
//                     unit_amount: parseInt(menuItem.price) * 80
//                 },
//                 quantity: item.count
//             };
//             lineItems.push(lineItem);
//         }
//         lineItems.push(
//             {price_data: {
//             currency: 'inr',
//             product_data: {
//                 name: 'delivery charges' 
//             },
//             unit_amount: parseInt(req.body.delivery)*100
//         },
//         quantity: 1});
//         //console.log(lineItems);
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             mode: 'payment',
//             line_items: lineItems,
//             success_url: `http://localhost:5173/user/${id}/order/success/${mode}/${to}`, 
//             cancel_url:  `http://localhost:5173/user/${id}/order/failure`,
//         });

//         res.json({ url: session.url });
//         } catch (e) {
//         // Handle any errors and send an error response
//         res.status(500).json({ error: e.message });
//         }
//     });

//     const calculateTotalCost = (cart) => {
//         let total = 0;
//         cart.forEach(item => {
//             total += parseFloat(item.price) * item.count;
//         });
//         return(total);
//     };

//     app.post('/post/order/:mode', async (req, res) => {
//         const { user, to } = req.query;
//         const {mode} = req.params;
//         const cart = req.body;
//         const todayDate = new Date().toISOString().split('T')[0]; // Format today's date as a string
//         const timeString = new Date().toTimeString().split(' ')[0];
//         const val=calculateTotalCost(cart);
//         const datetime=todayDate+' '+timeString;
//         if (!user) {
//             return res.status(400).json({ error: 'User must be provided in the query parameters' });
//         }
//         try {
//             let userOrder = await data.collection('orders').findOne({ username: user });
//             if (!userOrder) {
//                 userOrder = { username: user, orders: {} }; // Initialize orders as an empty object
//             }
//             for (const item of cart) {
//                 let restaurantOrder = await data.collection('orders').findOne({ username: item.restaurant });
//                 let restaurant = await data.collection('accounts').findOne({ username: item.restaurant });
//                 restaurant.menu[item.item].count=parseInt(restaurant.menu[item.item].count)-parseInt(item.count);
//                 if (!restaurantOrder) {
//                     restaurantOrder = { username: item.restaurant, items: {} }; // Initialize items as an empty object
//                 }
//                 if (!restaurantOrder.items[todayDate]) {
//                     restaurantOrder.items[todayDate] = []; // Initialize items for today's date as an empty array
//                 }
//                 let customer = user;
//                 if (to) {
//                     customer = to;
//                 }
//                 restaurantOrder.items[todayDate].push({
//                     item: item.item,
//                     customer: customer,
//                     cost: item.price,
//                     count: item.count,
//                 });
//                 let donated = null;
//                 if (to!== user) {
//                     donated = to;
//                 }
//                 await data.collection('orders').updateOne({ username: item.restaurant }, { $set: restaurantOrder }, { upsert: true });
//                 await data.collection('accounts').updateOne({ username: item.restaurant }, {$set: restaurant }, {upsert: true});
//                 userOrder.orders[datetime] = userOrder.orders[datetime] || [{mode:mode,donated:donated,value:val}]; // Initialize orders for today's date as an empty array
//                 userOrder.orders[datetime].push({
//                     item: item.item,
//                     restaurant: item.restaurant,
//                     cost: item.price,
//                     count: item.count,
//                 });
//                 if(donated){
//                     let ngo = await data.collection('orders').findOne({ username: donated });
//                     if(!ngo){
//                         ngo = { username: to, orders: {} };
//                     }
//                     ngo.orders[datetime] = ngo.orders[datetime] || [{donatedby: user}];
//                     ngo.orders[datetime].push({
//                         item: item.item,
//                         restaurant: item.restaurant,
//                         cost: item.price,
//                         count: item.count
//                     });
//                     await data.collection('orders').updateOne({ username: to},{$set:ngo},{upsert: true});
//                 }
//             }
//             await data.collection('orders').updateOne({ username: user }, { $set: userOrder }, { upsert: true });
//             res.status(200).json({ message: 'Order placed successfully' });
//         } catch (error) {
//             console.error('Error placing order:', error);
//             res.status(500).json({ error: 'An error occurred while placing the order' });
//         }
//     });
    
//     app.get('/orderhistory',async(req,res)=>{
//         const {username} = req.query;
//         try{
//             const user = await data.collection('orders').findOne({username:username});
//             const orders= user.orders||{};
//             res.json(orders);
//         }
//         catch{
//             res.status(500).json({ error: 'server error' });
//         }
//     })

//     app.get('/donationhistory', async (req, res) => {
//         const { username } = req.query;
//         // const { username } = "NGO"; // This line seems unnecessary or misplaced
//         console.log(username)
//         console.log("hello");
//         try {
//             const user = await data.collection('orders').findOne({ username: username });
//             const orders = user ? user.orders || {} : {};
//             res.json(orders);
//         } catch (error) {
//             res.status(500).json({ error: 'server error' });
//         }
//     });
    

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// });

// module.exports=app;
=======
>>>>>>> origin/main
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
const moment = require('moment');
const stripe=require('stripe')(process.env.STRIPE_KEY);

const port = 5000;
let data;
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
}));
//app.use(cors());
app.use(express.json());
const upload = multer({ dest: 'uploads/' });
let backendObject={start:'00-00-00',stop:'23-59-59'};

// Function to get coordinates for a given address
async function getCoordinates(address) {
    try {
        const data = await opencage.geocode({ q: address });
        if (data.status.code === 200 && data.results.length > 0) {
            const place = data.results[0];
            const coordinates = place.geometry;
            return coordinates;
        } else {
            //console.log('Error: Unable to fetch coordinates');
            return null;
        }
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

<<<<<<< HEAD
async function getLocationString(lat, long) {
    try {
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${process.env.OPENCAGE_API_KEY}&language=en&pretty=1`);
        const data = await response.json();

        if (data.status.code === 200 && data.results.length > 0) {
            const locationString = data.results[0].formatted;
            return locationString;
        } else {
            //console.log('Error: Unable to fetch location string');
            return null;
        }
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

=======
>>>>>>> origin/main
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

app.get('/validatePasskey', (req, res) => {
    const passkey = req.query.passkey;
    const expectedPasskey = '22CS10015';
    console.log(passkey);

    if (passkey === expectedPasskey) {
        res.status(200).send('Passkey is valid');
    } else {
        res.status(400).send('Passkey is invalid');
    }
});

app.post('/setTimes', (req, res) => {
    const { start, stop } = req.body;
    
    if (!start || !stop) {
        return res.status(400).json({ error: 'Both start and stop times are required.' });
    }

    backendObject.start = start;
    backendObject.stop = stop;

    res.status(200).json({ message: 'Start and stop times set successfully.' });
});


app.post('/signup', async (req, res) => {
    const requestData = req.body;
    
    // Example: Insert data into a MongoDB collection
    if(await data.collection('accounts').findOne({ username: requestData.username })){
        res.status(501).json({ message: 'OOPS! Username unavailable' });
        //console.log("Alredy exists");
        return;
    }
    try {
        requestData.url='https://th.bing.com/th/id/OIP.e35f-y2MkeVR4oDiXDG9vgHaHa?rs=1&pid=ImgDetMain';
<<<<<<< HEAD
        //const coordinates = await getCoordinates(requestData.location);
        //console.log(requestData.location);
        let geometry=requestData.location;
        requestData.location=await getLocationString(geometry.lat,geometry.lng);
        console.log(requestData.location);
        requestData.geometry = geometry;
=======
        const coordinates = await getCoordinates(requestData.location);
        if (!coordinates) {
            return res.status(500).json({ error: 'Error fetching coordinates' });
        }
        requestData.geometry = coordinates;
>>>>>>> origin/main
        //console.log(requestData);
        const result = await data.collection('accounts').insertOne(requestData);
        //console.log('Inserted document with _id:', result.insertedId);
        res.json({ message: 'Data received successfully' });
    } catch (error) {
        console.error('Error inserting document:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

<<<<<<< HEAD




=======
>>>>>>> origin/main
function isBetweenTimes(currentTime, startTime, stopTime) {
    return moment(currentTime, 'HH:mm:ss').isBetween(moment(startTime, 'HH:mm:ss'), moment(stopTime, 'HH:mm:ss'), null, '[]');
}

app.post('/signin', async (req, res) => {
    const requestData = req.body;

    try {
        const user = await data.collection('accounts').findOne({ username: requestData.username });

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized', message: 'User not found.' });
        }

        if (user.userType === 'RESTAURANT') {
            // Check if the current time is between start and stop times
            const currentTime = moment().format('HH:mm:ss');
            if (!isBetweenTimes(currentTime, backendObject.start, backendObject.stop)) {
                return res.status(401).json({ error: 'Unauthorized', message: 'Login not allowed at this time' });
            }
        }

        if (user.password === requestData.password) {
            return res.json({ message: 'Signin successful', accounttype: user.userType, id: user._id });
        } else {
            return res.status(401).json({ error: 'Unauthorized', message: 'Incorrect Username or Password' });
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

app.get('/customers', async (req, res) => {
    try {
        // Assuming you have a collection named 'restaurants' in your database
        const restaurants = await data.collection('accounts').find({userType: 'CUSTOMER'}).toArray();
        res.json(restaurants);
    } catch (error) {
        console.error('Error querying restaurants:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/Ngo', async (req, res) => {
    try {
        // Assuming you have a collection named 'restaurants' in your database
        const restaurants = await data.collection('accounts').find({userType: 'NGO'}).toArray();
        res.json(restaurants);
    } catch (error) {
        console.error('Error querying restaurants:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/list/:required', async (req, res) => {
    const { user } = req.query;
    const {required} = req.params;
    let type;
    if(required==='restaurants'){
        type="RESTAURANT";
    }
    if(required==='Ngo'){
        type="NGO";
    }
    try {
        const userData = await data.collection('accounts').findOne({ username: user });
        if (!userData || !userData.geometry) {
            return res.status(400).json({ error: 'User or user location not found' });
        }
        const userLocation = userData.geometry;

        // Get all restaurants from the database
        const restaurants = await data.collection('accounts').find({ userType: type }).toArray();

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
<<<<<<< HEAD
    const location = await getLocationString(updatedData.geometry.lat,updatedData.geometry.lng);
    updatedData.location = location;
    console.log(location);
=======
    const coordinates = await getCoordinates(updatedData.location);
    updatedData.geometry = coordinates;

>>>>>>> origin/main
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
    //console.log(requestData);

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
                
                //console.log('Email sent:', info.messageId);
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
    const { day } = req.query;
    try {
        const userOrders = await data.collection('orders').findOne({ username: username });
        res.json({orders:userOrders.items[day]})
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

<<<<<<< HEAD
// app.get('/Restaurants/:username/menu', async (req, res) => {
//     const { username } = req.params;
    
//     try {
//         const user = await data.collection('accounts').findOne({ username: username });

//         if (user) {
//             if (user.menu) {
//                 const menu = user.menu;
//                 res.json({ menu: menu });
//             } else {
//                 res.json({ error: 'No Menu yet' });
//             }
//         } else {
//             res.status(404).json({ error: 'User not found', date: new Date().getDate() });
//         }
//     } catch (error) {
//         console.error('Error querying document:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });






=======
>>>>>>> origin/main
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

<<<<<<< HEAD
// app.post('/Restaurants/:username/menu/add', async (req, res) => {
//     const { username } = req.params;
//     const newItem = req.body;

//     try {
//         // Find the user document by username
//         const user = await data.collection('accounts').findOne({ username: username });

//         if (user) {
//             // If the menu field doesn't exist yet, create it as an empty object
//             if (!user.menu) {
//                 user.menu = {};
//             }

//             // Use the Name field as the itemId
//             const itemId = newItem.Name;

//             // Add the new item to the menu object using the itemId as the key
//             user.menu[itemId] = {
//                 url: newItem.url,
//                 Description: newItem.description,
//                 count: newItem.count,
//                 price: newItem.price
//             };

//             // Update the user document in the database
//             await data.collection('accounts').updateOne(
//                 { username },
//                 { $set: { menu: user.menu } }
//             );

//             res.json({ message: 'Item added to menu successfully' });
//         } else {
//             res.status(404).json({ error: 'User not found' });
//         }
//     } catch (error) {
//         console.error('Error querying document:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

=======
>>>>>>> origin/main
app.post('/Restaurants/:username/menu/add', async (req, res) => {
    const { username } = req.params;
    const newItem = req.body;

<<<<<<< HEAD
    // Extracting fields from newItem
    const { Name, url, description, count, price } = newItem;

    // Validation checks
    if (!Name || !url || !description || !count || !price) {
        return res.status(400).json({ error: 'All fields (Name, url, description, count, price) are required' });
    }

    if (count < 0 || price < 0) {
        return res.status(400).json({ error: 'Count and price should be positive values' });
    }

=======
>>>>>>> origin/main
    try {
        // Find the user document by username
        const user = await data.collection('accounts').findOne({ username: username });

        if (user) {
            // If the menu field doesn't exist yet, create it as an empty object
            if (!user.menu) {
                user.menu = {};
            }

            // Use the Name field as the itemId
<<<<<<< HEAD
            const itemId = Name;

            // Add the new item to the menu object using the itemId as the key
            user.menu[itemId] = {
                url: url,
                Description: description,
                count: count,
                price: price
=======
            const itemId = newItem.Name;

            // Add the new item to the menu object using the itemId as the key
            user.menu[itemId] = {
                url: newItem.url,
                Description: newItem.description,
                count: newItem.count,
                price: newItem.price
>>>>>>> origin/main
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

<<<<<<< HEAD




=======
>>>>>>> origin/main
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
        //console.log('Uploaded file:', req.file.path);
        const result = await uploadimg(req.file.path);

        // Return the URL to the frontend
        //console.log(result);
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
        //console.log('ID:', id);
        const user = await data.collection('accounts').findOne({ _id: new ObjectId(id) });
        res.json(user);
    }
    catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

    app.post('/user/payment/:mode', async (req, res) => {
        const {id} = req.query;
        const {mode} = req.params;
        const to=req.body['to'];
        try {
        const lineItems = []; 
        for (const item of req.body['cart']) {
            const restaurant = item.restaurant;
            const itemName = item.item;
            const menu = await data.collection('accounts').findOne({ username: restaurant });
            const menuItem=menu.menu[itemName];
            //console.log(menuItem);
            const lineItem = {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: `${itemName} - ${restaurant}`
                    },
                    unit_amount: parseInt(menuItem.price) * 80
                },
                quantity: item.count
            };
            lineItems.push(lineItem);
        }
        lineItems.push(
            {price_data: {
            currency: 'inr',
            product_data: {
                name: 'delivery charges' 
            },
            unit_amount: parseInt(req.body.delivery)*100
        },
        quantity: 1});
        //console.log(lineItems);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: lineItems,
            success_url: `http://localhost:5173/user/${id}/order/success/${mode}/${to}`, 
            cancel_url:  `http://localhost:5173/user/${id}/order/failure`,
        });

        res.json({ url: session.url });
        } catch (e) {
        // Handle any errors and send an error response
        res.status(500).json({ error: e.message });
        }
    });

    app.post('/Ngo/payment/:mode', async (req, res) => {
        const {id} = req.query;
        const {mode} = req.params;
        const to=req.body['to'];
        try {
        const lineItems = []; 
        for (const item of req.body['cart']) {
            const restaurant = item.restaurant;
            const itemName = item.item;
            const menu = await data.collection('accounts').findOne({ username: restaurant });
            const menuItem=menu.menu[itemName];
            //console.log(menuItem);
            const lineItem = {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: `${itemName} - ${restaurant}`
                    },
                    unit_amount: parseInt(menuItem.price) * 60
                },
                quantity: item.count
            };
            lineItems.push(lineItem);
        }
        lineItems.push(
            {price_data: {
            currency: 'inr',
            product_data: {
                name: 'delivery charges' 
            },
            unit_amount: parseInt(req.body.delivery)*100
        },
        quantity: 1});
        //console.log(lineItems);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: lineItems,
            success_url: `http://localhost:5173/Ngo/${id}/order/success/${mode}/${to}`, 
            cancel_url:  `http://localhost:5173/Ngo/${id}/order/failure`,
        });

        res.json({ url: session.url });
        } catch (e) {
        // Handle any errors and send an error response
        res.status(500).json({ error: e.message });
        }
    });

    const calculateTotalCost = (cart) => {
        let total = 0;
        cart.forEach(item => {
            total += parseFloat(item.price) * item.count;
        });
        return(total);
    };

    app.post('/post/order/:mode', async (req, res) => {
        const { user, to } = req.query;
        const {mode} = req.params;
        const cart = req.body;
        const todayDate = new Date().toISOString().split('T')[0]; // Format today's date as a string
        const timeString = new Date().toTimeString().split(' ')[0];
        const val=calculateTotalCost(cart);
        const datetime=todayDate+' '+timeString;
        if (!user) {
            return res.status(400).json({ error: 'User must be provided in the query parameters' });
        }
        try {
            let userOrder = await data.collection('orders').findOne({ username: user });
            if (!userOrder) {
                userOrder = { username: user, orders: {} }; // Initialize orders as an empty object
            }
            for (const item of cart) {
                let restaurantOrder = await data.collection('orders').findOne({ username: item.restaurant });
                let restaurant = await data.collection('accounts').findOne({ username: item.restaurant });
                restaurant.menu[item.item].count=parseInt(restaurant.menu[item.item].count)-parseInt(item.count);
                if (!restaurantOrder) {
                    restaurantOrder = { username: item.restaurant, items: {} }; // Initialize items as an empty object
                }
                if (!restaurantOrder.items[todayDate]) {
                    restaurantOrder.items[todayDate] = []; // Initialize items for today's date as an empty array
                }
                let customer = user;
                if (to) {
                    customer = to;
                }
                restaurantOrder.items[todayDate].push({
                    item: item.item,
                    customer: customer,
                    cost: item.price,
                    count: item.count,
                });
                let donated = null;
                if (to!== user) {
                    donated = to;
                }
                await data.collection('orders').updateOne({ username: item.restaurant }, { $set: restaurantOrder }, { upsert: true });
                await data.collection('accounts').updateOne({ username: item.restaurant }, {$set: restaurant }, {upsert: true});
                userOrder.orders[datetime] = userOrder.orders[datetime] || [{mode:mode,donated:donated,value:val}]; // Initialize orders for today's date as an empty array
                userOrder.orders[datetime].push({
                    item: item.item,
                    restaurant: item.restaurant,
                    cost: item.price,
                    count: item.count,
                });
                if(donated){
                    let ngo = await data.collection('orders').findOne({ username: donated });
                    if(!ngo){
                        ngo = { username: to, orders: {} };
                    }
                    ngo.orders[datetime] = ngo.orders[datetime] || [{donatedby: user}];
                    ngo.orders[datetime].push({
                        item: item.item,
                        restaurant: item.restaurant,
                        cost: item.price,
                        count: item.count
                    });
                    await data.collection('orders').updateOne({ username: to},{$set:ngo},{upsert: true});
                }
            }
            await data.collection('orders').updateOne({ username: user }, { $set: userOrder }, { upsert: true });
            res.status(200).json({ message: 'Order placed successfully' });
        } catch (error) {
            console.error('Error placing order:', error);
            res.status(500).json({ error: 'An error occurred while placing the order' });
        }
    });
    
    app.get('/orderhistory',async(req,res)=>{
        const {username} = req.query;
        try{
            const user = await data.collection('orders').findOne({username:username});
            const orders= user.orders||{};
            res.json(orders);
        }
        catch{
            res.status(500).json({ error: 'server error' });
        }
    })

    app.get('/donationhistory', async (req, res) => {
        const { username } = req.query;
        // const { username } = "NGO"; // This line seems unnecessary or misplaced
        console.log(username)
        console.log("hello");
        try {
            const user = await data.collection('orders').findOne({ username: username });
            const orders = user ? user.orders || {} : {};
            res.json(orders);
        } catch (error) {
            res.status(500).json({ error: 'server error' });
        }
    });
    

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

<<<<<<< HEAD
module.exports=app;
=======
module.exports=app;
>>>>>>> origin/main
