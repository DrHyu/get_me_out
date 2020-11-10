import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import { useSelector } from "react-redux";

import { Container, Row, Col } from "react-bootstrap";
import Login from "./login/Login";
import LoggedIn from "./login/LoggedIn";

const Header = ({ siteTitle }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);

  const userLinks = <LoggedIn />;

  const guestLinks = <Login />;

  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <Container fluid>
          <Row>
            <Col xs={8}>
              <h1 style={{ margin: 0 }}>
                <Link
                  to="/"
                  style={{
                    color: `white`,
                    textDecoration: `none`,
                  }}
                >
                  {siteTitle}
                </Link>
              </h1>
            </Col>
            <Col xs={4}>{isAuthenticated ? userLinks : guestLinks}</Col>
          </Row>
        </Container>
      </div>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
