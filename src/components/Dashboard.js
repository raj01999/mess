import React, { useState } from "react";
import { Container, Form, Card, Button, Alert } from "react-bootstrap";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [state, dispatch] = useStateValue();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await state.func.logout();
      dispatch({ type: actionType.SET_USER, user: null });
      localStorage.removeItem("currentUser");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form.Group>
                <Form.Label>Your Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  disabled
                  defaultValue={state.currentUser?.email}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Your Mess</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={
                    state.tempUser?.messName
                      ? state.tempUser?.messName
                      : "Please ask your manager to add you"
                  }
                  disabled
                />
              </Form.Group>

              <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                Update Profile
              </Link>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
