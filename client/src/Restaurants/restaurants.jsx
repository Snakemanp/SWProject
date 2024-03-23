import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from './navbar.jsx';
import Bottom from '../Signup/bottom.jsx'
import '../../styles/signup.css'

function Home(){
    const [greeting, setGreeting] = useState('');
    useEffect(() => {
    const date = new Date();
    const hours = date.getHours();

    if (hours < 11) {
      setGreeting(`Good Morning`);
    } else if (hours < 16) {
      setGreeting(`Good Afternoon`);
    } else {
      setGreeting(`Good Evening`);
    }
  },[]);
    return(
        <div className='content'>
        <Navbar />
        <div className='Home content-main'>
            <h1 style={{marginBottom:'20px'}}>{greeting}</h1>
            <h2>Social Service Food Delivery System</h2>
            <p>Welcome to Social Service Food Delivery Site,<br/> Where you can order from our Restaurants.
            <br />Feel free to share some of your own and rate on others!</p>
            <p>Explore Restaurents</p>
            <Link to='orders'>
                <button className='link-button'>Orders</button>
            </Link>
        </div>
        <Bottom />
        </div>
    );
}
function Orders(){
    const [orderdata,setorderdata]=useState({});
    useEffect(()=>{
        const date = new Date();

    })
    return(
        <div className='content'>
            <Navbar />
            <Bottom />
        </div>
    )
}

function Menu(){
    const {username} = useParams();
    const [menu,setmenu]= useState({});
    useEffect(()=>{
        fetch(`http://localhost:5000/Restaurants/${username}/menu`)
        .then(response=>response.json())
        .then(data=>{
            if(data) setmenu(data);

        })
        .catch(error => {
            console.error('Error fetching menu:', error);
        });
    },[]);
    return (
        <div className='content' style={{color:'white'}}>
            <Navbar />
            <h2>Menu</h2>
            <ul>
                {Object.keys(menu).map(itemName => (
                    <li key={itemName}>
                        <img src={menu[itemName].url} alt={itemName} style={{width:'100px',height:'100px'}}/>
                        <span>{itemName}</span>
                        <span>{menu[itemName].Description}</span>
                    </li>
                ))}
            </ul>
            <Link to={'add'}>
                <button>Add Item</button>
            </Link>
            <Bottom />
        </div>
    );
}

function Addmenu(){
    const [Name,setName]=useState('');
    const [url,seturl] = useState('https://res.cloudinary.com/djwc9jftg/image/upload/v1710950611/samples/breakfast.jpg');
    const [description,setdescription]=useState('');
    const {username} = useParams();
    const [ResponseData,setResponseData]=useState('');
    const navigate = useNavigate();

    const send = () => {
        console.log('clicked');
        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Name, url, description })
        };
        fetch(`http://localhost:5000/Restaurants/${username}/menu/add`,data)
        .then(response => response.json())
        .then(data => {
            setResponseData(data.message);
            if (data.message === 'Item added to menu successfully') {
                navigate(`/Restaurants/${username}/menu`);
            }
            setResponseData(data.error);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };

    return(
        <div className='content'>
        <Navbar />
        <div className='signinblock content-main'>
            <h1 className='Head ele-1'>ADD ITEM</h1>
            <form className='grid-ele signup' >
                <label className='grid-ele ele-2' htmlFor="Name">Item Name</label>
                <input className='grid-ele ele-3' id='Name' type='text' style={{color:'black'}} value={Name} onChange={(e) => setName(e.target.value)}></input>
                <label className='grid-ele ele-4' htmlFor="Description">Description</label>
                <input className='grid-ele ele-5' id='Description' type='text' style={{color:'black'}} value={description} onChange={(e) => setdescription(e.target.value)}></input>
            </form>
            <p id='message' className='grid-ele ele-6'>{ResponseData}</p>
            <button className='grid-ele ele-7' onClick={send}>Add Item</button>
        </div>
        <Bottom />
        </div>
    )
}
export {Home,Orders,Menu,Addmenu};