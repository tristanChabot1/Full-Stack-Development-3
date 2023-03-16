import React/*, { useEffect, useState, useRef }*/ from "react";
import { Outlet, Navigate/*, useLocation*/ } from "react-router-dom";
import { isLoggedIn } from "../utils";


const PrivateRoutes =  () => {
    // const location = useLocation();
    
    const result = isLoggedIn().then();
    console.log(result)
    if (result) {
        console.log('returned true')
        return <Outlet/>;
    } else {
        console.log('returned false')
        return <Navigate to="/admin/login" />;
    }  
};

export default PrivateRoutes