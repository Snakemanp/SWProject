import React, { useEffect, useRef } from 'react';

const MapComponent = ({setLocation,location}) => {
    const mapRef = useRef(null);
    const markerRef = useRef(null);

    useEffect(() => {
        // Load Leaflet and Leaflet-providers dynamically
        const leafletScript = document.createElement('script');
        leafletScript.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
        leafletScript.async = true;

        const leafletCSS = document.createElement('link');
        leafletCSS.rel = 'stylesheet';
        leafletCSS.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';

        document.body.appendChild(leafletScript);
        document.head.appendChild(leafletCSS);

        leafletScript.onload = () => {
            // Define L from Leaflet
            const L = window.L;

            const map = L.map('map').setView([22.319450, 87.309848], 15);
            mapRef.current = map;
            if(location.lat!=null) markerRef.current.setLatLng([location.lat, location.lng]);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Add click event listener to the map
            map.on('click', function(e) {
                const { lat, lng } = e.latlng;
                //console.log(`Latitude: ${lat}, Longitude: ${lng}`);
                setLocation({lat,lng});

                // Update marker position or create new marker
                if (markerRef.current) {
                    markerRef.current.setLatLng([lat, lng]);
                } else {
                    const marker = L.marker([lat, lng]).addTo(mapRef.current);
                    markerRef.current = marker;
                }

                // Display the coordinates on the page
                const coordinatesDisplay = document.getElementById('coordinates');
                coordinatesDisplay.textContent = `Latitude: ${lat}, Longitude: ${lng}`;
            });
        };
    }, []);

    return (
        <div>
            <div id="map" style={{ width: '100%', height: '25vh' }}></div>
        </div>
    );
};

export default MapComponent;
