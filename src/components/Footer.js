import React from 'react';
import './Footer.css'; // Import the CSS file for styling

export default function Footer() {
    return (
        <div className="footer">
            <div className="footer-section">
                <h3>About Us</h3>
                <p>Learn more about our company and values.</p>
            </div>
            <div className="footer-section">
                <h3>FAQ</h3>
                <p>Find answers to common questions.</p>
            </div>
            <div className="footer-section">
                <h3>Rate Us</h3>
                <p>Give us your feedback and rate our services.</p>
            </div>
        </div>
    );
}
