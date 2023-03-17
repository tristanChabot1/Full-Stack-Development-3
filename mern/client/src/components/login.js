import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Alert from 'react-bootstrap/Alert';
import {useCookies} from "react-cookie";

const { v4: uuidv4 } = require('uuid');


// These methods will update the state properties.
const updateForm = (setForm) => (event) => {
  const { value, name } = event.target;
  setForm((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

let SESSION_TOKEN = uuidv4()

//Settting COOKIE with the same session token
const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
// const loginCookie = (TOKEN_KEY) => Cookies.set(TOKEN_KEY, 'token_key', { expires });

function Login() {
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  const loginCookie = (TOKEN_KEY) => {
    setCookie("token_key", TOKEN_KEY)
  }  
  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    // Login by looking for email and password in database
    const newLogin = { ...form };
    const res = await fetch("http://localhost:5000/admin/record/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLogin),
    }).catch((error) => {
      window.alert(error);
      return
    });
    if (res.status === 200) {
      setIsConnected(true);

      // getting first_name, last_name, id
      let newSession = {}; // Initialize newSession to an empty object
      await fetch(`http://localhost:5000/admin/login/${form.email}`, {
        method: "GET",
      })
      .then(response => response.json())
      .then(data => {
        newSession = data
        newSession["token"] = SESSION_TOKEN
        loginCookie(SESSION_TOKEN)
      })
      .catch(error => {
        console.log(error)
      });
      
      // inserting in database SESSION
      await fetch("http://localhost:5000/admin/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSession),
      })
      .catch(error => {
        window.alert(error);
        return;
      });
      setForm({ email: "", password: "" });
      navigate("/admin/adminNavigation")
      } else {
      setShow(true)
    }
    
  }

  // useEffect(() => {
  //   if (isConnected) {
  //     const timer = setTimeout(() => {
  //       window.location.reload();
  //     }, 500);

  //     return () => clearTimeout(timer);
  //   }
  // }, [isConnected]);


  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Bad Email or Password</Alert.Heading>
        <p>
          Make sure you entered the right Email or Password!
        </p>
      </Alert>
      <h3>Enter Login Information</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            className="form-control"
            id="email"
            value={form.email}
            onChange={updateForm(setForm)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            value={form.password}
            onChange={updateForm(setForm)}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Log In"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default Login;