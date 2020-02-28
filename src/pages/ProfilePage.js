import React, { useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom"

import { AuthUserContext } from "../firebase/authUser";
import { FirebaseContext } from "../firebase/firebase";

export const ProfilePage = () => {
  const Firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);
  
  return (
    <Row className="py-2 bg-secondary" style={{ position: 'fixed', bottom: 0, width: "100%" }}>
      <Col xs={{ span: 6 }}></Col>
      <Col xs={{ span: 6 }} sm={{ span: 4}} md={{ span: 4 }} lg={{ span: 3 }} >
        <Button block variant="danger" size="lg" onClick={() => Firebase.signOut()}>Log Out</Button>
      </Col>
    </Row>
  )
}