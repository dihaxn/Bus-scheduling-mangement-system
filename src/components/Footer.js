import React from 'react';
import './Footer.css';

export default function Footer() {
    return (
        <div className="footer-container">
            <div className="footer-content">
                <div className="footer-section">
                    <h3 className="section-title">Bus Routes</h3>
                    <ul className="footer-links">
                        <li><a href="/routes/city-center">City Center Routes</a></li>
                        <li><a href="/routes/suburban">Suburban Routes</a></li>
                        <li><a href="/routes/express">Express Services</a></li>
                        <li><a href="/routes/night">Night Services</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3 className="section-title">Quick Links</h3>
                    <ul className="footer-links">
                        <li><a href="/schedule">View Schedule</a></li>
                        <li><a href="/fares">Fare Information</a></li>
                        <li><a href="/alerts">Service Alerts</a></li>
                        <li><a href="/plan-trip">Plan Your Trip</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3 className="section-title">Company</h3>
                    <ul className="footer-links">
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/careers">Careers</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                        <li><a href="/partners">Partners</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3 className="section-title">Connect With Us</h3>
                    <div className="social-links">
                        <a href="#" className="social-icon" aria-label="Facebook">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="social-icon" aria-label="Twitter">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="social-icon" aria-label="Instagram">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="social-icon" aria-label="LinkedIn">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                    <div className="newsletter">
                        <p>Get schedule updates</p>
                        <div className="subscribe-form">
                            <input type="email" placeholder="Your email" />
                            <button className="subscribe-btn">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-info">
                    <p>© {new Date().getFullYear()} CityTransit Bus Services. All rights reserved.</p>
                    <div className="footer-legal">
                        <a href="/privacy">Privacy Policy</a>
                        <a href="/terms">Terms of Use</a>
                        <a href="/accessibility">Accessibility</a>
                    </div>
                </div>
                <div className="app-badges">
                    <a href="#" className="app-badge">
                        <i className="fab fa-apple"></i>
                        <span>App Store</span>
                    </a>
                    <a href="#" className="app-badge">
                        <i className="fab fa-google-play"></i>
                        <span>Google Play</span>
                    </a>
                </div>
            </div>
        </div>
    );
}