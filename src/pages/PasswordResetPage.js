import React, { useState, useContext } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";

import { FirebaseContext } from "../firebase/firebase";

export const PasswordResetPage = () => {
  const Firebase = useContext(FirebaseContext)
  const [email, setEmail] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    Firebase.resetPassword(email);
  };
  return (
    <Row className="mt-5">
      <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
        <Card>
          <Card.Header>
            <Card.Title className="text-center display-4 m-0">Reset Password</Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={e => onSubmit(e)}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control required type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
              </Form.Group>
              <Button type="submit" size="lg" block>Send Password Reset Email</Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};