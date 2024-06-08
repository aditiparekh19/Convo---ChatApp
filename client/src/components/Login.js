import { useLazyQuery, gql } from "@apollo/client";
import React from "react";
import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const LOGIN_USER = gql`
  query ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      email
      token
      createdAt
    }
  }
`;

function Login() {
  const [errors, setErrors] = useState({});

  const [variables, setVariables] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const [login, { loading }] = useLazyQuery(LOGIN_USER, {
    onError: (err) => {
      console.log(
        err?.graphQLErrors[0]?.extensions?.errors?.extensions?.errors
      );
      setErrors(err?.graphQLErrors[0]?.extensions?.errors?.extensions?.errors);
    },
    onCompleted(data) {
      localStorage.setItem("token", data.login.token);
      navigate("/");
    },
  });

  const submitLoginForm = (e) => {
    e.preventDefault();
    login({ variables });
  };
  return (
    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1 className="text-center">Login</h1>
        <Form onSubmit={submitLoginForm}>
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
          <br />
          <div className="text-center">
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? "Loading.." : "Login"}
            </Button>
            <br />
            <small>
              Don't have an account? <Link to="/register">Register</Link>
            </small>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default Login;
