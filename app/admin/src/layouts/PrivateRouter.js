import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
const PrivateRouter = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      JSON.parse(localStorage.getItem("role")) === null ? (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      ) : JSON.parse(localStorage.getItem("role")) === "admin" &&
        "data" in localStorage ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      )
    }
  />
);
export default PrivateRouter;
