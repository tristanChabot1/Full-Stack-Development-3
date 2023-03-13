import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Login from "./components/login"
import PrivateRoutes from "./components/privateRoutes";
import MainPage from "./components/mainPage";

const App = () => {
  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>
        <Routes>
        <Route path="/" element={<MainPage />} exact />
        <Route path="/admin/login" element={<Login />} />
          <Route element={<PrivateRoutes/>}>
            <Route path="/admin/" element={<RecordList />} />
            <Route path="/admin/edit/:id" element={<Edit />} />
            <Route path="/admin/create" element={<Create />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
