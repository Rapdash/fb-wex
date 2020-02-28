import React from "react";
import { Redirect } from "react-router-dom";

export const checkAuth = (authUser) => {
  if (!authUser) return <Redirect to="/login"/>;
  return null;
}