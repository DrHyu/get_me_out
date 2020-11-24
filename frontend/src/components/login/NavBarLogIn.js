import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Link from "next/link";

import validateInput from "../../validations/login";
import { login, logout } from "../../store/auth/actions";

import {
  Form,
  FormControl,
  InputGroup,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function Login() {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = true;
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
  } else {
    return (
      <Form>
        <Form.Row className="align-items-center">
          <Col>
            <label className="mb-0">Welcome {user.user}</label>
          </Col>
          <Col>
            <Button className="text-nowrap" onClick={() => dispatch(logout())}>
              Log Out
            </Button>
          </Col>
          <Col>
            <Link href="/profile" passHref>
              <a className="btn btn-outline-success">Profile</a>
            </Link>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}

export default Login;
