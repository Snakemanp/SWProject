import React, { useEffect, useState } from 'react';

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
        <div id='signin block'>
            <h2>SIGNIN</h2>
            <form id='signin' className='signup'>
                <label htmlFor="username1">Username</label>
                <input id='username1' type='text' value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <label htmlFor="password1">Password</label>
                <input id='password1' type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </form>
            <button onClick={send}>Login</button>
        </div>
    );
}

export default Login;
