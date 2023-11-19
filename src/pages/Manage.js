import React, { useRef, useState, useEffect } from "react";
import { Container, Form, Card, Button, Alert } from "react-bootstrap";
import { useStateValue } from "../context/StateProvider";

function Manage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, seetLoading] = useState(false);
  const memberRef = useRef();
  const amountRef = useRef();
  const [date, setDate] = useState("2023-11-18");
  const [state, dispatch] = useStateValue();
  const [members, setMembers] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const member = memberRef.current.value;
    const amount = amountRef.current.value;
    console.log(member, amount, date);
  };

  useEffect(() => {
    const getMembers = async () => {
      const data = await state.func.getUsersByMessId(state.tempUser?.messId);
      setMembers(data);
    };

    if (state.tempUser && state.tempUser.messId) {
      getMembers();
    }
  }, [state.tempUser?.messId]);

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
                  {members.map((member) => (
                    <option key={member.email} value={member.email}>
                      {member.name}
                    </option>
                  ))}
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
