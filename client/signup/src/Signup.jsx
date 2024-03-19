import React, { useEffect, useState } from 'react';
import './signup.css'
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [responseData, setResponseData] = useState('');

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
            console.log(data.users);
            setResponseData(data.users);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };

    return (
        <div className='signinblock'>
            <h1 className='Head ele-1'>SIGNIN</h1>
            <form className='grid-ele signup' >
                <label className='grid-ele ele-2' htmlFor="username1">Username</label>
                <input className='grid-ele ele-3' id='username1' type='text' value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <label className='grid-ele ele-4' htmlFor="password1">Password</label>
                <input className='grid-ele ele-5' id='password1' type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </form>
            <p id='message' className='grid-ele ele-6'>{responseData}</p>
            <button className='grid-ele ele-7' onClick={send}>Login</button>
        </div>
    );
}

function Home(){
    return(
        <div className='Home'>
            <h1>Social Service Food Delivery System</h1>
            <p>Welcome to Social Service Food Delivery Site,<br/> Where you can order from our Restaurants.
            <br />Feel free to share some of your own and rate on others!</p>
        </div>
    );
}

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const [userType, setUserType] = useState('CUSTOMER');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Validation logic
      if (!username || !email || !password || !location) {
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
            console.log(data.users);
            setResponseData(data.users);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };
  
    return (
      <div className='signinblock'>
        <h1 className='Head ele-1'>Sign Up</h1>
        <form onSubmit={handleSubmit} class ='signup'>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <label>User Type:</label>
            <select value={userType} onChange={(e) => setUserType(e.target.value)}>
              <option value="RESTAURANT">Restaurant</option>
              <option value="NGO">NGO</option>
              <option value="CUSTOMER">Customer</option>
            </select>
            <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
 export {Home,Login,Signup};