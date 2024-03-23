import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from './navbar.jsx';
import Bottom from '../Signup/bottom.jsx'
import '../../styles/user.css'
import '../../styles/signup.css'

function Home(){
    const [greeting, setGreeting] = useState('');
    const { username } = useParams();

  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();

    if (hours < 12) {
      setGreeting(`Good Morning`);
    } else if (hours < 18) {
      setGreeting(`Good Afternoon`);
    } else {
      setGreeting(`Good Evening`);
    }
  },[]);
    return(
        <div className='content'>
        <Navbar />
        <div className='Home content-main' style={{color:'black'}}>
            <h1 style={{marginBottom:'20px'}}>{greeting}</h1>
            <h2>Social Service Food Delivery System</h2>
            <p>Welcome to Social Service Food Delivery Site,<br/> Where you can order from our Restaurants.
            <br />Feel free to share some of your own and rate on others!</p>
            <p>Explore Restaurents</p>
            <Link to='restuarants'>
                <button className='link-button'>Restaurants</button>
            </Link>
        </div>
        <Bottom />
        </div>
    );
}
function Profile({setcurview}){
    const { username } = useParams();
    const [profile,setprofile] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user/${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                const data = await response.json();
                setprofile(data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchData();
    }, [profile]);
    return(
        <div className='profileblock' style={{color:'black'}}>
            <img src={profile.url} alt='Image' className='base-ele prof-image'/>
            <h4 className='base-ele'>{profile.username}</h4>
            <button className='base-ele' onClick={()=>setcurview('Setprofile')}>Edit Profile</button>
        </div>
    )
}
function Setprofile({setcurview}){
    const { username } = useParams();
    const [profile,setprofile] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user/${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                const data = await response.json();
                setprofile(data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchData();
    }, [profile]);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // Do something with the selected file, like upload it
      };
    return(
        <div className='profileblock' style={{color:'black'}}>
            <input
                type="file"
                accept="image/*"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <label htmlFor="fileInput" className='base-ele prof-image-button'>
                <img src={profile.url} alt='Image' className='base-ele prof-image' />
            </label>
            <h4 className='base-ele'>{profile.username}</h4>
            <p><span>Email:</span></p><p>{profile.email}</p>
            <p><span>Location:</span></p><p>{profile.location}</p>
            <button className='base-ele' onClick={()=>setcurview('Profile')}>Save</button>
        </div>
    )
}
function User() {
    const [curview, setcurview] = useState('Profile');

    return (
        <div className='content'>
            <Navbar />
            <div className='Profile-block'>
                <div id='Profile'>
                {curview==='Profile'&& <Profile setcurview={setcurview}/>}
                {curview==='Setprofile'&& <Setprofile setcurview={setcurview}/>}
                </div>
                <div id='order-history' style={{marginTop:'10vh'}}>
                    <h1>Order History</h1>
                </div>
            </div>
            <Bottom />
        </div>
    );
}

export {Home,User};
