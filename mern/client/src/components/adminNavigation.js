import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Card, Toast} from 'react-bootstrap';
export default function AdminNavigation() {
  const [showToast, setShowToast] = useState(true);

  return (
    <div>
      <h1 style={{textAlign: "center"}}>Home</h1>
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
      <Toast
        delay={5000}
        onClose={() => setShowToast(false)}
        autohide
        show={showToast}
        style={{position: "relative", left: "38%", marginTop: "50px", background: "#95999c"}}
      >
        <Toast.Header closeButton={false}>
          <strong><em>Welcome to Rocket Elevators!</em></strong>
        </Toast.Header>
        <Toast.Body>We hope you will find everything you need!</Toast.Body>
      </Toast>
    </div>
  );
}