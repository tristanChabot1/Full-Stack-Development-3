import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
import logo from "./assets/rocketLogo.png"

const { logout } = require("../utils")

// Here, we display our Navbar
export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/admin/" style={{"width" : 75 + '%', "height" : 100 + '%'}}>
        <img style={{"width" : 25 + '%'}} src={logo}></img>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item btn-sm btn-primary" style={{margin: "5px"}}>
              <NavLink className="nav-link" to="/admin/login">
                Log In
              </NavLink>
            </li>
            <li className="nav-item btn-sm btn-danger" style={{margin: "5px"}}>
              <NavLink className="nav-link" to="/admin/login" onClick={() => {
                logout();
              }}>
                Log Out
              </NavLink>
            </li>
            <li className="nav-item btn-sm btn-secondary" style={{margin: "5px"}}>
              <NavLink className="nav-link" to="/admin/create">
                Create Agent
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
