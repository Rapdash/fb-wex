import React from "react";
import React, { useContext, useEffect, useState } from "react";

import { AuthUserContext } from "../firebase/authUser";
import { FirebaseContext } from "../firebase/firebase";
import { Row } from "react-bootstrap";

export const ListingsPage = () => {
  const Firebase = useContext(FirebaseContext);
  const authUser = useContext(AuthUserContext);

  const [myListings, setMyListings] = useState([]);
  const [otherListings, setOtherListings] = useState([]);

  useEffect(() => {
    const fn = async () => {
      const allListings = await Firebase.listings.where('active', '==', true).get();
      setMyListings(allListings.filter(listing => listing.data().ownerUid === authUser.uid));
      setOtherListings(allListings.filter(listing => listing.data().ownerUid !== authUser.uid));
    }
    fn();
  }, [Firebase, authUser.uid]);

  return <>
  <Row className="pt-2">
    <Col></Col>
    </Row></>
}