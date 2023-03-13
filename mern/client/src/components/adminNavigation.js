import React from "react";
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function AdminNavigation() {
  return (
    <div>
      <h1 style={{textAlign: "center"}}>Index</h1>
      <hr />
      <div style={{display: "flex", justifyContent: "center", marginTop: "2rem"}}>
            <Card style={{ width: "25rem", marginRight: "5rem" }}>
              <Card.Body>
                <Card.Title>Agents Page</Card.Title>
                <Card.Text>
                  Navigate to the agents list page
                </Card.Text>
                <NavLink className="nav-link" to="/admin/">
                  <Button variant="primary">Agents Page</Button>
                </NavLink>
              </Card.Body>
            </Card>
            <Card style={{ width: '25rem' }}>
              <Card.Body>
                <Card.Title>Transaction Page</Card.Title>
                <Card.Text>
                  Navigate to the transaction page
                </Card.Text>
                <NavLink className="nav-link" to="/admin/transactionList">
                  <Button variant="primary">Transaction Page</Button>
                </NavLink>
              </Card.Body>
            </Card>
          </div>
    </div>
  );
}