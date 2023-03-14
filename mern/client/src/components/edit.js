import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import ModalReact from './modal';


export default function Edit() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    region: "",
    rating: Number,
    fee: Number,
    sales: Number,
    manager: false,
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/admin/record/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/admin/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    const editedPerson = {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
      region: form.region,
      rating: form.rating,
      fee: form.fee,
      sales: form.sales,
      manager: form.manager,  
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/admin/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/admin/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Record</h3>
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
              value="North"
              checked={form.level === "North"}
              onChange={(e) => updateForm({ level: e.target.value })}
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
              checked={form.level === "South"}
              onChange={(e) => updateForm({ level: e.target.value })}
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
              checked={form.level === "East"}
              onChange={(e) => updateForm({ level: e.target.value })}
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
              checked={form.level === "West"}
              onChange={(e) => updateForm({ level: e.target.value })}
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
          buttonText = "Confirm Edit"
          buttonTextColor = "blue"
          title = {`Confirm Edit`}
          message = {`Are you sure you want to edit ${form.first_name} ${form.last_name}`}
          confirmText = "Yes! Edit it!"
          onConfirm={() => {
            onSubmit()
            }}
          />
        </div>
      </form>
    </div>
  );
}
