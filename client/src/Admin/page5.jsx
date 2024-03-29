import { React, useEffect, useState } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { Home, Restaurants, Restaurantsorder,Customer,Customerorder,Ngo,NgoHistory, TimeSetter } from './admin';

function Page5() {
    const navigate = useNavigate();
    const { passkey } = useParams();

    useEffect(() => {
        document.getElementById('root').style.backgroundImage='none';
        document.getElementById('root').style.backgroundColor='white';

        fetch(`http://localhost:5000/validatePasskey?passkey=${passkey}`)
            .then(response => {
                if (response.ok) {
                    console.log('Passkey is valid');
                } else {
                    console.log('Passkey is invalid');
                    navigate('/');
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="restuarants" element={<Restaurants />} />
            <Route path="restuarants/:name" element={<Restaurantsorder />} />
            <Route path="customer" element={<Customer />} />
            <Route path="customer/:username" element={<Customerorder />} />
            <Route path="Ngo" element={<Ngo />} />
            <Route path="Ngo/:username" element={<NgoHistory />} />
            <Route path="settime" element={<TimeSetter />} />
            <Route path='*' element={<h1 style={{color:'Red',fontSize:'60',margin:'auto'}}>Page Not Found</h1>} />
        </Routes>
    );
}

export default Page5;
