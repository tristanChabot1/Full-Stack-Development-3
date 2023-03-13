import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


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
      <button className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
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
      <h3>Agent List</h3>
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
