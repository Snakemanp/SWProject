import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from './navbar.jsx';
import Bottom from '../Signup/bottom.jsx'
import '../../styles/user.css'
import '../../styles/signup.css'

function Home(){
    const [greeting, setGreeting] = useState('');

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

function Restaurants(){
    const { username } = useParams();
    const navigate=useNavigate();
    const [restaurants, setRestaurants] = useState([]);
      useEffect(() => {
          fetchRestaurants();
      }, []); // Empty dependency array to ensure useEffect runs only once when the component mounts
  
      const fetchRestaurants = async () => {
          try {
              const response = await fetch(`http://localhost:5000/user/restaurants?user=${username}`);
              if (!response.ok) {
                  throw new Error('Failed to fetch restaurants');
              }
              const data = await response.json();
              setRestaurants(data);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
  
    return (
        <>
        <div className='content' style={{color:'black',textAlign:'center'}}>
        <Navbar />
        <h1 className='Head ele-1'>Restaurants Near You</h1>
        <ul>
            {restaurants.map((restaurant, index) => (
                <div key={index} className='item-user'>
                    <img src={restaurant.url} alt={restaurant.username} style={{width:'100px'/*,height:'100px'*/}}/>
                    <div className='item-content'>
                    <h1>{restaurant.username}</h1>
                    <h3>{restaurant.location}</h3>
                    </div>
                    <div className='item-button'>
                    <button onClick={()=>{navigate(`/user/${username}/${restaurant.username}/menu`)}}>Order Food</button>
                    </div>
                </div>
            ))}
        </ul>
        <Bottom />
        </div>
    </>
    )
};

function Ordermenu({cart,setCart}){
    const { restaurant } = useParams();
    const [menu,setmenu]=useState({});
    const [count,setCount]=useState(0);
    useEffect(()=>{
        fetch(`http://localhost:5000/Restaurants/${restaurant}/menu`)
        .then(response=>response.json())
        .then(data=>{
            if(data.menu) setmenu(data.menu);
        })
        .catch(error => {
            console.error('Error fetching menu:', error);
        });
    },[]);
    function addtocart(itemname, max, price, url) {
        const existingItemIndex = cart.findIndex(item => item.item === itemname && item.restaurant === restaurant);
        let datac = 0;
        if (existingItemIndex !== -1) {
            datac = parseInt(count) + parseInt(cart[existingItemIndex].count);
            if (datac > parseInt(max)) {
                alert('Ordered Plates are more than available plates');
                return;
            }
            // If item already exists in cart, update its count
            setCart(prevCart => {
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].count = datac;
                console.log(updatedCart);
                return updatedCart;
            });
        } else {
            // If item doesn't exist in cart, add it
            const data = { restaurant: restaurant, item: itemname, count: count, price: price, url: url };
            setCart(prevCart => {
                const tempcart = [...prevCart, data];
                console.log(tempcart);
                return tempcart;
            });
        }
    }
    return(
        <div className='content' style={{color:'white',textAlign:'center'}}>
            <Navbar />
            <h1 style={{fontSize:'50px'}}>Menu</h1>
            <ul>
                {Object.keys(menu).map(itemName => (
                    <div key={itemName} className='item-user'>
                        <img className='item-image' src={menu[itemName].url} alt={itemName} style={{width:'100px'/*,height:'100px'*/}}/>
                        <div className='item-content'>
                        <h2>{itemName}</h2>
                        <h4>{menu[itemName].Description}</h4>
                        <div className="price">
                            <span>Price:</span>
                            <span className="original-price">{menu[itemName].price}</span>
                            <span className="discounted-price">{parseFloat(menu[itemName].price)*0.8}</span>
                        </div>
                        <p>Plate count:{menu[itemName].count}</p>
                        </div>
                        <div className='item-button-user'>
                        <input type="number" min={1} max={menu[itemName].count} style={{width:'8vw'}} onChange={(e) => setCount(parseInt(e.target.value))}/>
                        <button onClick={()=>{addtocart(itemName,menu[itemName].count,parseFloat(menu[itemName].price)*0.8,menu[itemName].url)}}>Save Changes</button>
                        </div>
                    </div>
                ))}
            </ul>
            <button onClick={()=>{setCart([])}} style={{margin:'auto'}}>Clear Cart</button>
            <Bottom />
            </div>
    )
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
        <>
        <h2 id='heading' style={{marginLeft:'auto'}}> PROFILE </h2>
        <div className='profileblock' style={{color:'black'}}>
            <img src={profile.url} alt='Image' className='base-ele prof-image'/>
            <h2 className='base-ele'>{profile.username}</h2>
            <p className='profile-p'>EMAIL</p><p className='profile-p'>{profile.email}</p>
            <p className='profile-p'>LOCATION</p><div className='profile-p'>{profile.location}</div>
            <p className='profile-p'>ACCOUNT TYPE</p><p className='profile-p'>{profile.userType}</p>
            
            <button className='base-ele' onClick={()=>setcurview('Setprofile')}>Edit Profile</button>
        </div>
        </>
    )
}

function Setprofile() {
    const { username } = useParams();
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        location: ''
    });

    // Fetch user profile data from the backend
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user/${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                const profileData = await response.json();
                setProfile(profileData);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfile();
    }, []);

    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [newUrl,setNewUrl]=useState('');
    useEffect(() => {
        setNewPassword(profile.password || '');
        setNewEmail(profile.email || '');
        setNewLocation(profile.location || '');
        setNewUrl(profile.url);
    }, [profile]);

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:5000/user/${username}/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: newPassword || profile.password, // Use existing value if not changed
                    email: newEmail || profile.email,
                    location: newLocation || profile.location,
                    url: newUrl||profile.url
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            } 

            // Handle success
        } catch (error) {
            console.error('Error updating profile:', error);
        }
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
            setNewUrl(uploadedUrl);
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
        <div className='profileblock' style={{color:'black'}}>
             <input
                type="file"
                accept="image/*"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <label htmlFor="fileInput" className='base-ele prof-image-button'>
                <img src={newUrl} alt='Image' className='base-ele prof-image' />
            </label>
            <h2 className='base-ele'>{username}</h2>
            <form onSubmit={handleSubmit} className ='signup'>
            <label>PASSWORD</label>
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <label>EMAILID</label>
            <input
                type="email"
                placeholder="New Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
            />
            <label>
            LOCATION
            </label>
            <input
                type="text"
                placeholder="New Location"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
            />
            <button className='base-ele' >Update Profile</button>
            </form>
        </div>
    );
}

function User() {
    const [curview, setcurview] = useState('Profile');

    return (
        <div className='content' style={{alignItems:'stretch'}}>
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

function Cart({ cart, setCart }) {
    const { username } = useParams();
    const calculateTotalCost = () => {
        let total = 0;
        cart.forEach(item => {
            total += parseFloat(item.price) * item.count;
        });
        return total;
    };

    // Function to remove an item from the cart
    const removeFromCart = (index) => {
        setCart(prevCart => {
            const updatedCart = [...prevCart];
            updatedCart.splice(index, 1);
            return updatedCart;
        });
    };

    return (
        <div className='content' style={{ color: 'black', textAlign: 'center' }}>
            <Navbar />
            <h2 style={{ fontSize: '40px' }}>Cart</h2>
            {cart.length === 0 ? (
                <p style={{ fontSize: '35px' }}>Your cart is empty</p>
            ) : (
                <ul>
                    {cart.map((item, index) => (
                        <div key={index} className='item-user'>
                            <img className='item-image' src={item.url} alt={item.item} style={{ width: '100px', height: '100px' }} />
                            <div className='item-content'>
                                <p>{item.item}</p>
                                <p>Price: {item.price}</p>
                                <p>Quantity: {item.count}</p>
                            </div>
                            <div className='item-button-user'>
                                <button onClick={() => removeFromCart(index)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </ul>
            )}
            <div style={{ margin: '10vw' }}>
                <p>Items Cost:Rs{calculateTotalCost()}</p>
                <p>Delivery charges:Rs</p>
                <p>Total Rs: {}</p>
                <button>Place Order</button>
            </div>
            <Bottom />
        </div>
    );
}
export {Home,User,Restaurants,Ordermenu,Cart};
