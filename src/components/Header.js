// Header.jsx
import React from "react";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "./logo.gif"; // Your bus system logo

export default function Header() {
  return (
      <div>
        <div className="pos-f-t">
          <nav className="navbar navbar-custom-gradient">
            {/* Company / App logo and name */}
            <Link to="/" className="navbar-brand d-flex align-items-center">
              <img
                  src={logo}
                  alt="Bus Schedule Logo"
                  style={{ height: "40px", marginRight: "10px" }}
              />
              BusSchedulePro
            </Link>

            {/* Centered Nav links */}
            <Nav variant="tabs" defaultActiveKey="/home" className="mx-auto">
              <Nav.Item>
                <Nav.Link as={Link} to="/home" className="nav-link-custom">
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/map" className="nav-link-custom">
                  Search Buses
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/booking" className="nav-link-custom">
                  My Booking
                </Nav.Link>
              </Nav.Item>
            </Nav>

            {/* Always show Login and Sign Up on the right side */}
            <div className="ml-auto d-flex align-items-center">
              <Link to="/login" className="btn btn-secondary" style={{ marginRight: "5px" }}>
                Login
              </Link>
              <Link to="/signup" className="btn btn-secondary">
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      </div>
  );
}
