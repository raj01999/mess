import React, { useState } from "react";
import { Form, Card, Container, Button, Alert } from "react-bootstrap";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { useNavigate } from "react-router-dom";

const EmailVerified = () => {
  const [state, dispatch] = useStateValue();
  const [message, setMessage] = useState(state.currentUser.emailVerified);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    state.func.emailVerification(state.currentUser);
    setMessage("Please check your email & verify your account");
  };

  async function handleLogout() {
    try {
      await state.func.logout();
      dispatch({ type: actionType.SET_USER, user: null });
      localStorage.removeItem("currentUser");
      navigate("/login");
      window.location.reload();
    } catch (err) {
      console.log("err: ", err);
    }
  }

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
        <div className="w-100 text-center mt-2">
          <Button variant="link" onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default EmailVerified;
