import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Map from "./pages/Map";

function App() {
    const isLoggedIn = true; // Replace with actual login state

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/home" element={<Home isLoggedIn={isLoggedIn} />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/map" element={<Map />} />
                    <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
