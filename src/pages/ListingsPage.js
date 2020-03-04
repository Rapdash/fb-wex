import React, { useContext, useEffect, useState } from "react";

import { AuthUserContext } from "../firebase/authUser";
import { FirebaseContext } from "../firebase/firebase";
import { Row, Col, Card, ListGroup } from "react-bootstrap";

export const ListingsPage = () => {
  const Firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);

  const [myListings, setMyListings] = useState([]);
  const [otherListings, setOtherListings] = useState([]);

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
        <strong>{listing?.offerVolume}AF at ${listing?.offerPrice}/AF</strong><br/>
        {listing?.waterType}
      </ListGroup.Item>
    ))
  }

  return (
    <>
      <Row className="pt-2">
        <Col md="6" lg={{ span: 5, offset: 1 }}>
          <Card>
            <Card.Header className="text-center">
              <Card.Title as="h2" style={{ marginBottom: 0 }}>
                My Listings
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <ListGroup>
                {renderListings(myListings)}
              </ListGroup>
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
              <ListGroup>
                {renderListings(otherListings)}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};
