import React, { useState } from "react";

import { Form, Button, Col } from "react-bootstrap";
import validateInput from "../../validations/login";
import LoggedInDropDown from "./LoggedInDropDown";

function Login() {
  const isAuthenticated = true;
  const [isLoading, setisLoading] = useState(false);
  const [identifier, setidentifier] = useState("");
  const [password, setpassword] = useState("");

  const isValid = () => {
    const { errors, isValidated } = validateInput({ identifier, password });

    if (!isValidated) {
      // setErrors(errors);
      console.log("Empty fields", errors);
    }
    return isValidated;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      /* dispatch action */
      setisLoading(true);
      dispatch(login({ identifier, password })).then(
        () => setisLoading(false),
        (err) => {
          setisLoading(false);
          // setErrors(err);
          console.log(err);
        }
      );
    }
  };

  if (!isAuthenticated) {
    return (
      <Form onSubmit={onSubmit}>
        <Form.Row>
          <Col>
            <Form.Control
              placeholder="Username"
              value={identifier}
              type="text"
              onChange={(e) => setidentifier(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Password"
              value={password}
              type="password"
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
  return <LoggedInDropDown />;
}

export default Login;
