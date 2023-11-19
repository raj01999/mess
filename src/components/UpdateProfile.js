import React, { useRef, useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [state, dispatch] = useStateValue();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    // Don't add this line, will add when support email changes also
    // if (emailRef.current.value !== state.currentUser?.email) {
    //   promises.push(state.func.updateEmail(emailRef.current.value));
    // }

    if (passwordRef.current.value && passwordRef.current.value.length >= 6) {
      promises.push(state.func.updatePassword(passwordRef.current.value));
    } else {
      setError("Password should be at least 6 characters");
      return setLoading(false);
    }

    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        setError(e.code);
      })
      .finally(() => {
        setLoading(false);
      });
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
              <h2 className="text-center mb-4">Update Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    required
                    disabled
                    defaultValue={state.currentUser?.email}
                  />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    placeholder="Enter new password"
                  />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    placeholder="Re enter new password"
                  />
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-3" type="submit">
                  Update
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Link to="/dashboard">Cancel</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
