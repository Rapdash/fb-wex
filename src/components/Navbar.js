import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const CustomNavbar = () => (
  <Navbar bg="primary" variant='dark' expand="lg">
    <LinkContainer exact to="/">
    <Navbar.Brand>Water Exchange</Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <LinkContainer exact to="/">
        <Nav.Link>Listings</Nav.Link>
        </LinkContainer>
        <LinkContainer exact to="/offers">
          <Nav.Link>Offers</Nav.Link>
        </LinkContainer>
        <LinkContainer exact to="/profile">
          <Nav.Link>Profile</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default CustomNavbar;