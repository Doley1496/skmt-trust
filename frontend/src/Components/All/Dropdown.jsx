/* */

import React from "react";

import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../../Redux/Actions/authActions.jsx";

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

import { toast } from "react-toastify";

export default function Dropdown({ handleClick }) {
  /* */

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  const page = currentUser.role === 1 ? "admin" : "user";

  const handleLogOut = async (event) => {
    /* */

    try {
      /* */

      dispatch(signOutUserStart());

      const res = await fetch(
        `${VITE_SERVER_URL}/api/auth/logOut`,

        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }

      toast.success(data.message);

      dispatch(signOutUserSuccess());

      localStorage.clear();

      navigate("/login");

      // window.location.reload();

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      dispatch(signOutUserFailure(error.message));

      console.log(error);

      /* */
    }

    /* */
  };

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  return (
    /* */

    <Wrapper className="flex flex-col dropdownProfile">
      {/* */}

      <ul className="flex flex-col gap-4">
        {/* */}

        {/* Checking the role if equal to 1 then its the admin so for that we will redirect 
            to the admin dashboard page otherwise its a general user so redirect to the user 
            dashboard page because for admin we have given role as 1 and for 
            general user role as 0.
        */}

        <Link
          to={`/dashboard/${page}`}
          className="hover:bg-blue-300 rounded-lg text-center text-black 
          font-semibold responsive-content"
          onClick={handleClick}
        >
          Dashboard
        </Link>

        <Link
          to="dashboard/user/profile"
          className="font-semibold hover:bg-blue-300 rounded-lg text-center text-black 
          responsive-content"
          onClick={handleClick}
        >
          My Profile
        </Link>

        {/* */}
      </ul>

      {/* ******************************************************* */}
      {/* Creating a button to signout from this current account. */}

      <span
        className="text-red-700 cursor-pointer font-semibold text-center hover:bg-blue-300 mt-3 
        rounded-lg responsive-content"
        onClick={handleLogOut}
      >
        <span onClick={handleClick}>LogOut</span>
      </span>

      {/* */}
    </Wrapper>

    /* */
  );

  /* */
}

/* **************************************************************************************** */
/* Using media-queries of styled of styled-components we are providing responsiveness for 
   mobile size and storing in a variable Wrapper. This Wrapper will be use to wrap the whole 
   elements we want to return.
*/
/* **************************************************************************************** */

const Wrapper = styled.section`
  /* */

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-content {
      padding-top: 10px;
      padding-bottom: 10px;
    }

    /* */
  }

  /* */
`;
