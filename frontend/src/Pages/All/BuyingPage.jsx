/* */

import React from "react";

import Layout from "../../Components/All/Layout.jsx";

import PageNavigation from "../../Components/All/PageNavigation.jsx";

import styled from "styled-components";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

export default function BuyingPage() {
  /* */

  const { currentUser } = useSelector((state) => state.user);

  /* ******************************************************************************** */
  /* *******************************    return   ************************************ */
  /* ******************************************************************************** */

  return (
    /* */

    <Wrapper className="mb-[200px]">
      {/* */}

      <Layout title={"Buying-Page"}>
        {/* */}

        <PageNavigation title="Buying Page" />

        <div>
          {currentUser ? (
            <h1 className="text-4xl m-3 p-5 text-center font-bold font-sans text-[#800000]">
              🤩 Welcome {currentUser.firstName} !!! 🤩
              <br />
            </h1>
          ) : (
            ""
          )}
        </div>

        <div className="text-3xl m-3 pb-5 text-center font-bold font-sans text-[#800000]">
          <p>
            ✴ Please! buy coupon numbers or book numbers by clicking on the
            below buttons ✴
          </p>
        </div>

        {/* ************************************** */}
        {/* Creating an section for ticket number. */}

        <div className="text-3xl text-[#154c79] text-center font-bold font-sans py-[40px] mr-4">
          {/* */}

          <p className="text-center">
            {/* */}

            <span className="mx-6">
              ✶ If you want to buy coupon numbers individually then please click
              on buy coupons button below ✶
            </span>

            <p className="mt-4 pb-7 text-7xl"> ⤵ </p>

            {/* */}
          </p>

          <Link
            to="/ticketBuying"
            className="py-4 px-4 bg-[#800000] text-[#eee6e8] rounded-lg uppercase hover:opacity-75 
            disabled:opacity-90 w-[30%] font-sans font-semibold"
          >
            Buy Individual Coupons
          </Link>

          {/* */}
        </div>

        {/* ************************************ */}
        {/* Creating an section for book number. */}

        <div className="text-3xl text-[#154c79] text-center font-bold font-sans py-[40px] mr-4">
          {/* */}

          <p className="text-center">
            {/* */}

            <span>
              ✶ If you want to buy book numbers then please click on buy books
              button below ✶
            </span>

            <p className="mt-4 pb-7 text-7xl"> ⤵ </p>

            {/* */}
          </p>

          <Link
            to="/bookBuying"
            className="py-4 px-4 bg-[#800000] text-[#eee6e8] rounded-lg uppercase hover:opacity-75 
            disabled:opacity-90 w-[30%] font-sans font-semibold"
          >
            Buy Books
          </Link>

          {/* */}
        </div>

        {/* *********************************** */}
        {/* Creating an section for membership. */}

        <div className="text-3xl text-[#154c79] text-center font-bold font-sans py-[40px] mr-4">
          {/* */}

          <p className="text-center">
            {/* */}

            <span>
              ✶ If you want to become a member of SKMT Trust then please click
              on become a member button below ✶
            </span>

            <p className="mt-4 pb-7 text-7xl"> ⤵ </p>

            {/* */}
          </p>

          <Link
            to="/membership"
            className="py-4 px-4 bg-[#800000] text-[#eee6e8] rounded-lg uppercase hover:opacity-75 
            disabled:opacity-90 w-[30%] font-sans font-semibold mt-[25px]"
          >
            Become a member
          </Link>

          {/* */}
        </div>

        {/* */}
      </Layout>

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

    /* */
  }

  /* */
`;
