import React, { useState, useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { isLoggedIn } from "../utils";


const PrivateRoutes = () => {
    const { pathname } = useLocation();
  
    const [isValidToken, setIsValidToken] = useState();
  
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