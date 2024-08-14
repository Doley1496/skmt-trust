/* */

import React, { useState, useEffect } from "react";

import Spinner from "./Spinner.jsx";

import { Outlet } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { signOutUserSuccess } from "../../Redux/Actions/authActions.jsx";

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function AdminPrivateRoute() {
  /* */

  const dispatch = useDispatch();

  const [ok, setOk] = useState(false);

  const { currentUser, token } = useSelector((state) => state.user);

  const adminCheck = async () => {
    /* */

    const res = await fetch(`${VITE_SERVER_URL}api/user/admin-auth`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (data.success === false) {
      /* */

      if (data.statusCode === 401) {
        /* */

        setOk(false);

        dispatch(signOutUserSuccess());

        localStorage.clear();

        alert(
          "Your cookie is mismatched or expired. You are signing out of our account!"
        );

        toast.success("Successfully Logged Out");

        return;

        /* */
      } else {
        /* */

        toast.error(data.message);

        return;

        /* */
      }

      /* */
    }

    setOk(true);

    /* */
  };

  /* ******************************************************************* */
  /* *******************  useEffect() hooks  *************************** */
  /* ******************************************************************* */

  useEffect(() => {
    /* */

    /* If we get the token from the currentUser then we will call the adminCheck() function 
       to fullfill the token inside it and passing the same condition as dependencies.
    */
    if (currentUser) {
      /* */

      adminCheck();

      /* */
    }

    /* */
  }, [currentUser]);

  /* If we get ok as true then we will allow the user to go to his private route's otherwise we will 
     call the spinner component.
  */

  // return ok ? <Outlet /> : <Spinner path="" />;

  /* */
}
