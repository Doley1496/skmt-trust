/* */

import React from "react";

import styled from "styled-components";

import Layout from "../../Components/All/Layout.jsx";

import PageNavigation from "../../Components/All/PageNavigation.jsx";

export default function QuizPage() {
  /* */

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  return (
    /* */

    <Wrapper>
      <Layout title={"Quiz-Competition Page"}>
        {/* */}

        <PageNavigation title="Quiz Competition" />

        <div className="bg-[#3D5B59] pb-[90px] mt-[-16px] mb-[-35px] responsive-competition-top-bottom">
          {/* */}

          <div
            className="m-4"
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            {/* */}

            <h1 className="text-5xl p-5 font-serif underline text-gray-400">
              Registration starts from July 20 2024
            </h1>

            <h1 className="text-5xl p-5 font-serif text-gray-400">
              Amazing Prizes Await You!
            </h1>

            <h1 className="text-3xl font-bold text-gray-400 mb-5 font-sans">
              SKMT trust is organizing a Quiz competition for all school
              students this September
            </h1>

            {/* */}
          </div>

          <div
            className="m-4 pt-1"
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            {/* */}

            <h1 className="font-bold mb-4 mt-5 pb-2 text-5xl font-serif">
              ✶ Competition Details ✶
            </h1>

            <ul className="mb-4 text-2xl responsive-venue-details">
              <li className="text-gray-400 font-semibold mb-2 font-sans">
                Venue : Mirang Akum Arengapara near Veterinary hospital Golaghat
                (Assam)
              </li>

              <li className="text-gray-400 font-semibold mb-2 font-sans">
                Date : September 2024
              </li>

              <li className="text-gray-400 font-semibold mb-2 font-sans">
                Time : 10 am to 12 pm
              </li>

              <li className="text-gray-400 font-semibold mb-2 font-sans">
                Organiser Contact : 70863-67457 / 94011-87976
              </li>

              <li className="text-gray-400 font-semibold mb-2 font-sans">
                Registration Fee : FREE
              </li>
            </ul>

            {/* */}
          </div>

          <h3
            className="text-3xl font-semibold font-sans m-4 pb-[40px] text-[#D2E5D0]"
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            To participate please contact the organiser with about contact
            numbers
          </h3>

          <h3
            className="font-bold text-4xl text-[#B99095] m-4 pb-[40px]"
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            ✺ Prizes are divided into two categories ✺
          </h3>

          <div
            className="m-4"
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            {/* */}

            <h1 className="text-[25px] mb-6 text-[#D2E5D0] font-bold responsive-heading">
              1. Cash Prizes
            </h1>

            <ul className="mb-5 text-2xl text-gray-300 responsive-cash-prizes">
              {/* */}

              <li className="font-bold leading-10 font-sans responsive-cash-prizes">
                <span className=""> 1st Prize </span>
                <span className="mr-4 ml-6"> ➽ </span>
                <span className=""> Rs 15,000 </span>
              </li>

              <li className="font-bold leading-10 font-sans responsive-cash-prizes">
                <span className=""> 2nd Prize </span>
                <span className="mr-4 ml-5"> ➽ </span>
                <span className=""> Rs 12,000 </span>
              </li>

              <li className="font-bold leading-10 font-sans responsive-cash-prizes">
                <span className=""> 3rd Prize </span>
                <span className="mr-4 ml-6"> ➽ </span>
                <span className=""> Rs 10,000 </span>
              </li>

              <li className="font-bold leading-10 font-sans responsive-cash-prizes">
                <span className=""> 4th Prize </span>
                <span className="mr-4 ml-6"> ➽ </span>
                <span className="ml-[10px]"> Rs 7,000 </span>
              </li>

              <li className="font-bold leading-10 font-sans responsive-cash-prizes">
                <span className=""> 5th Prize </span>
                <span className="mr-4 ml-6"> ➽ </span>
                <span className="ml-[10px]"> Rs 5,000 </span>
              </li>

              {/* */}
            </ul>

            {/* */}
          </div>

          <div
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            <h1 className="text-[25px] mb-6 text-[#D2E5D0] font-bold responsive-heading">
              2. All the participants will get a joining certificate
            </h1>
          </div>

          {/* */}
        </div>

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

    .responsive-competition-top-bottom {
      margin: auto;
      margin-top: -12px;
      margin-bottom: -25px;
    }

    .responsive-cash-prizes {
      font-size: 2rem;
      line-height: 2.4;
    }

    .responsive-venue-details {
      font-size: 2rem;
      line-height: 1.6;
      font-weight: bold;
    }

    .responsive-heading {
      font-size: 2.4rem;
      margin: 6px;
    }

    /* */
  }

  /* */
`;
