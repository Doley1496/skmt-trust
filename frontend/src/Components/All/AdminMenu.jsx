/* */

import React from "react";

import styled from "styled-components";

import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  /* */

  return (
    <Wrapper>
      <div className="text-center">
        {/* */}

        <h3 className="text-5xl font-bold text-gray-600 m-3 mb-5 font-sans">
          ADMIN PANEL
        </h3>

        <div className="flex flex-col gap-5 mr-5 text-3xl">
          {/* */}

          <NavLink
            to="/dashboard/admin/create-service"
            className="bg-slate-800 text-gray-200 p-3 py-4 rounded-lg hover:opacity-75 
            font-semibold font-sans responsive-button"
          >
            Create Service
          </NavLink>

          <NavLink
            to="/dashboard/admin/display-services"
            className="bg-slate-800 text-gray-200 p-3 py-4 rounded-lg hover:opacity-75 font-semibold 
            font-sans responsive-button"
          >
            Display All Services
          </NavLink>

          <NavLink
            to="/dashboard/admin/users"
            className="bg-slate-800 text-gray-200 p-3 py-4 rounded-lg hover:opacity-75 font-semibold 
            font-sans responsive-button"
          >
            Display All Users
          </NavLink>

          {/* */}
        </div>

        {/* */}
      </div>
    </Wrapper>
  );

  /* */
};

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

    .responsive-heading {
      font-size: 3rem;
    }

    .responsive-button {
      font-size: 2rem;
      margin-right: 10px;
      margin-left: 5px;
    }

    /* */
  }

  /* */
`;

export default AdminMenu;
