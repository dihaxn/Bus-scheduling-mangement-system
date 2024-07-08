import React from "react";
import Navibar from "./Navibar";
import "./Header.css"; // Import the CSS file
import logo from "./logo.gif";

export default function Header() {
  return (
    <div>
      {/* Navigation bar */}
      <div className="pos-f-t">
        <nav className="navbar navbar-dark bg-lightblue">
          {/* Company logo and name */}
          <h1 className="navbar-brand d-flex align-items-center">
            <img
              src={logo}
              alt="Company Logo"
              style={{ height: "40px", marginRight: "10px" }}
            />{" "}
            {/* Adjust the height and margin as needed */}
            RoutesTimePro
          </h1>

          {/* Navigation items */}
          <div className="ml-auto d-flex align-items-center">
            <div
              className="btn-group"
              role="group"
              aria-label="Button group with nested dropdown"
            >
              <button type="button" className="btn btn-secondary">
                Login
              </button>
              <button type="button" className="btn btn-secondary">
                Sign In
              </button>
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
                <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                  <a className="dropdown-item" href="/Profile">
                    Profile
                  </a>
                  <a className="dropdown-item" href="/Signout">
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <Navibar />
    </div>
  );
}
