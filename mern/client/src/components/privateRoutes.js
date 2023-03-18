import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Outlet, Navigate } from "react-router-dom";


const PrivateRoutes = () => {
  const [cookies] = useCookies(['cookie-name']);
  const [isValidToken, setIsValidToken] = useState();

  const isLoggedIn = async () => {
    const SESSION_TOKEN = cookies.token_key
      return new Promise((resolve, reject) => {
      fetch(`http://localhost:5000/admin/validate_token?token=${SESSION_TOKEN}`, {
        method: "GET",
      })
      .then(response => response.json())
      .then(data => {
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
  });
  
  if (isValidToken === undefined) {
    return null;
  }
  
  return isValidToken ? <Outlet/> : <Navigate to="/admin/login" replace />;
}

export default PrivateRoutes
