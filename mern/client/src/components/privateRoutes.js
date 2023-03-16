import React/*, { useEffect, useState, useRef }*/ from "react";
import { Outlet, Navigate/*, useLocation*/ } from "react-router-dom";
import { isLoggedIn } from "../utils";

function navigate(test) {
    if (test) {
        console.log('returned true');
        return <Outlet/>;
    } else {
        console.log('returned false');
        return <Navigate to="/admin/login" />;
    }
}

// const PrivateRoutes =  () => {
//     // const location = useLocation();
//     let result_test = true;
//     isLoggedIn().then(result => {
//         if (result) {
//             result_test = result;
//             console.log('result_test', result_test);
//         } else {
//             result_test = result;
//             console.log('result_test', result_test);
//         }
//     });
//     navigate(result_test)
//     return <Outlet/>;
    // setTimeout(() => {
    //     navigate(result_test);
    // }, 2000);
// };


// const PrivateRoutes =  () => {
//     // const location = useLocation();
    
//     isLoggedIn().then(result => {
//         console.log(result)
//         if (!result) {
//             console.log('returned false')
//             return <Navigate to="/admin/login" />;
//         }
//         });
//         console.log('returned true')
//         return <Outlet/>;

// };

const PrivateRoutes = () => {
    return isLoggedIn() ? <Outlet/> : <Navigate to="/admin/login" />
}

export default PrivateRoutes