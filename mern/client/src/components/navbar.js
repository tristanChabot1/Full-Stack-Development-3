import React, {useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "./assets/rocketLogo.png"


// Here, we display our Navbar
export default function Navbar() {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const navigate = useNavigate();
  const logout = () => {
    removeCookie("token_key");
    removeCookie("name");
    navigate("/login")
  }

  useEffect(() => {
    if (location.pathname === '/admin/login' || location.pathname === '/') {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [location]);

  // useEffect(() => {
  //   if (!cookies.name) {
  //       window.location.reload();
  //   }
  // }, [cookies.name]);
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/admin/adminNavigation" style={{"width" : 75 + '%', "height" : 100 + '%'}}>
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
            <li className="nav-item" style={{margin: "5px", display: show ? "block" : "none"}}>
              {`Welcome ${cookies.name}`}
            </li>
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
              <NavLink className="nav-link" to="/admin/adminNavigation">
                Home
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
