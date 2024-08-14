/* */

import React, { useState } from "react";

import Layout from "../../Components/All/Layout.jsx";
import PageNavigation from "../../Components/All/PageNavigation.jsx";
import styled from "styled-components";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

export default function Membership() {
  /* */

  const { currentUser } = useSelector((state) => state.user);

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  return (
    /* */

    <Wrapper>
      {/* */}

      <Layout title={"Book-buying page"}>
        <div className="mb-[200px] fonts">
          {/* */}

          <PageNavigation title="Membership" />

          {/* ********************************** */}
          {/* Heading and the certificate image. */}

          <div className="">
            <h1 className="text-4xl m-3 p-5 text-center text-[#800000] font-bold">
              🌟 Welcome {currentUser.firstName} !!! 🌟
              <br />
            </h1>

            <img
              src="/mainImages/memberShipCertificate.jpg"
              alt="membership"
              className="mb-5"
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          <div>
            <p className="text-[23px] p-5 text-center text-[#800000] font-bold font-sans responsive-heading1">
              We are offering a lifetime membership to 5000 members for
              <del className="mr-5 ml-4">Rs 5000 </del> Rs 2500
            </p>
          </div>

          <div className="text-2xl m-3 text-[#154c79] text-center font-bold font-sans responsive-heading1">
            <p className="mr-3 font-bold">
              {/* */}

              <h1
                className="text-4xl font-sans font-semibold my-[20px] py-[10px] text-[#1F0B3E] 
                responsive-heading1"
              >
                The benefits of becoming a member of SKMT Trust are :
              </h1>

              <div
                className="m-3 pl-7 text-[17px] font-sans font-semibold text-center leading-10
                responsive-star-content"
              >
                {/* */}

                <p className="mb-4">
                  ✹ You will become a lifetime member of SKMT Trust
                </p>

                <p className="mb-4">
                  ✹ You will get 4 random books from us :{" "}
                  <span className="text-[17px] text-[#C70039]">
                    (We will send 4 books along with a membership certificate to
                    your provided address)
                  </span>
                </p>

                <p className="mb-4">
                  ✹ You will also be eligible for our membership contest, which
                  we will organize amoung all our members
                </p>

                {/* */}
              </div>

              <div>
                {/* */}

                <p
                  className="text-[23px] p-5 text-center text-[#800000] font-bold font-sans 
                  responsive-heading2"
                >
                  ✹ The prizes for our membership contest are as follows :
                </p>

                <p className="mt-4 text-7xl"> ⤵ </p>

                <ul className="gap-4 p-4 uppercase">
                  <li className="py-3 font-sans font-semibold text-3xl">
                    ✹ Nissan magnite
                  </li>
                </ul>

                <p className="text-center text-3xl font-sans font-semibold mt-4">
                  If all 5000 membership is completed, then we will also provide
                  an extra prize for our membership contest which is
                  <h1 className="py-3 font-sans font-semibold text-3xl mt-3">
                    <p className="mt-2 text-7xl"> ⤵ </p>✹ KIA KERENS
                  </h1>
                </p>

                {/* */}
              </div>

              {/* */}
            </p>
          </div>

          <Link
            to={"/membershipSummaryPage/?step=2"}
            className="py-[20px] px-4 bg-[#800000] text-[#d8d0d2] rounded-lg hover:opacity-75 
            disabled:opacity-90 font-sans font-semibold text-4xl w-[30%] mx-auto mt-[80px] 
            hover:bg-[#A91B60] responsive-button"
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            Proceed to pay
          </Link>

          {/* */}
        </div>
      </Layout>

      {/* */}
    </Wrapper>

    /* */
  );
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

    .responsive-heading1 {
      font-size: 2.4rem;
      line-height: 1.4;
    }

    .responsive-heading2 {
      font-size: 2.3rem;
      line-height: 1.4;
    }

    .responsive-button {
      width: 75%;
      font-size: 2.6rem;
      padding: 20px;
    }

    .responsive-star-content {
      line-height: 1.4;
    }

    /* */
  }

  /* */
`;
