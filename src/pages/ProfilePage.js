import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Button, Card, Form, Modal } from "react-bootstrap";

import { AuthUserContext } from "../firebase/authUser";
import { FirebaseContext } from "../firebase/firebase";

export const ProfilePage = () => {
  const Firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);

  const [error, setError] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  const [fullName, setFullName] = useState("");
  const [wid, setWid] = useState("");
  const [wName, setWName] = useState("");
  const [phone, setPhone] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fn = async () => {
      try {
        const doc = await Firebase.user(authUser.uid).get();
        if (!doc.exists) throw Error();

        setFullName(doc.data()?.fullName);
        setWid(doc.data()?.wid);
        setWName(doc.data()?.wName);
        setPhone(doc.data()?.phone);
      } catch {
        setError(
          "Error loading Profile. Try refreshing the page. If this persists, contact the administrator."
        );
      }
    };
    fn();
  }, [Firebase, authUser.uid]);

  const onSubmit = e => {
    e.preventDefault();
    const fn = async () => {
      try {
        await Firebase.user(authUser.uid).set({ fullName, wid, wName, phone });
      } catch {
        setError(
          "Error Updating Profile. Try again. If this error persists, contact the administrator."
        );
      }
    };
    fn();
  };

  const onModalSubmit = e => {
    e.preventDefault();
  };

  if (error) {
    return <h3 className="text-center mt-5">{error}</h3>
  }

  return (
    <>
      <Row className="pt-5">
        <Col md={{ span: 6, offset: 3 }} lg={{ span: 4, offset: 4 }}>
          <Card>
            <Card.Header>
              <Card.Title className="text-center display-4 m-0">
                Profile
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={e => onSubmit(e)}>
                <Form.Group>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Full Name"
                    onChange={e => setFullName(e.target.value)}
                    value={fullName}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Westlands Entity Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Westlands Entity Name"
                    onChange={e => setWName(e.target.value)}
                    value={wName}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Westlands Entity #</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Westlands Entity ID #"
                    onChange={e => setWid(e.target.value)}
                    value={wid}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Primary Phone #</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Westlands Entity ID #"
                    onChange={e => setPhone(e.target.value)}
                    value={phone}
                  />
                </Form.Group>
                <Button type="submit" size="lg" block>
                  Change Profile Data
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row
        className="py-2 bg-secondary"
        style={{ position: "fixed", bottom: 0, width: "100%" }}
      >
        <Col
          xs={{ span: 6 }}
          sm={{ span: 4, offset: 2 }}
          md={{ span: 4, offset: 2 }}
          lg={{ span: 3, offset: 3 }}
        >
          <Button block variant="primary" onClick={() => setModalOpen(true)}>
            Change Password
          </Button>
        </Col>
        <Col
          xs={{ span: 6 }}
          sm={{ span: 4 }}
          md={{ span: 4 }}
          lg={{ span: 3 }}
        >
          <Button block variant="danger" onClick={() => Firebase.signOut()}>
            Log Out
          </Button>
        </Col>
      </Row>
      <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Header>
          <Modal.Title className="mx-auto">Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={e => onModalSubmit(e)}>
            <Form.Group>
              <Form.Control
                required
                type="password"
                placeholder="New Password"
                onChange={e => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                required
                type="password"
                placeholder="Confirm New Password"
                onChange={e => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </Form.Group>

            <Button
              block
              variant="primary"
              disabled={confirmPassword === newPassword}
              type="submit"
            >
              Confirm Password Change
            </Button>
            {confirmPassword !== newPassword && (
              <Card.Text className="text-danger text-center mt-3 mb-0">Password & Password Confirmation Must Match</Card.Text>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
