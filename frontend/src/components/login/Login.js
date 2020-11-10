import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import validateInput from "../../validations/login";

import { login } from "../../store/actions/authActions";

import {
  Form,
  FormControl,
  InputGroup,
  Button,
  Row,
  Col,
} from "react-bootstrap";

function Login() {
  const [isLoading, setisLoading] = useState(false);
  const [identifier, setidentifier] = useState("");
  const [password, setpassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const isValid = () => {
    const { errors, isValid } = validateInput({ identifier, password });

    if (!isValid) {
      setErrors(errors);
      console.log("Empty fields", errors);
    }
    return isValid;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      /* dispatch action */
      setisLoading(true);
      dispatch(login({ identifier, password })).then(null, (err) => {
        setisLoading(false);
        setErrors(err);
      });
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Row>
        <Col>
          <Form.Control
            placeholder="Username"
            value={identifier}
            onChange={(e) => setidentifier(e.target.value)}
          />
        </Col>
        <Col>
          <Form.Control
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </Col>
        <Col>
          <Button type="submit" disabled={isLoading}>
            Log In
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
}

export default Login;
