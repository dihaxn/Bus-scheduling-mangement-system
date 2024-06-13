import React from 'react';
import Bussearch from '../Components/Bussearch.jsx';
import Traveltotag from '../Components/Traveltotag.jsx';
import Footer from '../Components/Footer.jsx';
import Header from '../Components/Header.jsx';
import './Home.css';

export default function Home() {
    return (
        <div className="home-container">
            <div className="head">
                <Header /><br /><br /><br />
                <Traveltotag />
                <div className="content">
                    <br /><br />
                    <div className="search-bar">
                        <br />
                        <Bussearch />
                    </div>
                </div>
            </div>
            <div className="footer-wrapper">
                <Footer />
            </div>
        </div>
    );
}
