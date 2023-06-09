import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ModalReact from './modal';

const Record = (props) => (
  <tr>
    <td>{props.record.first_name}</td>
    <td>{props.record.last_name}</td>
    <td>{props.record.email}</td>
    <td>{props.record.region}</td>
    <td>{props.record.rating}</td>
    <td>{props.record.fee + '$'}</td>
    <td>{props.record.sales + '$'}</td>
    <td>{props.record.manager ? 'manager' : 'employee'}</td>
    <td>
    <Link className="btn btn-link" to={`/admin/edit/${props.record._id}`}>Edit</Link> |
    <ModalReact
        buttonText = "Delete"
        title = {`Confirm Deletion`}
        message = {`Are you sure you want to delete ${props.record.first_name} ${props.record.last_name}`}
        confirmText = "Yes! Delete it!"
        onConfirm = {() => props.deleteRecord(props.record._id)}
      />
    </td>
  </tr>
);


export default function RecordList() {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/admin/record/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return; 
  }, [records.length]);

  
  // This method will delete a record
  async function deleteRecord(id) {
    console.log('Delete action performing')
    await fetch(`http://localhost:5000/admin/${id}`, {
    method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }
  
  // This following section will display the table with the records of individuals.
  return (
    <div>
      <ul style={{ display: "flex", padding: "0px", listStyleType: "none" }}>
        <li>
          <h3>Agent List</h3>
        </li>
        <li style={{ position: "relative", left: "80%" }}>
          <NavLink className="nav-link" to="/admin/create">
            Create agent
          </NavLink>
        </li>
      </ul>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Region</th>
            <th>Rating</th>
            <th>Fee</th>
            <th>Sales</th>
            <th>Position</th>
            <th style={{ textIndent: "16%" }}>Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}