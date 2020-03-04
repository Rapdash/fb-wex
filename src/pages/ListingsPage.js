import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Card, ListGroup, Button } from "react-bootstrap";

import { AuthUserContext } from "../firebase/authUser";
import { FirebaseContext } from "../firebase/firebase";
import { CreateListingModal } from "../components/CreateListingModal";

export const ListingsPage = () => {
  const Firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);

  const [myListings, setMyListings] = useState([]);
  const [otherListings, setOtherListings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fn = async () => {
      // get all active listings.
      const allListings = await Firebase.listings()
        .where("active", "==", true)
        .get();
      // split out the "owned" and "unowned" snapshots.
      const myListingsSnapshot = allListings.docs.filter(
        listing => listing.data().owner === authUser.uid
      );
      const otherListingsSnapshot = allListings.docs.filter(
        listing => listing.data().owner !== authUser.uid
      );
      // get the actual data arrays.
      setMyListings(
        myListingsSnapshot.map(listingSnapshot => listingSnapshot.data())
      );
      setOtherListings(
        otherListingsSnapshot.map(listingSnapshot => listingSnapshot.data())
      );
    };
    fn();
  }, [Firebase, authUser.uid]);

  const renderListings = listings => {
    return listings.map((listing, index) => (
      <ListGroup.Item action key={index} className="text-center">
        <strong>
          {listing?.listVolume}AF at ${listing?.listPrice}/AF
        </strong>
        <br />
        {listing.minimumVolume && `Minimum Purchase: ${listing.minimumVolume}AF`}
        {!listing.minimumVolume && `No Partial Purchases`}
        <br />
        {listing?.waterType}
      </ListGroup.Item>
    ));
  };

  return (
    <>
      <Row className="py-2 bg-secondary">
        <Col
          xs={{ span: 6 }}
          sm={{ span: 4, offset: 2 }}
          md={{ span: 4, offset: 2 }}
          lg={{ span: 3, offset: 3 }}
        >
          <Button block variant="primary" onClick={() => setModalOpen(true)}>
            Create Listing
          </Button>
        </Col>
        <Col
          xs={{ span: 6 }}
          sm={{ span: 4 }}
          md={{ span: 4 }}
          lg={{ span: 3 }}
        >
          <Button block variant="dark" onClick={() => {}}>
            My Listing History (NYI)
          </Button>
        </Col>
      </Row>
      <Row className="pt-2">
        <Col md="6" lg={{ span: 5, offset: 1 }}>
          <Card>
            <Card.Header className="text-center">
              <Card.Title as="h2" style={{ marginBottom: 0 }}>
                My Listings
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <ListGroup>{renderListings(myListings)}</ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md="6" lg={{ span: 5 }}>
          <Card>
            <Card.Header className="text-center">
              <Card.Title as="h2" style={{ marginBottom: 0 }}>
                Other Listings
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <ListGroup>{renderListings(otherListings)}</ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <CreateListingModal setModalOpen={setModalOpen} modalOpen={modalOpen} />
    </>
  );
};
