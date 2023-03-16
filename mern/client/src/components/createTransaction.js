import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ModalReact from './modal';


export default function CreateTransaction() {

  const [agentRecords, setAgentRecords] = useState([]);
  const [options, setOptions] = useState([]);

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
      setAgentRecords(data.agents);

      const agentOptions = data.agents.map(agent => {
        return <option key={agent.name} value={agent.name}>{agent.first_name} {agent.last_name}</option>
      })
      setOptions(agentOptions);
    
    }

    getRecords();

    return; 
  }, [agentRecords.length]);


  const [form, setForm] = useState({
    transaction: Number,
    name: "",
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
    let newPerson = { ...form };
    newPerson["date"] = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    await fetch("http://localhost:5000/admin/transaction", {
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
    setForm({ transaction: "", name: "" });
    navigate("/admin/transactionList");
  }
  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Transaction</h3>
      <form onSubmit={(e) => {
        e.preventDefault();
      }}>
        {/* Transaction */}
        <div className="form-group">
          <label htmlFor="transaction">Transaction</label>
          <input
            type="number"
            className="form-control"
            id="transaction"
            value={form.transaction}
            onChange={(e) => updateForm({ transaction: e.target.value })}
          />
        </div>
        {/* Name */}
        <div className="form-group">
        <label htmlFor="name">Name</label>
        <select 
          className="form-control" 
          id="name" 
          value={form.name} 
          onChange={(e) => updateForm({ name: e.target.value })}
        >
          {options}
        </select>
        </div>
        <div className="form-group">
          <ModalReact
            buttonText = "Confirm Transaction"
            buttonTextColor = "blue"
            title = {`Confirm Transaction`}
            message = {`Are you sure the transaction INFO are correct? Amount: ${form.transaction} Name: ${form.name}`}
            confirmText = "Confirm"
            onConfirm={() => {
              onSubmit()
              }}
            />
        </div>
      </form>
    </div>
  );
}