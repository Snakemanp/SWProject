import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from './navbar';
import Bottom from '../Signup/bottom';
<<<<<<< HEAD
import '../../styles/admin.css'
=======
>>>>>>> origin/main

function Home(){
    const navigate=useNavigate();
    return(
        <div className='content'>
        <Navbar />
<<<<<<< HEAD
        <div className='button-container'>
        <button onClick={()=>{navigate('restuarants')}} className='new-btn'>View Restaurants</button>
        <button onClick={()=>{navigate('customer')}} className='new-btn'>View Customers</button>
        <button onClick={()=>{navigate('Ngo')}} className='new-btn'>View NGOs</button>
        <button onClick={()=>{navigate('settime')}} className='new-btn'>Set Timings for Restaurants</button>
        </div>
=======
        <button onClick={()=>{navigate('restuarants')}}>View Restaurants</button>
        <button onClick={()=>{navigate('customer')}}>View Customers</button>
        <button onClick={()=>{navigate('Ngo')}}>View NGOs</button>
        <button onClick={()=>{navigate('settime')}}>Set Timings for Restaurants</button>
>>>>>>> origin/main
        <Bottom />
        </div>
    )
}

function Restaurants() {
    const [restaurants, setRestaurants] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchRestaurants();
    }, []); // Empty dependency array to ensure useEffect runs only once when the component mounts

    const fetchRestaurants = async () => {
        try {
            const response = await fetch("http://localhost:5000/restaurants");
            if (!response.ok) {
                throw new Error('Failed to fetch restaurants');
            }
            const data = await response.json();
            console.log(data);
            setRestaurants(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
      <div className='content' style={{color:'black'}}>
      <Navbar />
      <div className='restaurant-list content-main' style={{color:'black'}}>
          <h1 className='Head ele-1'>Restaurants</h1>
          {restaurants.map((restaurant, index) => (
              <div key={index} className='restaurant-ele'>
                  <img className='icon' src={restaurant.url} alt='Restaurant' />
                  <div>
                      <h3>{restaurant.username}</h3>
                      <p>{restaurant.location}</p>
                  </div>
                  <button onClick={()=>{navigate(`${restaurant.username}`)}}>View Orders</button>
              </div>
          ))}
      </div>
      <Bottom />
      </div>
  ); 
}

  function Restaurantsorder(){
        const [orderdata, setOrderdata] = useState([]);
        const tdate = new Date().toISOString().split('T')[0];
        const [selectedDate, setSelectedDate] = useState(tdate);
        const { name } = useParams();
    
        const fetchOrders = (date) => {
            fetch(`http://localhost:5000/Restaurants/${name}/orders?day=${date}`)
                .then(response => response.json())
                .then(data => {
                    if (data.orders) {
                        setOrderdata(data.orders);
                    }
                    else{
                        setOrderdata([]);
                    }
                })
                .catch(error => console.error('Error fetching orders:', error));
        };
    
        useEffect(() => {
            fetchOrders(selectedDate);
            console.log(orderdata);
        }, [selectedDate]);
    
        const handleDateChange = (e) => {
            setSelectedDate(e.target.value);
        };
    
        return (
            <div className='content' style={{ color: 'black', textAlign: 'center' }}>
                <Navbar />
                <h1>Orders on {selectedDate}</h1>
                <button type='button' onClick={() => setSelectedDate(tdate)}>Reset Date</button>
                <input id='date' type="date" value={selectedDate} onChange={handleDateChange} />
                {Object.values(orderdata).map((order, index) => (
<<<<<<< HEAD
                <div key={index} className='all-orders' style={{marginLeft:'20vw',marginRight:'20vw'}}>
=======
                <div key={index}>
>>>>>>> origin/main
                    <ul>
                        <li>
                            <p>Item: {order.item}</p>
                            <p>Customer: {order.customer}</p>
                            <p>Cost: {order.cost}</p>
                            <p>Count: {order.count}</p>
                        </li>
                    </ul>
                </div>
            ))}
                <Bottom />
            </div>
        );
    }

    function Customer(){
        const [restaurants, setRestaurants] = useState([]);
        const navigate = useNavigate();
        useEffect(() => {
            fetchRestaurants();
        }, []); // Empty dependency array to ensure useEffect runs only once when the component mounts

        const fetchRestaurants = async () => {
        try {
            const response = await fetch("http://localhost:5000/customers");
            if (!response.ok) {
                throw new Error('Failed to fetch restaurants');
            }
            const data = await response.json();
            console.log(data);
            setRestaurants(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
      <div className='content' style={{color:'black'}}>
      <Navbar />
      <div className='restaurant-list content-main' style={{color:'black'}}>
          <h1 className='Head ele-1'>All Customers</h1>
          {restaurants.map((restaurant, index) => (
              <div key={index} className='restaurant-ele'>
                  <img className='icon' src={restaurant.url} alt='Restaurant' />
                  <div>
                      <h3>{restaurant.username}</h3>
                      <p>{restaurant.location}</p>
                  </div>
                  <button onClick={()=>{navigate(`${restaurant.username}`)}}>View Orders</button>
              </div>
          ))}
      </div>
      <Bottom />
      </div>
    );
    }
    
    function Orderelement({order,datetime}){
        const mode = order[0].mode;
        const donated = order[0].donated;
        const value=order[0].value;
        const items = order.slice(1);
    
        return (
<<<<<<< HEAD
            <div className='all-orders' style={{marginLeft:'20vw',marginRight:'20vw'}}>
=======
            <div style={{backgroundColor:'blue',width:'30vw'}}>
>>>>>>> origin/main
                <p>Order on: {datetime}</p>
                <p>Order Mode: {mode}</p>
                <p>Order Value:{value}</p>
                {donated && <p>Donated to: {donated}</p>}
                {items.map((item, index) => (
                    <div key={index} style={{display:'flex',justifyContent:'space-around'}}>
                        <p>{item.item}</p>
                        <p>{item.restaurant}</p>
                        <p>Rs{item.cost}</p>
                        <p>{item.count}</p>
                    </div>
                ))}
            </div>
        );
    }
    function Customerorder() {
        const {username}=useParams();
        const [orders, setOrders] = useState([]);
    
        useEffect(() => {
            const fetchOrders = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/orderhistory?username=${username}`);
                    console.log(username);
                    if (response.ok) {
                        const data = await response.json();
                        setOrders(data);
                        console.log(data);
                    } else {
                        console.error('Failed to fetch orders:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching orders:', error);
                }
            };
    
            fetchOrders();
            console.log(orders);
        }, [username]);
    
        return (
            <div className='content'>
                <Navbar />
                <h1 style={{margin:'auto'}}>All Orders</h1>
                {Object.entries(orders).map(([key, value]) => (
                    <Orderelement key={key} order={value} datetime={key} />
                ))}
            <Bottom />
            </div>
        );
    }

    function Ngo(){
        const [restaurants, setRestaurants] = useState([]);
        const navigate = useNavigate();
        useEffect(() => {
            fetchRestaurants();
        }, []); // Empty dependency array to ensure useEffect runs only once when the component mounts

        const fetchRestaurants = async () => {
        try {
            const response = await fetch("http://localhost:5000/Ngo");
            if (!response.ok) {
                throw new Error('Failed to fetch restaurants');
            }
            const data = await response.json();
            console.log(data);
            setRestaurants(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
      <div className='content' style={{color:'black'}}>
      <Navbar />
      <div className='restaurant-list content-main' style={{color:'black'}}>
          <h1 className='Head ele-1'>All NGOs</h1>
          {restaurants.map((restaurant, index) => (
              <div key={index} className='restaurant-ele'>
                  <img className='icon' src={restaurant.url} alt='Restaurant' />
                  <div>
                      <h3>{restaurant.username}</h3>
                      <p>{restaurant.location}</p>
                  </div>
                  <button onClick={()=>{navigate(`${restaurant.username}`)}}>View Orders</button>
              </div>
          ))}
      </div>
      <Bottom />
      </div>
    );
    }

    
    function NgoHistory() {
        const {username}=useParams();
        const [orders, setOrders] = useState([]);
    
        useEffect(() => {
            const fetchOrders = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/orderhistory?username=${username}`);
                    console.log(username);
                    if (response.ok) {
                        const data = await response.json();
                        setOrders(data);
                        console.log(data);
                    } else {
                        console.error('Failed to fetch orders:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching orders:', error);
                }
            };
    
            fetchOrders();
            console.log(orders);
        }, [username]);
    
        return (
            <div className='content'>
                <Navbar />
                <h1 style={{margin:'auto'}}>All Orders</h1>
                {Object.entries(orders).map(([key, value]) => (
                    <Orderelement key={key} order={value} datetime={key} />
                ))}
            <Bottom />
            </div>
        );
    }
    
    function TimeSetter() {
        const [startTime, setStartTime] = useState('');
        const [stopTime, setStopTime] = useState('');
        const [message, setMessage] = useState('');
    
        const handleSubmit = async (e) => {
            e.preventDefault();
    
            try {
                const response = await fetch('http://localhost:5000/setTimes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ start: startTime, stop: stopTime }),
                });
                const data = await response.json();
                setMessage(data.message);
            } catch (error) {
                console.error('Error setting times:', error);
                setMessage('An error occurred while setting times.');
            }
        };
    
<<<<<<< HEAD
        return (<>
            <Navbar />
            <div className='admin-content'>
                <h2 className='admin-heading'>Set Begin and End Times</h2>
                <form onSubmit={handleSubmit} className='admin-form'>
                    <div className='admin-div'>
                        <label htmlFor="start-time" className='admin-label'>Begin Time:</label>
                        <input className='item-input'
=======
        return (
            <div className='content'>
                <Navbar />
                <h2>Set Begin and End Times</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="start-time">Begin Time:</label>
                        <input
>>>>>>> origin/main
                            type="time"
                            id="start-time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                        />
                    </div>
<<<<<<< HEAD
                    <div className='admin-div'>
                        <label htmlFor="stop-time" className='admin-label'>End Time:</label>
                        <input  className='item-input'
=======
                    <div>
                        <label htmlFor="stop-time">End Time:</label>
                        <input
>>>>>>> origin/main
                            type="time"
                            id="stop-time"
                            value={stopTime}
                            onChange={(e) => setStopTime(e.target.value)}
                        />
                    </div>
<<<<<<< HEAD
                    <button type="submit" className='admin-btn'>Set Times</button>
                </form>
                {message && <p className='admin-p'>{message}</p>}
            </div>
            <Bottom />
            </>
=======
                    <button type="submit">Set Times</button>
                </form>
                {message && <p>{message}</p>}
                <Bottom />
            </div>
>>>>>>> origin/main
        );
    }
    

export {Home,Restaurants,Restaurantsorder,Customer,Customerorder,Ngo,NgoHistory,TimeSetter}