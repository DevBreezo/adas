import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useAuth();

  return isAuthenticated ? (
    <Route render={props => <Component {...props} />} />
  ) : (
    <Redirect to="/" />
  );
};

export default withRouter(PrivateRoute);
