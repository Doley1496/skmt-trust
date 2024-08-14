/* */

import React from "react";

import styled from "styled-components";

import Layout from "../../Components/All/Layout.jsx";

import PageNavigation from "../../Components/All/PageNavigation.jsx";

import { Link } from "react-router-dom";

const PageNotFound = () => {
  /* */

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  return (
    /* */

    <Wrapper>
      <Layout title={"Page-Not-found-page"}>
        {/* */}

        <PageNavigation title="Page Not Found" />

        <div
          className="flex justify-center my-[40px] p-3 gap-3 font-sans font-semibold text-4xl 
          responsive-text"
        >
          <h1 className="">404 </h1>
          <h2 className=""> Oops! Page Not Found</h2>
        </div>

        <div
          className="py-4 px-4 bg-[#800000] mx-auto rounded-lg uppercase font-bold font-sans mr-4 mt-[25px] 
          disabled:opacity-90 hover:opacity-75 text-[#d5dce2] text-center text-3xl w-[20%] responsive-button"
        >
          <Link to="/">Go Back</Link>
        </div>

        {/* */}
      </Layout>
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

  /* */

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-text {
      font-size: 2.7rem;
    }

    .responsive-button {
      width: 30%;
    }

    /* */
  }

  /* */
`;

export default PageNotFound;
