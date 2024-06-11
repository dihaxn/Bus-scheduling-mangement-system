import React from 'react';
import './Footer.css'; // Import the CSS file for styling

export default function Footer() {
    return (
        <div className="footer">
            <div className="footer-section">
                <a href="#" target="_blank" rel="noopener noreferrer">About Us</a>
                <p>Learn more about our company and values.</p>
            </div>
            <div className="footer-section">
                <a href="#" target="_blank" rel="noopener noreferrer">FAQ</a>
                <p>Find answers to common questions.</p>
            </div>
            <div className="footer-section">
                <a href="#" target="_blank" rel="noopener noreferrer">Rate Us</a>
                <p>Give us your feedback and rate our services.</p>
            </div>
        </div>
    );
}
