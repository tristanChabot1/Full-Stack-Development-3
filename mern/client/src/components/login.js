import React, { useState } from "react";
import { useNavigate } from "react-router";
import Alert from 'react-bootstrap/Alert';
const login = require("../utils")

// These methods will update the state properties.
const updateForm = (setForm) => (event) => {
  const { value, name } = event.target;
  setForm((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};
export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    // When a post request is sent to the create url, we'll add a new age to the database.
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
      login.login();
      navigate("/admin/")
    } else {
      setShow(true)
    }
    
  }
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