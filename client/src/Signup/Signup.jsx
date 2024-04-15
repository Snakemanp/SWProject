import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './navbar.jsx';
import Bottom from './bottom.jsx';
import '../../styles/signup.css';
import MapComponent from '../Mapquest.jsx';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [ResponseData, setResponseData] = useState('');
    const navigate = useNavigate();

    const send = () => {
        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        };
        fetch("http://localhost:5000/signin",data)
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            setResponseData(data.message);
            if (data.message === 'Signin successful') {
                console.log(data.id)
                if(data.accounttype==='CUSTOMER') navigate(`/user/${data.id}`);
                if(data.accounttype==='RESTAURANT') navigate(`/Restaurants/${data.id}`);
                if(data.accounttype==='NGO') navigate(`/Ngo/${data.id}`);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };

    return (
        <div className='content'>
        <Navbar />
        <div className='signinblock content-main'>
            <h1 className='Head ele-1'>SIGNIN</h1>
            <form className='grid-ele signup' >
                <label className='grid-ele ele-2' htmlFor="username1">Username</label>
                <input className='grid-ele ele-3' id='username1' type='text' style={{color:'black'}} value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <label className='grid-ele ele-4' htmlFor="password1">Password</label>
                <input className='grid-ele ele-5' id='password1' type='password' style={{color:'black'}} value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </form>
            <p id='message' className='grid-ele ele-6'>{ResponseData}</p>
            <button className='grid-ele ele-7' onClick={send}>Login</button>
            <h3 className='ele-6'>Forgout your Password ?</h3>
            <Link to='/reset' className='ele-7'>
                <button>Recover</button>
            </Link>
        </div>
        <Bottom />
        </div>
    );
}

function Home(){
    return(
        <div className='content'>
        <Navbar />
        <div className='Home content-main'>
            <h1>Social Service Food Delivery System</h1>
            <p>Welcome to Social Service Food Delivery Site,<br/> Where you can order from our Restaurants.
            <br />Feel free to share some of your own and rate on others!</p>
            <Link to='/signin'>
                <button className='link-button'>Signin</button>
            </Link>
        </div>
        <Bottom />
        </div>
    );
}

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState({lat:null,long:null});
    const [userType, setUserType] = useState('CUSTOMER');
    const [responseData,setresponseData] = useState('');
    const navigate=useNavigate();
    const handleSubmit = (e) => {
        console.log(location);
      e.preventDefault();
      // Validation logic
      if (!username || !email || !password || !location.lat) {
        alert('Please fill in all fields!');
        return;
      }
      const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username,email, password,location,userType })
    };
      fetch("http://localhost:5000/signup",data)
      .then(response => response.json())
        .then(data => {
            console.log(data.message);
            if(data.message==='Data received successfully') navigate('/signin');
            setresponseData(data.message);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };
  
    return (
    <div className='content'>
    <Navbar />
      <div className='signinblock content-main'>
        <h1 className='Head ele-1'>Sign Up</h1>
        <form onSubmit={handleSubmit} className ='signup'>
            <label>Username:</label>
            <input className='input-details'
              type="text"
              value={username}
              style={{color:'black'}}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Email:</label>
            <input className='input-details'
              type="email"
              value={email}
              style={{color:'black'}}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password:</label>
            <input className='input-details'
              type="password"
              value={password}
              style={{color:'black'}}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Location:</label>
            <MapComponent setLocation={setLocation} location={location}/>
            <label>User Type:</label>
            <select className='input-details' value={userType} onChange={(e) => setUserType(e.target.value)}>
              <option value="RESTAURANT">Restaurant</option>
              <option value="NGO">NGO</option>
              <option value="CUSTOMER">Customer</option>
            </select>
            <p className='grid-ele ele-7'>{responseData}</p>
            <button type="submit" className='grid-ele ele-7'>Sign Up</button>
        </form>
      </div>
    <Bottom />
    </div>
    );
  }







  function Restaurants() {
      const [restaurants, setRestaurants] = useState([]);
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
        <div className='content'>
        <Navbar />
        <div className='restaurant-list content-main'>
            <h1 className='Head ele-1'>Our Partnered Restaurants</h1>
            {restaurants.map((restaurant, index) => (
                <div key={index} className='restaurant-ele'>
                    <img className='icon' src={restaurant.url} alt='Restaurant' />
                    <div>
                        <h3>{restaurant.username}</h3>
                        <p>{restaurant.location}</p>
                    </div>
                </div>
            ))}
        </div>
        <Bottom />
        </div>
    ); 
  } 
  function Reset() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [responseData, setResponseData] = useState('');

    const send = () => {
        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email })
        };
        fetch("http://localhost:5000/reset", data)
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                setResponseData(data.message);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    return (
        <div className='content'>
            <Navbar />            <div className='signinblock'>
                <h1 className='Head ele-1'>RECOVER PASSWORD</h1>
                <form className='grid-ele signup' >
                    <label className='grid-ele ele-2' htmlFor="username1">Username</label>
                    <input className='grid-ele ele-3' id='username1' type='text' value={username} onChange={(e) => setUsername(e.target.value)}></input>
                    <label className='grid-ele ele-4' htmlFor="password1">EMAIL</label>
                    <input className='grid-ele ele-5' id='email1' type='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </form>
                <p id='message' className='grid-ele ele-6'>{responseData}</p>
                <button className='grid-ele ele-7' onClick={send}>Recover</button>
            </div>
            <Bottom />
        </div>
    );
}

export {Home,Login,Signup,Restaurants,Reset};