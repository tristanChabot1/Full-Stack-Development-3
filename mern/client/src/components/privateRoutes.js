import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils";


const PrivateRoutes = () => {
    return isLoggedIn() ? <Outlet/> : <Navigate to="/admin/login" />
}

export default PrivateRoutes