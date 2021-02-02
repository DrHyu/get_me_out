import React from "react";
import Link from "next/link";

import { Navbar, Nav } from "react-bootstrap";
import NavBarLogIn from "../login/NavBarLogIn";

const mainNavigation = () => (
  <Navbar bg="light" variant="light">
    <Link href="/" passHref>
      <Navbar.Brand>Get me Out</Navbar.Brand>
    </Link>
    <Nav className="mr-auto">
      <Link href="/search" passHref>
        <Nav.Link>Search</Nav.Link>
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
