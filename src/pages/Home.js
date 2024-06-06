import React from 'react';
import Bussearch from '../components/Bussearch';
import Traveltotag from '../components/Traveltotag';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Home.css';

export default function Home({ isLoggedIn }) {
    return (
        <div className="home-container">
            <div className="head">
                <Header/><br/><br/><br/>
                <Traveltotag/>
                <div className="content">


                    <br/><br/>
                    <div className="search-bar">
                        <br/>
                        <Bussearch/>
                    </div>
                </div>
            </div>
            <div className="footer-wrapper">
                <Footer />
            </div>
        </div>
    );
}
