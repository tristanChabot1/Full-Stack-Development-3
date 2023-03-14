import React, { useState } from "react";
import { useNavigate } from "react-router";
import ModalReact from './modal';


export default function Create() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    region: "",
    rating: Number,
    fee: Number,
    sales: Number,
    manager: false,
  });
  const navigate = useNavigate();
  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  // This function will handle the submission.
  async function onSubmit(e) {
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newPerson = { ...form };
    await fetch("http://localhost:5000/admin/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
    .catch(error => {
      window.alert(error);
      return;
    });
    setForm({ first_name: "", last_name: "", email: "", region: "", rating: "", fee: "", sales: "", manager: "" });
    navigate("/admin/");
  }
  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Agent</h3>
      <form onSubmit={(e) => {
        e.preventDefault();
      }}>
        {/* First name */}
        <div className="form-group">
          <label htmlFor="first_name">First name</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            value={form.first_name}
            onChange={(e) => updateForm({ first_name: e.target.value })}
          />
        </div>
        {/* Last name */}
        <div className="form-group">
          <label htmlFor="last_name">Last name</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            value={form.last_name}
            onChange={(e) => updateForm({ last_name: e.target.value })}
          />
        </div>
        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
        </div>
        {/* Region */}
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="regionOptions"
              id="positionNorth"
              value="north"
              checked={form.region === "north"}
              onChange={(e) => updateForm({ region: e.target.value })}
            />
            <label htmlFor="positionNorth" className="form-check-label">North</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="regionOptions"
              id="positionSouth"
              value="South"
              checked={form.region === "South"}
              onChange={(e) => updateForm({ region: e.target.value })}
            />
            <label htmlFor="positionSouth" className="form-check-label">South</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="regionOptions"
              id="positionEast"
              value="East"
              checked={form.region === "East"}
              onChange={(e) => updateForm({ region: e.target.value })}
            />
            <label htmlFor="positionEast" className="form-check-label">East</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="regionOptions"
              id="positionWest"
              value="West"
              checked={form.region === "West"}
              onChange={(e) => updateForm({ region: e.target.value })}
            />
            <label htmlFor="positionWest" className="form-check-label">West</label>
          </div>
        </div>
        {/* Rating */}
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            className="form-control"
            id="rating"
            value={form.rating}
            onChange={(e) => updateForm({ rating: parseInt(e.target.value) })}
          />
        </div>
        {/* Fee */}
        <div className="form-group">
          <label htmlFor="fee">Fee</label>
          <input
            type="number"
            className="form-control"
            id="fee"
            value={form.fee}
            onChange={(e) => updateForm({ fee: parseInt(e.target.value) })}
          />
        </div>
        {/* Sales */}
        <div className="form-group">
          <label htmlFor="sales">Sales</label>
          <input
            type="number"
            className="form-control"
            id="sales"
            value={form.sales}
            onChange={(e) => updateForm({ sales: parseInt(e.target.value) })}
          />
        </div>
        {/* Manager */}
        <div className="form-group">
          <label htmlFor="positionSelect">Position</label>
          <select
            className="form-control"
            name="positionOptions"
            id="positionSelect"
            value={form.manager}
            onChange={(e) => { 
              const manager = e.target.value === 'true' ? true : false;
              updateForm({ manager });
            }}>
            <option value={false}>Employee</option>
            <option value={true}>Manager</option>
          </select>
        </div>
        <div className="form-group">
          <ModalReact
            buttonText = "Confirm Create"
            buttonTextColor = "blue"
            title = {`Confirm Create`}
            message = {`Are you sure you want to Create ${form.first_name} ${form.last_name}`}
            confirmText = "Yes! Create it!"
            onConfirm={() => {
              onSubmit()
              }}
            />
        </div>
      </form>
    </div>
  );
}