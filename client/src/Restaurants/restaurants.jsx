import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from './navbar.jsx';
import Bottom from '../Signup/bottom.jsx'
import '../../styles/signup.css'
import '../../styles/restaurents.css'

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
    const navigate=useNavigate();
    useEffect(()=>{
        fetch(`http://localhost:5000/Restaurants/${username}/menu`)
        .then(response=>response.json())
        .then(data=>{
            if(data.menu) setmenu(data.menu);
        })
        .catch(error => {
            console.error('Error fetching menu:', error);
        });
    },[menu,deleteitem]);
    function deleteitem(itemname){
        const data={
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, itemname })
        };
        fetch('http://localhost:5000/Restaurants/menu/delete',data)
    }
    return (
        <div className='content' style={{color:'white',textAlign:'center'}}>
            <Navbar />
            <h1 style={{fontSize:'50px'}}>Menu</h1>
            <ul>
                {Object.keys(menu).map(itemName => (
                    <div key={itemName} className='item'>
                        <img src={menu[itemName].url} alt={itemName} style={{width:'100px'/*,height:'100px'*/}}/>
                        <div className='item-content'>
                        <h2>{itemName}</h2>
                        <h4>{menu[itemName].Description}</h4>
                        <p>Price:{menu[itemName].price}</p>
                        <p>Plate count:{menu[itemName].count}</p>
                        </div>
                        <div className='item-button'>
                        <button onClick={()=>{deleteitem(itemName)}}>Delete Item</button>
                        <button onClick={()=>{navigate(`/Restaurants/${username}/menu/${itemName}/edit`)}}>Edit Item</button>
                        </div>
                    </div>
                ))}
            </ul>
            <Link to={'add'}>
                <button style={{marginBottom:'20px'}}>Add Item</button>
            </Link>
            <Bottom />
        </div>
    );
}

function Addmenu(){
    const [Name,setName]=useState('');
    const [url,seturl] = useState('https://res.cloudinary.com/djwc9jftg/image/upload/v1710950611/samples/breakfast.jpg');
    const [description,setdescription]=useState('');
    const [price,setprice]=useState(0);
    const [count,setcount]=useState(0);
    const {username} = useParams();
    const [ResponseData,setResponseData]=useState('');
    const navigate = useNavigate();

    const send = (e) => {
        e.preventDefault();

        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Name, url, description, count, price })
        };

        fetch(`http://localhost:5000/Restaurants/${username}/menu/add`, data)
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
            <form onSubmit={send} className ='signup'>
            <label>Item Name</label>
            <input
              type="text"
              value={Name}
              style={{color:'black'}}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>Description</label>
            <input
              type="text"
              value={description}
              style={{color:'black'}}
              onChange={(e) => setdescription(e.target.value)}
            />
            <label>Price</label>
            <input
              type="number"
              value={price}
              style={{color:'black'}}
              onChange={(e) => setprice(e.target.value)}
            />
            <label>Plate Count</label>
            <input
              type="number"
              value={count}
              style={{color:'black'}}
              onChange={(e) => setcount(e.target.value)}
            />
            <p className='grid-ele ele-7'>{ResponseData}</p>
            <button type="submit" className='grid-ele ele-7'>Add Item</button>
        </form>
        </div>
        <Bottom />
    </div>
)};

function Edititem() {
    const { username, itemname } = useParams();
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [count, setCount] = useState(0);
    const navigate=useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/Restaurants/${username}/menu/${itemname}`)
                .then(response=>response.json())
                .then(data=>{
                    if (data.item) {
                        const { url, Description, price, count } = data.item;
                        setUrl(url);
                        setDescription(Description);
                        setPrice(price);
                        setCount(count);
                    }
                });
            } catch (error) {
                console.error('Error fetching item data:', error);
            }
        };

        fetchData();
    }, [username, itemname]);

    const updateItem = () => {
        const Name=itemname;
        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Name, description, price, count, url })
        };

        fetch(`http://localhost:5000/Restaurants/${username}/menu/add`, data)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.message === 'Item added to menu successfully') {
                    navigate(`/Restaurants/${username}/menu`);
                }
            })
            .catch(error => {
                console.error('Error updating item:', error);
            });
    };
    
    const handleFileChange = (event) => {
        alert('Please Wait,It takes some time to update image .Please donot refresh');
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
            if(data.url){
            const uploadedUrl = data.url;
            setUrl(uploadedUrl);
            }
            else{
                error('Error in uploading image');
            }
        })
        .catch(error => {
          console.error('Error uploading file:', error);
        });
      };

    return (
        <div className='content'>
            <Navbar />
            <div className='signinblock content-main'>
            <h1 className='Head'>Edit Item: {itemname}</h1>
            <input
                type="file"
                accept="image/*"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <label htmlFor="fileInput" className='base-ele prof-image-button'>
                <img src={url} alt='Image' style={{height:'100px'}} />
            </label>
            <label>Description</label>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <label>Price</label>
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <label>Count</label>
            <input
                type="number"
                value={count}
                onChange={(e) => setCount(e.target.value)}
            />
            <button className='ele-7' onClick={updateItem}>Update Item</button>
            </div>
        <Bottom />
        </div>
    );
}

export {Home,Orders,Menu,Addmenu,Edititem};