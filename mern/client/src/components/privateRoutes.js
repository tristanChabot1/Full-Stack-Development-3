import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Outlet, Navigate, useLocation } from "react-router-dom";
// import { isLoggedIn } from "../utils";


const PrivateRoutes = () => {
    const { pathname } = useLocation();
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
    const [isValidToken, setIsValidToken] = useState();
  
    const isLoggedIn = async () => {
      const SESSION_TOKEN = cookies.token_key
      console.log("SESSION_TOKEN", SESSION_TOKEN)
        return new Promise((resolve, reject) => {
        fetch(`http://localhost:5000/admin/validate_token?token=${SESSION_TOKEN}`, {
            method: "GET",
          })
          .then(response => response.json())
          .then(data => {
              console.log(data)
            if (data.status === "ok" && data.data.valid === true && cookies.token_key) {
                resolve(true);
            } else {
                resolve(false);
            }
          })
      });
  };

    useEffect(async () => {
      const token = await isLoggedIn();
      setIsValidToken(token);
    }, [pathname]);
  
    console.log(isValidToken)
    if (isValidToken === undefined) {
      return null;
    }
  
    return isValidToken ? <Outlet/> : <Navigate to="/admin/login" replace />;
  }

export default PrivateRoutes