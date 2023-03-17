import React, { useEffect } from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes, useLocation } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Login from "./components/login"
import PrivateRoutes from "./components/privateRoutes";
import MainPage from "./components/mainPage";
import AdminNavigation from "./components/adminNavigation";
import TransactionList from "./components/transactionList";
import Transaction from "./components/createTransaction";
// import { isLoggedIn } from "./utils";
import {useCookies} from "react-cookie";




const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
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
const location = useLocation();
useEffect(() => {
    isLoggedIn()
    }, [location]);

  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>
        <Routes>
        <Route path="/" element={<MainPage />} exact />
        <Route path="/admin/login" element={<Login />} />
          <Route element={<PrivateRoutes/>}>
            <Route path="/admin/adminNavigation" element={<AdminNavigation />} />
            <Route path="/admin/" element={<RecordList />} />
            <Route path="/admin/edit/:id" element={<Edit />} />
            <Route path="/admin/create" element={<Create />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            <Route path="/admin/transactionList" element={<TransactionList />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
