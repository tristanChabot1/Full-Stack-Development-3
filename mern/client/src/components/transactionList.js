import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Record = (props) => (
  <tr>
    <td>{props.record.date}</td>
    <td>{props.record.amount + "$"}</td>
    <td>{props.record.name}</td>
  </tr>
);


export default function TransactionList() {
  const [transactionRecords, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/admin/transaction-data`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const data = await response.json();
      setRecords(data.transactions);
    }

    getRecords();

    return; 
  }, [transactionRecords.length]);

  
  // This method will map out the records on the table
  function recordList() {
    return transactionRecords.map((record) => {
      return (
        <Record
          record={record}
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
          <h3>Transaction List</h3>
        </li>
        <li style={{ position: "relative", left: "75%" }}>
          <NavLink className="nav-link" to="/admin/transaction">
            Create Transaction
          </NavLink>
        </li>
      </ul>
      
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Date (mm-dd-yyyy)</th>
            <th>Amount</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}