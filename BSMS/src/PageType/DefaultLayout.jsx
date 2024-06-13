import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header.jsx'; // Import Header

export default function DefaultLayout() {
    return (
        <div>
            <Header /> {/* Include Header */}
            <Outlet /> {/* Render the child routes */}
        </div>
    );
}
