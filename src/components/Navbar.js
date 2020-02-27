import React, { useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { AuthUserContext } from "../firebase/authUser";

const CustomNavbar = () => {
  const authUser = useContext(AuthUserContext);
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand className="mb-0" as="h2">
        The Water Agency Inc.
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {authUser && (
          <Nav className="mr-auto">
            <LinkContainer exact to="/listings">
              <Nav.Link>Listings</Nav.Link>
            </LinkContainer>
            <LinkContainer exact to="/offers">
              <Nav.Link>Offers</Nav.Link>
            </LinkContainer>
            <LinkContainer exact to="/profile">
              <Nav.Link>Profile</Nav.Link>
            </LinkContainer>
          </Nav>
        )}
        {!authUser && (
          <Nav className="mr-auto">
            <LinkContainer exact to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
          )}
      </Navbar.Collapse>
    </Navbar>
  );
};
export default CustomNavbar;
