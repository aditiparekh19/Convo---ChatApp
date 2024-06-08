import { useMutation, gql } from "@apollo/client";
import React from "react";
import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const REGISTER_USER = gql`
  mutation (
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    registerUser(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      email
      username
    }
  }
`;

function Register() {
  const [errors, setErrors] = useState({});

  const [variables, setVariables] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [register, { loading }] = useMutation(REGISTER_USER, {
    update: (_, __) => navigate("/login"),
    onError: (err) => setErrors(err?.graphQLErrors[0]?.extensions?.errors),
  });

  const submitRegisterForm = (e) => {
    e.preventDefault();
    register({ variables });
    setErrors({});
  };
  return (
    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1 className="text-center">Register</h1>
        <Form onSubmit={submitRegisterForm}>
          <Form.Group>
            <Form.Label className={errors?.username && "text-danger"}>
              {errors?.username ?? "Username"}
            </Form.Label>
            <Form.Control
              type="text"
              value={variables.username}
              className={errors?.username && "is-invalid"}
              onChange={(e) =>
                setVariables({ ...variables, username: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={errors?.email && "text-danger"}>
              {errors?.email ?? "Eamil"}
            </Form.Label>
            <Form.Control
              type="email"
              value={variables.email}
              className={errors?.email && "is-invalid"}
              onChange={(e) =>
                setVariables({ ...variables, email: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={errors?.password && "text-danger"}>
              {errors?.password ?? "Password"}
            </Form.Label>
            <Form.Control
              type="password"
              value={variables.password}
              className={errors?.password && "is-invalid"}
              onChange={(e) =>
                setVariables({ ...variables, password: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={errors?.confirmPassword && "text-danger"}>
              {errors?.confirmPassword ?? "Confirm password"}
            </Form.Label>
            <Form.Control
              type="password"
              value={variables.confirmPassword}
              className={errors?.confirmPassword && "is-invalid"}
              onChange={(e) =>
                setVariables({
                  ...variables,
                  confirmPassword: e.target.value,
                })
              }
            />
          </Form.Group>
          <br />
          <div className="text-center">
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? "Loading.." : "Register"}
            </Button>
            <br />
            <small>
              Already registered? <Link to="/login">Login</Link>
            </small>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default Register;
