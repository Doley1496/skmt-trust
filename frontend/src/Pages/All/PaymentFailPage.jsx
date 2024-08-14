/* */

import React from "react";

import Layout from "../../Components/All/Layout.jsx";

import styled from "styled-components";

import { Link } from "react-router-dom";

export default function PaymentFailPage() {
  /* */

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  return (
    /* */

    <Wrapper>
      <Layout title={"Payment-Fail-page"}>
        {/* */}

        <h1
          className="uppercase text-3xl font-semibold font-sans text-slate-700 text-center mt-[100px] 
          mb-[100px] responsive-text"
        >
          Your payment is failed! Please try again
        </h1>

        <Link
          to={"/buyingPage"}
          className="py-[20px] px-4 bg-[#800000] text-[#d8d0d2] rounded-lg hover:opacity-75 
          disabled:opacity-90 font-sans font-semibold text-4xl w-[30%] mx-auto uppercase 
          hover:bg-[#A91B60] responsive-button"
          style={{
            textAlign: "center",
            display: "block",
          }}
        >
          Go Back
        </Link>

        {/* */}
      </Layout>
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

    .responsive-text {
      font-size: 2.7rem;
      line-height: 1.4;
      padding: 10px;
    }

    .responsive-button {
      width: 75%;
      font-size: 2.6rem;
      padding: 20px;
    }

    /* */
  }

  /* */
`;
