import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthUserContext } from "../firebase/authUser";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const authUser = useContext(AuthUserContext);
  return (
    <Route
      {...rest}
      render={props =>
        authUser ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
