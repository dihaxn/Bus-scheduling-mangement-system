import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Bussearch from "../components/Bussearch";
import Traveltotag from "../components/Traveltotag";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "./Home.css";

export default function Home() {
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    navigate("/map", { state: { destination } });
  };

  return (
    <div className="home-container">
      <div className="head">
        <Header />
        <br />
        <br />
        <br />
        <Traveltotag />
        <div className="content">
          <br />
          <br />
          <div className="search-bar">
            <br />
            <Bussearch
              destination={destination}
              setDestination={setDestination}
              onSearch={handleSearchSubmit}
            />
          </div>
        </div>
      </div>
      <div className="footer-wrapper">
        <Footer />
      </div>
    </div>
  );
}
