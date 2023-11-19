import React, { useRef, useState } from "react";
import { Container, Form, Card, Button, Alert } from "react-bootstrap";

function Manage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, seetLoading] = useState(false);
  const memberRef = useRef();
  const amountRef = useRef();
  const [date, setDate] = useState("2023-11-18");

  const handleSubmit = (event) => {
    event.preventDefault();
    const member = memberRef.current.value;
    const amount = amountRef.current.value;
    console.log(member, amount, date);
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Add Fund</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="fund-member">
                <Form.Label>Member</Form.Label>
                <Form.Select ref={memberRef}>
                  <option value="0">Select an member</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Form.Group>
              <Form.Group id="fund-amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="number" ref={amountRef} required />
              </Form.Group>
              <Form.Group id="fund-date">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                  required
                />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-3" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default Manage;
