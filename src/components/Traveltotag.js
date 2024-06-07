import React, { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import './Traveltotag.css'; // Import CSS file for styles

export default function Traveltotag() {
    const towns = ['Kadawatha', 'Galle', 'Colombo','Kurunegala','Kaduwela','Mathugama'];
    const [currentTownIndex, setCurrentTownIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTownIndex((prevIndex) => (prevIndex + 1) % towns.length);
        }, 2000); // Change town every 2 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [towns.length]);

    return (
        <div>
            <h1 className="travel-to-heading">
                Travel to <Badge className="Town" bg="secondary">{towns[currentTownIndex]}</Badge>
            </h1>
        </div>
    );
}
