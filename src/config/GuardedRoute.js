import React from "react";
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.login ? <Component {...props} /> : <Redirect to="/register" />
      }
    />
  );
};

export default GuardedRoute;
