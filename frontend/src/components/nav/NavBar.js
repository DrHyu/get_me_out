import React from "react";
import Link from "next/link";

import NavBarLogIn from "../login/NavBarLogIn";

import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const mainNavigation = (props) => (
  <Navbar bg="light" variant="light">
    <Link href="/" passHref>
      <Navbar.Brand>Get me Out</Navbar.Brand>
    </Link>
    <Nav className="mr-auto">
      <Link href="/search" passHref>
        <Nav.Link>Search</Nav.Link>
      </Link>
      <Link href="/" passHref>
        <Nav.Link>Features</Nav.Link>
      </Link>
      <Link href="/" passHref>
        <Nav.Link>Pricing</Nav.Link>
      </Link>
    </Nav>
    <NavBarLogIn />
    {/* <Form inline>
      <FormControl type="text" placeholder="Username" className="mr-sm-2" />
      <FormControl type="password" placeholder="Password" className="mr-sm-2" />
      <Button variant="outline-success">Log In</Button>
    </Form> */}
  </Navbar>
);

export default mainNavigation;
