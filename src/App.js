import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Map from "./pages/Map";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header"; // Import Header
import Profile from "./pages/Profile"; // Import Profile
import About from "./pages/About";   // Import About
import FAQ from "./pages/FAQ";     // Import FAQ

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate login for demonstration; replace with actual login logic
  useEffect(() => {
    // This simulates a user logging in, e.g., after fetching a token
    // In a real app, you'd set this based on actual authentication
    const mockAuthCheck = setTimeout(() => {
      setIsAuthenticated(true);
    }, 1000); // Simulate a delay

    return () => clearTimeout(mockAuthCheck);
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Render Header and pass props */}
        <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/home" element={<Home isLoggedIn={isAuthenticated} />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/map" element={<Map />} />
          <Route path="/" element={<Home isLoggedIn={isAuthenticated} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} /> {/* Add Profile route */}
          <Route path="/about" element={<About />} />   {/* Add About route */}
          <Route path="/faq" element={<FAQ />} />     {/* Add FAQ route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
