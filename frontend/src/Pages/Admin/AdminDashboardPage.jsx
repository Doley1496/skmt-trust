/* */

import React from "react";

import Layout from "../../Components/All/Layout.jsx";

import styled from "styled-components";

import AdminMenu from "../../Components/All/AdminMenu.jsx";

import { useSelector } from "react-redux";

import { MdOutlineDoubleArrow } from "react-icons/md";

const AdminDashboardPage = () => {
  /* */

  const { currentUser } = useSelector((state) => state.user);

  /* ************************************************************************ */
  /* ****************************   return   ******************************** */
  /* ************************************************************************ */

  /* Returning the content that we will display in the "/dashboard/admin" route.
     because for this route we have provide component {<AdminDashboardPage />}
     ie. <Route path="admin" element={<AdminDashboardPage />} />.
  */
  return (
    /* */

    <Wrapper>
      {/* */}

      <Layout title={"Admin-Dashboard-Page"}>
        {/* */}

        <div className="container-fluid m-3 p-3">
          <div className="row">
            {/* */}

            {/* Using grid system to separate the contents in two parts :
                1st part contains Admin menu
                2nd part contains admin's information.
            */}

            {/* ***************************** */}
            {/* 1st part contains admin's menu*/}

            <div className="col-md-3 mb-6">
              <AdminMenu />
            </div>

            {/*************************************** */}
            {/* 2nd part contains admin's information */}

            <div className="col-md-9">
              <div className="text-[#69124A] mt-[50px] ml-[60px] font-bold font-sans ">
                {/* */}

                <div className="text-4xl ml-5 mb-5 uppercase ">
                  {/* */}

                  <p className="responsive-name">
                    Admin Name
                    <MdOutlineDoubleArrow className="ml-[230px] mt-[-27px] responsive-arrow" />
                  </p>

                  <p className="ml-[270px] mt-[-27px] responsive-content">
                    {`${currentUser.firstName} ${currentUser.lastName}`}
                  </p>

                  {/* */}
                </div>

                <div className="text-4xl ml-5 mb-5">
                  {/* */}

                  <p className="uppercase mr-3 responsive-name">
                    Admin Email
                    <MdOutlineDoubleArrow className="ml-[230px] mt-[-27px] responsive-arrow" />
                  </p>

                  <p className="ml-[270px] mt-[-27px] responsive-content">
                    {currentUser.email}
                  </p>

                  {/* */}
                </div>

                <div className="text-4xl ml-5 mb-5 uppercase">
                  {/* */}

                  <p className="uppercase mr-3 responsive-name">
                    Admin Contact
                    <MdOutlineDoubleArrow className="ml-[230px] mt-[-27px] responsive-arrow" />
                  </p>

                  <p className="ml-[270px] mt-[-27px] responsive-content">
                    {currentUser.phone}
                  </p>

                  {/* */}
                </div>

                <div className="text-4xl ml-5 mb-5 uppercase">
                  {/* */}

                  <p className="uppercase mr-3 responsive-name">
                    Admin Address
                    <MdOutlineDoubleArrow className="ml-[230px] mt-[-27px] responsive-arrow" />
                  </p>

                  <p className="ml-[270px] mt-[-27px] responsive-content">
                    {currentUser.address}
                  </p>

                  {/* */}
                </div>

                {/* */}
              </div>
            </div>

            {/* */}
          </div>
        </div>

        {/* */}
      </Layout>

      {/* */}
    </Wrapper>

    /* */
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

    .responsive-content {
      margin-left: 120px;
      margin-top: -17px;
      font-size: 2rem;
    }

    .responsive-name {
      margin-left: -75px;
    }

    .responsive-arrow {
      margin: auto;
      margin-top: -20px;
      margin-left: 165px;
    }

    /* */
  }

  /* */
`;

export default AdminDashboardPage;
