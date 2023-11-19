import React, { useRef, useState } from "react";
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

const Members = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, seetLoading] = useState(true);
  const [members, setMembers] = useState([
    {
      name: "raj",
      email: "sarafraj01999@gmail.com",
      img: "https://i.guim.co.uk/img/media/bdf23d7b1bbb200cf72ae0c22f051bf926445b20/1_0_5075_3046/master/5075.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=8afc733c3bb5f5509f44d4feaf68a5a3",
    },
    {
      name: "raj",
      email: "sarafraj01999@gmail.com",
      img: "https://i.guim.co.uk/img/media/bdf23d7b1bbb200cf72ae0c22f051bf926445b20/1_0_5075_3046/master/5075.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=8afc733c3bb5f5509f44d4feaf68a5a3",
    },
    {
      name: "raj",
      email: "sarafraj01999@gmail.com",
      img: "https://i.guim.co.uk/img/media/bdf23d7b1bbb200cf72ae0c22f051bf926445b20/1_0_5075_3046/master/5075.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=8afc733c3bb5f5509f44d4feaf68a5a3",
    },
  ]);
  const newUserRef = useRef();

  const handleSubmit = () => {};

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
                    <Image
                      src={member.img}
                      style={{
                        width: "20px",
                        marginRight: "10px",
                        borderRadius: "100%",
                      }}
                    />
                    {member.name}
                  </span>
                  <Link to={"/reports"}>
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
                    placeholder="Enter new email"
                    disabled={loading}
                  />

                  <Button
                    disabled={loading}
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
