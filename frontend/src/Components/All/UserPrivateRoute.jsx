/* */

import React from "react";

import { useSelector } from "react-redux";

import { Outlet, Navigate } from "react-router-dom";

export default function UserPrivateRoute() {
  /* */

  const { currentUser, token } = useSelector((state) => state.user);

  return currentUser && token ? <Outlet /> : <Navigate to="/login" />;

  // return (currentUser ? <Outlet /> : <Navigate to="/signIn" />)(
  //   currentUser && currentUser.token ? <Outlet /> : <Navigate to="/spinner" />
  // );

  /* */
}
