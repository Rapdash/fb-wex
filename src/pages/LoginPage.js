import React, { useState, useContext } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import { Card, Row, Col, Form, Button } from "react-bootstrap";

import { FirebaseContext } from "../firebase/firebase";
import { AuthUserContext } from "../firebase/authUser";

export const LoginPage = () => {
  const Firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    Firebase.signIn(email, password)
      .then(() => history.push("/listings"))
      .catch(err => setError(err.message));
  };

  if (authUser) return <Redirect to="/listings" />;

  return (
    <Row className="mt-5">
      <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
        <Card>
          <Card.Header>
            <Card.Title className="text-center display-4 m-0">
              Log In
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={e => onSubmit(e)}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter email"
                  onChange={e => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter email"
                  onChange={e => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" size="lg" block>
                Log In
              </Button>
            </Form>
            <Card.Text className="text-center text-danger mt-4">
              {error}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="text-right">
            <Link to="/password-reset">
              Forgot your password? Click Here To Reset It.
            </Link>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};
