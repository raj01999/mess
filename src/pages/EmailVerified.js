import React, { useState } from "react";
import { Form, Card, Container, Button, Alert } from "react-bootstrap";
import { useStateValue } from "../context/StateProvider";

const EmailVerified = () => {
  const [state, dispatch] = useStateValue();
  const [message, setMessage] = useState(state.currentUser.emailVerified);

  const handleSubmit = (e) => {
    e.preventDefault();
    state.func.emailVerification(state.currentUser);
    setMessage("Please check your email & verify your account");
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Verify Your Email</h2>
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Control
                  type="email"
                  required
                  disabled
                  defaultValue={state.currentUser?.email}
                />
              </Form.Group>
              <Button className="w-100 mt-3" type="submit" disabled={message}>
                Send Verification Link
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default EmailVerified;
