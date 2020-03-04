import React, { useState, useContext } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { FirebaseContext } from "../firebase/firebase";
import { AuthUserContext } from "../firebase/authUser";

export const CreateListingModal = ({ modalOpen, setModalOpen }) => {
  const Firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);

  const [partialAllowed, setPartialAllowed] = useState(false);
  const [listPrice, setListPrice] = useState("");
  const [listVolume, setListVolume] = useState("");
  const [minimumVolume, setMinimumVolume] = useState("")
  const [waterType, setWaterType] = useState("Current Year Contract Water")
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // eslint-disable-next-line no-mixed-operators
    if (!listPrice || !listVolume || !minimumVolume && partialAllowed) {
      setError('Missing a Required Field.');
      return;
    }

    if (!partialAllowed) {
      setMinimumVolume(undefined);
    }

    const newDocData = {
      active: true,
      listPrice,
      listVolume,
      owner: authUser.uid,
      minimumVolume,
      waterType
    }

    try {
      await Firebase.listings().add(newDocData);
      setModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
      <Modal.Header className="mx-auto">
        <Modal.Title>Create A Listing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={e => onSubmit(e)}>
          <Form.Group>
            <Form.Label>Listing Price Per AF</Form.Label>
            <Form.Control
              placeholder="Listing Price ($/AF)"
              required
              type="number"
              value={listPrice}
              onChange={e => setListPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Total Volume For Sale</Form.Label>
            <Form.Control
              placeholder="Volume For Sale (AF)"
              required
              type="number"
              value={listVolume}
              onChange={e => setListVolume(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {partialAllowed && (
            <Form.Group>
              <Form.Label>Minimum Purchase Volume</Form.Label>
              <Form.Control
                placeholder="Minimum Sale Volume (AF)"
                required
                type="number"
                value={minimumVolume}
                onChange={e => setMinimumVolume(e.target.value)}
              ></Form.Control>
            </Form.Group>
          )}
          <Form.Group>
            <Form.Label>Water Type</Form.Label>
            <Form.Control as="select" onChange={e => setWaterType(e.target.value)}>
              <option value="Current Year Contract Water">Current Year Contract Water</option>
              <option value="Other Water Type">Other Water Type</option>
            </Form.Control>
          </Form.Group>
          <Button block variant="secondary" onClick={() => setPartialAllowed(!partialAllowed)}>
            {partialAllowed ? "Don't Allow" : "Allow"} A Partial Purchase
          </Button>
          <Button
            type="submit"
            block
            className="mt-3"
            onClick={e => onSubmit(e)}
          >
            Create Listing
          </Button>
        </Form>

        {error && <h4 className="text-center text-danger mt-3 mb-0">{error}</h4>}
      </Modal.Body>
    </Modal>
  );
};
