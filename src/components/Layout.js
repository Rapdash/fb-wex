import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "./Navbar";

export const Layout = ({ children}) => (
  <>
    <Navbar />

    <Container fluid>
      {children}
    </Container>
  </>
);
