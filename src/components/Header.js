import React from "react";
import Nav from 'react-bootstrap/Nav'; // Import Nav
import "./Header.css"; // Import the CSS file
import logo from "./logo.gif";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

export default function Header({ isAuthenticated, setIsAuthenticated }) { // Destructure props
  const navigate = useNavigate();

  const handleSignOut = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div>
      {/* Navigation bar */}
      <div className="pos-f-t">
        <nav className="navbar navbar-custom-gradient"> {/* Changed to navbar-custom-gradient */}
          {/* Company logo and name */}
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img
              src={logo}
              alt="Company Logo"
              style={{ height: "40px", marginRight: "10px" }}
            />{" "}
            {/* Adjust the height and margin as needed */}
            RoutesTimePro
          </Link>

          {/* Navigation links from Navibar.js */}
          <Nav variant="tabs" defaultActiveKey="/home" className="mx-auto"> {/* Added mx-auto for centering */}
            <Nav.Item>
                <Nav.Link as={Link} to="/home" className="nav-link-custom">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/booking" className="nav-link-custom">Booking</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/map" className="nav-link-custom">Bus Schedules</Nav.Link>
            </Nav.Item>
          </Nav>

          {/* Navigation items */}
          <div className="ml-auto d-flex align-items-center">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="btn btn-secondary" style={{ marginRight: '5px' }}>
                  Login
                </Link>
                <Link to="/signup" className="btn btn-secondary">
                  Sign in
                </Link>
              </>
            ) : (
              <div className="btn-group" role="group">
                <button
                  id="btnGroupDrop1"
                  type="button"
                  className="btn btn-secondary dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Profile
                </button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="btnGroupDrop1"> {/* Added dropdown-menu-right for better alignment */}
                  <Link className="dropdown-item" to="/profile"> {/* Changed to Link and corrected path */}
                    Profile
                  </Link>
                  <a className="dropdown-item" href="#" onClick={handleSignOut}> {/* Changed to # and added onClick */}
                    Sign out
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
      {/* <Navibar /> */} {/* Removed Navibar component */}
    </div>
  );
}
