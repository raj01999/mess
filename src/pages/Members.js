import React, { useRef, useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import {
  Container,
  Form,
  Card,
  Button,
  Alert,
  ListGroup,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";

const Members = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, seetLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const newUserRef = useRef();
  const [state, dispatch] = useStateValue();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const oldUser = await state.func.getUserByEmail(newUserRef.current.value);
      if (!oldUser) {
        setError("User not registered");
      } else if (oldUser.type === "manager") {
        setError("User is an manager");
      } else if (oldUser.messId) {
        setError("User part of a mess");
      } else {
        await state.func.setUser({
          ...oldUser,
          messId: state.tempUser?.messId,
          messName: state.tempUser?.messName,
        });

        setMessage("User added");
      }
    } catch (err) {
      setError(err.code);
    }
  };

  useEffect(() => {
    const getMembers = async () => {
      const data = await state.func.getUsersByMessId(state.tempUser?.messId);
      setMembers(data);
    };

    if (state.tempUser && state.tempUser.messId) {
      getMembers();
    }
  }, [state.tempUser?.messId, message]);

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Members</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <ListGroup>
              {members.map((member, idx) => (
                <ListGroup.Item
                  key={idx}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>
                    <FaIcons.FaUser style={{ marginRight: "10px" }} />
                    {member.name}
                  </span>
                  <Link to={`/reports?user=${member.email}`}>
                    <FaIcons.FaReply />
                  </Link>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <Form onSubmit={handleSubmit}>
                  <Form.Control
                    type="email"
                    ref={newUserRef}
                    required
                    placeholder={
                      state.tempUser?.type === "manager"
                        ? "Enter new email"
                        : state.tempUser?.messId
                        ? "Access Denied"
                        : "Connect with mess manager"
                    }
                    disabled={loading || state.tempUser?.type !== "manager"}
                  />

                  <Button
                    disabled={loading || state.tempUser?.type !== "manager"}
                    className="w-100 mt-3"
                    type="submit"
                  >
                    Add Member
                  </Button>
                </Form>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default Members;
