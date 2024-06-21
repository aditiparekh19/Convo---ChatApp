import React, { useState, useEffect } from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../store/userSlice";
import { gql, useQuery, useLazyQuery } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      username
      email
      createdAt
      imageUrl
      latestMessage {
        uuid
        to
        from
        createdAt
        content
      }
    }
  }
`;

const GET_MESSAGES = gql`
  query GetMessages($from: String!) {
    getMessages(from: $from) {
      uuid
      to
      from
      content
      createdAt
    }
  }
`;

function Home() {
  const dispatch = useDispatch();
  const { loading, data, error } = useQuery(GET_USERS);
  const [selectedUser, setSelectedUser] = useState(null);
  let usersMarkup;

  const [getMessages, { loading: messageLoading, data: messagesData }] =
    useLazyQuery(GET_MESSAGES);

  useEffect(() => {
    if (selectedUser) {
      getMessages({ variables: { from: selectedUser } });
    }
  }, [selectedUser]);

  if (messagesData) console.log(messagesData.getMessages);

  if (!data || loading) {
    usersMarkup = <p>Loading...</p>;
  } else if (data.getUsers.length === 0) {
    usersMarkup = <p>No users have joined yet</p>;
  } else {
    usersMarkup = data.getUsers.map((user) => (
      <div
        className="d-flex p-3"
        key={user.username}
        onClick={() => setSelectedUser(user.username)}
      >
        <Image
          src={user.imageUrl}
          roundedCircle
          style={{
            width: 50,
            height: 50,
            objectFit: "cover",
            marginRight: "4px",
          }}
        />
        <div>
          <p className="text-success">{user.username}</p>
          <p className="font-weight-light">
            {user.latestMessage
              ? user.latestMessage.content
              : "You are now connected!"}
          </p>
        </div>
      </div>
    ));
  }

  return (
    <>
      <Row
        className="bg-white justify-content-around mb-1"
        style={{ textAlign: "center" }}
      >
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
              dispatch(LOGOUT());
            }}
          >
            Logout
          </Button>
        </Col>
      </Row>
      <Row className="bg-white">
        <Col xs={4} className="p-0 bg-secondary">
          {usersMarkup}
        </Col>
        <Col xs={8}>
          {messagesData && messagesData.getMessages.length > 0 ? (
            messagesData.getMessages.map((message) => (
              <p key={message.uuid}>{message.content}</p>
            ))
          ) : (
            <p>You are now connected!</p>
          )}
        </Col>
      </Row>
    </>
  );
}

export default Home;
