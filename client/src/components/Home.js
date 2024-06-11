import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <Row className="bg-white justify-content-around mb-1" style={{textAlign: 'center'}}>
      <Col>
        <Link to="/login">
          <Button variant="link">Login</Button>
        </Link>
      </Col>
      <Col>
        <Link to="/register">
          <Button variant="link">Register</Button>
        </Link>
      </Col>
      <Col>
        <Button
          variant="link"
          onClick={() => {
            navigate("./login");
          }}
        >
          Logout
        </Button>
      </Col>
    </Row>
  );
}

export default Home;
