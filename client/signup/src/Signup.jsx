import React, { useEffect, useState } from 'react';
import './signup.css'
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [responseData, setResponseData] = useState([]);

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
        <div id='signinblock'>
            <h1 className='Head ele-1'>SIGNIN</h1>
            <form className='grid-ele signup' id='signin'>
                <label className='grid-ele ele-2' htmlFor="username1">Username</label>
                <input className='grid-ele ele-3' id='username1' type='text' value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <label className='grid-ele ele-4' htmlFor="password1">Password</label>
                <input className='grid-ele ele-5' id='password1' type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </form>
            <p id='message'>{responseData}</p>
            <button className='grid-ele ele-6' onClick={send}>Login</button>
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
 export {Home,Login};