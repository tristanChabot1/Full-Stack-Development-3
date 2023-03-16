import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModalReact from './modal';

const Record = (props) => (
  <tr>
    <td>{props.record.date}</td>
    <td>{props.record.transaction + "$"}</td>
    <td>{props.record.name}</td>
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


export default function TransactionList() {
  const navigate = useNavigate();
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

  
  // This method will delete a record
  async function deleteRecord(id) {
    console.log('Delete action performing')
    await fetch(`http://localhost:5000/admin/${id}`, {
    method: "DELETE"
    });

    const newRecords = transactionRecords.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return transactionRecords.map((record) => {
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
            <th>Date (mm-dd-yyyy)</th>
            <th>Transaction</th>
            <th>Name</th>
            <th style={{ textIndent: "16%" }}>Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}