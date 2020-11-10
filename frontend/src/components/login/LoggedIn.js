import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../store/actions/authActions";
import {
  Form,
  FormControl,
  InputGroup,
  Button,
  Row,
  Col,
  Container,
} from "react-bootstrap";

function LoggedIn() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Welcome {user.name}</h2>
        </Col>
        <Col>
          <Button onClick={onClick}>Log Out</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default LoggedIn;
