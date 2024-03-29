import React, { useEffect, useState, useRef } from 'react';
import { Link , useNavigate, useParams } from 'react-router-dom';
import Navbar from './navbar.jsx';
import Bottom from '../Signup/bottom.jsx'
import '../../styles/user.css'
import '../../styles/signup.css'

function Home({user}){
    const [greeting, setGreeting] = useState('');
    const {id}=useParams();

  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();
    console.log(user._id);

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
        <Navbar id={id}/>
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

function Restaurants({user}){
    const username = user.username;
    const {id}=useParams();
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
        <Navbar id={id}/>
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
                    <button onClick={()=>{navigate(`/user/${id}/${restaurant.username}/menu`)}}>Order Food</button>
                    </div>
                </div>
            ))}
        </ul>
        <Bottom />
        </div>
    </>
    )
};

function Ordermenu({ cart, setCart, user }) {
    const { restaurant } = useParams();
    const [menu, setMenu] = useState({});
    const { id } = useParams();
    const [itemList, setItemList] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/Restaurants/${restaurant}/menu`)
            .then(response => response.json())
            .then(data => {
                if (data.menu) {
                    setMenu(data.menu);
                    const initialItemList = {};
                    Object.keys(data.menu).forEach(itemName => {
                        initialItemList[itemName] = 0;
                    });
                    setItemList(initialItemList);
                }
            })
            .catch(error => {
                console.error('Error fetching menu:', error);
            });
    }, []);

    function addtocart(itemname, max, price, url, count) {
        if(count===0)  return;
        const existingItemIndex = cart.findIndex(item => item.item === itemname && item.restaurant === restaurant);
        let datac = parseInt(count);
        if (existingItemIndex !== -1) {
            if (datac > parseInt(max)) {
                alert('Ordered Plates are more than available plates');
                return;
            }
            setCart(prevCart => {
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].count = datac;
                console.log(updatedCart);
                return updatedCart;
            });
        } else {
            const data = { restaurant: restaurant, item: itemname, count: count, price: price, url: url };
            setCart(prevCart => {
                const tempcart = [...prevCart, data];
                console.log(tempcart);
                return tempcart;
            });
        }
    }

    const handleInputChange = (itemName, value) => {
        if (isNaN(value)) return;
        setItemList(prevItemList => ({
            ...prevItemList,
            [itemName]: value
        }));
    };

    return (
        <div className='content' style={{ color: 'white', textAlign: 'center' }}>
            <Navbar id={id} />
            <h1 style={{ fontSize: '50px' }}>Menu</h1>
            <ul>
                {Object.keys(menu).map(itemName => (
                    <div key={itemName} className='item-user'>
                        <img className='item-image' src={menu[itemName].url} alt={itemName} style={{ width: '100px' }} />
                        <div className='item-content'>
                            <h2>{itemName}</h2>
                            <h4>{menu[itemName].Description}</h4>
                            <div className="price">
                                <span>Price:</span>
                                <span className="original-price">{menu[itemName].price}</span>
                                <span className="discounted-price">{parseFloat(menu[itemName].price) * 0.8}</span>
                            </div>
                            <p>Plate count: {menu[itemName].count}</p>
                        </div>
                        <div className='item-button-user'>
                            <input
                                type="number"
                                min={0}
                                max={menu[itemName].count || ''}
                                style={{ width: '8vw' }}
                                value={itemList[itemName]}
                                onChange={(e) => handleInputChange(itemName, parseInt(e.target.value))}
                            />
                            <button onClick={() => { addtocart(itemName, menu[itemName].count, parseFloat(menu[itemName].price) * 0.8, menu[itemName].url, itemList[itemName]) }}>Save Changes</button>
                        </div>
                    </div>
                ))}
            </ul>
            <button onClick={() => { setCart([]) }} style={{ margin: 'auto' }}>Clear Cart</button>
            <Bottom />
        </div>
    );
}


function Profile({setcurview,user}){
    const username = user.username;
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

function Setprofile({user}) {
    const username = user.username;
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

function OrderHistory({ username }) {
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
    }, [username]);

    return (
        <div>
            <h2>Order History</h2>
            {Object.values(orders).flat().map((order, index) => (
                <li key={index}>
                <div>Item: {order.item}</div>
                <div>Restaurant: {order.restaurant}</div>
                <div>Cost: {order.cost}</div>
                <div>Count: {order.count}</div>
                <div>Date: {order.date}</div>
                <div>Donated: {order.donated}</div>
                </li>
            ))}
        </div>
    );
}

function User({user}) {
    const [curview, setcurview] = useState('Profile');
    const {id}=useParams();
    const username=user.username;

    return (
        <div className='content' style={{alignItems:'stretch'}}>
            <Navbar id={id}/>
            <div className='Profile-block'>
                <div id='Profile'>
                {curview==='Profile'&& <Profile setcurview={setcurview} user={user}/>}
                {curview==='Setprofile'&& <Setprofile setcurview={setcurview} user={user}/>}
                </div>
                <div id='order-history' style={{marginTop:'10vh'}}>
                    <OrderHistory username={username}/>
                </div>
            </div>
            <Bottom />
        </div>
    );
}

function Cart({ cart, setCart,user }) {
    const navigate=useNavigate();
    const username = user.username;
    const {id}=useParams();
    const [cost,setcost]=useState(0);
    const [delcost,setdelcost]=useState(0);
    const calculateTotalCost = () => {
        let total = 0;
        cart.forEach(item => {
            total += parseFloat(item.price) * item.count;
        });
        setcost(total);
    };

    const removeFromCart = (index) => {
        setCart(prevCart => {
            const updatedCart = [...prevCart];
            updatedCart.splice(index, 1);
            return updatedCart;
        });
    };

    async function calculateDeliveryCharges() {
        let delivery = {};
        let del=0;
        for (const item of cart) {
            const res = await fetch(`http://localhost:5000/dist?user1=${username}&user2=${item.restaurant}`);
            const data = await res.json();
            const distance = parseInt(data.distance);
            if (distance / 1000 < 2) {
                delivery[item.restaurant]={cost: 0};
            } else {
                delivery[item.restaurant]={cost: ((distance / 1000) * 5)};
            }
        }
        for (const key in delivery) {
            del += delivery[key].cost;
        }
        setdelcost(del);
    }

    useEffect(() => {
        calculateTotalCost();
        calculateDeliveryCharges();
    }, [cart]);

    let totalAmount = cost + delcost;

    function payment(to,delc,cost){
        if(cost<=0) return
        fetch(`http://localhost:5000/user/payment/Online?id=${id}`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({cart:cart,delivery:delc,to:to})
        }).then(res=>{
            if(res.ok) return res.json()
        return res.json().then(json=>Promise.reject(json))})
            .then(({url})=>{
        window.location.href=url;
        })
        .catch(e=>{
            console.error(e.error);
        })
    }
    return (
        <div className='content' style={{ color: 'black', textAlign: 'center' }}>
            <Navbar id={id}/>
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
                <p>Items Cost:Rs{cost}</p>
                <p>Delivery charges:Rs{delcost}</p>
                <p>Total Rs: {totalAmount}</p>
                <button onClick={() => { payment(username, delcost, cost) }}>Place Order</button>
                <button onClick={() => { payment('NGO', 0, cost) }}>Donate to NGO</button>
                <button onClick={() => { navigate(`/user/${id}/order/success/COD/${username}`) }}>Cash on Delivery</button>
                <button onClick={() => { payment(username, 0, cost) }}>Self Pickup</button>
            </div>
            <Bottom />
        </div>
    );
}

function Success({cart,user,setCart}){
    const {to,mode}=useParams();
    const {id}=useParams();
    const username=user.username;
    let i=0;
    async function placeorder(toParam){
        const data = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(cart)
        }
        let url = `http://localhost:5000/post/order/${mode}?user=${username}`;
        if (toParam) {
            url += `&to=${toParam}`;
        }
        await fetch(url,data)
        .then(setCart([]));
        setCart([]);
        console.log('paid')
    }
    //placeorder(to);
    //console.log(to);
    const initialized = useRef(false)
    useEffect(()=>{
        if(!initialized.current){
            initialized.current = true;
            placeorder(to);
            console.log(to);
        }
        setCart([]);
    },[])
    return(
        <div className='content'>
            <Navbar id={id}/>
            {to===username && <h1 style={{margin:'auto',color:'black',textAlign:'center'}}>Order is Recieved Successfully<br />Our delivery partner will contact you soon</h1>}
            {to==='NGO' && <h1 style={{margin:'auto',color:'black'}}>Order to be Donated</h1>}
            {to==='Self' && <h1 style={{margin:'auto',color:'black'}}>Order is Placed in Restaurant</h1>}
            <Bottom />
        </div>
    )
}

function Failure(){
    const {id}=useParams();
    return(
        <div className='content'>
            <Navbar id={id}/>
            <h1 style={{margin:'auto',color:'black',textAlign:'center'}}>Failure in payment</h1>
            <Bottom />
        </div>
    )
}
export {Home,User,Restaurants,Ordermenu,Cart,Success,Failure};
