import React, { useRef, useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [state, dispatch] = useStateValue();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("member");
  const [messName, setMessName] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await state.func.signup(email, passwordRef.current.value);
      if (userType === "manager") {
        const messId = String("mess-" + Date.now() + Math.random());
        setTimeout(async () => {
          await state.func.setMess(
            {
              name: messName,
              users: [
                {
                  email: email,
                  type: userType,
                  messName: messName,
                  messId: messId,
                },
              ],
            },
            messId
          );
        }, 300);

        await state.func.setUser({
          email: email,
          type: userType,
          messName: messName,
          messId: messId,
          meals: {},
          funds: {},
        });
      } else if (userType === "member") {
        await state.func.setUser({
          email: email,
          type: userType,
          messName: null,
          messId: null,
          meals: {},
          funds: {},
        });
      }

      navigate("/");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
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
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>
                <Form.Group id="user-type">
                  <Form.Label>User type</Form.Label>
                  <Form.Select
                    value={userType}
                    onChange={(e) => {
                      setUserType(e.target.value);
                    }}
                  >
                    <option value="member">Member</option>
                    <option value="manager">Manager</option>
                    <option value="admin" disabled>
                      Admin
                    </option>
                  </Form.Select>
                </Form.Group>
                {userType === "manager" && (
                  <Form.Group id="mess-name">
                    <Form.Label>Mess name</Form.Label>
                    <Form.Control
                      type="text"
                      value={messName}
                      onChange={(e) => {
                        setMessName(e.target.value);
                      }}
                      required
                    />
                  </Form.Group>
                )}
                <Button disabled={loading} className="w-100 mt-3" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
