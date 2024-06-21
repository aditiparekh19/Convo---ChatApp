import React from "react";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

function AllRoutes() {
    const user = useSelector(state => state.user.user);
  return (
    <Routes>
      {!user ? (
        <Route exact path="/" Component={Login} />
      ) : (
        <Route exact path="/" Component={Home} />
      )}

      {user ? (
        <Route path="/register" Component={Home} />
      ) : (
        <Route path="/register" Component={Register} />
      )}

      {user ? (
        <Route path="/login" Component={Home} />
      ) : (
        <Route path="/login" Component={Login} />
      )}
    </Routes>
  );
}

export default AllRoutes;
