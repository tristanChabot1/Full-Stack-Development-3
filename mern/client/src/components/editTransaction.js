import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import ModalReact from './modal';


export default function Edit() {
  const [form, setForm] = useState({
    transaction: Number,
    name: "",
    records: [],
  });
  const [transactionRecords, setRecords] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/admin/transaction/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const data = await response.json();
      setRecords(data.transactions);
      
      if (!data) {
        window.alert(`Record with id ${id} not found`);
        navigate("/admin/");
        return;
      }

      const agentOptions = data.agents.map(agent => {
        return <option key={agent.name} value={`${agent.first_name} ${agent.last_name}`}>{agent.first_name} {agent.last_name} | ID: {agent._id}</option>
      })
      setOptions(agentOptions);


      setForm(data);
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
    const editedTransaction = {
      transaction: form.transaction,
      name: form.name,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5000/admin/update/transaction/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedTransaction),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/admin/transactionList");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Transaction</h3>
      <form onSubmit={(e) => {
        e.preventDefault();
      }}>
        {/* Transaction */}
        <div className="form-group">
          <label htmlFor="transaction">Transaction</label>
          <input
            type="number"
            min="0"
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
