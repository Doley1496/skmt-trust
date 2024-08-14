/* */

import React from "react";

import styled from "styled-components";

import Layout from "../../Components/All/Layout.jsx";

import PageNavigation from "../../Components/All/PageNavigation.jsx";

export default function FishingPage() {
  /* */

  return (
    /* */

    <Wrapper>
      <Layout title={"Fishing-Competition Page"}>
        {/* */}

        <PageNavigation title="Fishing Competition" />

        <div className="bg-[#D8CEE6] pb-[60px] mt-[-17px] mb-[-35px] responsive-competition-top-bottom">
          {/* */}

          <div
            className="m-4"
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            {/* */}

            <h1 className="text-5xl p-5 font-serif underline">
              Registration starts from August 10 2024
            </h1>

            <h1 className="text-5xl p-5 font-serif">
              Amazing Prizes Await You!
            </h1>

            <h1 className="text-3xl font-bold text-red-800 mb-5 font-sans">
              SKMT trust is organizing a fishing competition for all category
              this year in October.
            </h1>

            {/* */}
          </div>

          <div
            className="m-4"
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            {/* */}

            <h1 className="font-bold mb-4 mt-5 text-5xl font-serif">
              ✶ Competition Details ✶
            </h1>

            <ul className="mb-4 text-2xl responsive-venue-details">
              <li className="text-slate-700 font-bold mb-2 font-sans">
                Venue : Dusutimukh Anchalik Borbeel (Dusutimukh)
              </li>

              <li className="text-slate-700 font-bold mb-2 font-sans">
                Date : October 2024
              </li>

              <li className="text-slate-700 font-bold mb-2 font-sans">
                Time : 9 am to 2 pm
              </li>

              <li className="text-slate-700 font-bold mb-2 font-sans">
                Organiser Contact : 70863-67457 / 94011-87976
              </li>

              <li className="text-slate-700 font-bold mb-2 font-sans">
                Registration Fee : ₹5,000 / Rod
              </li>
            </ul>

            {/* */}
          </div>

          <h3
            className="font-bold text-4xl text-orange-800 m-5 responsive-heading"
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

            <h1 className="text-[25px] mb-6 text-orange-900 font-bold">
              1. Cash Prizes
            </h1>

            <ul className="mb-5 text-2xl responsive-cash-prizes2">
              {/* */}

              <li className="font-bold leading-10 font-sans responsive-cash-prizes2">
                <span className=""> 1st Prize </span>
                <span className="mr-4 ml-6"> ➽ </span>
                <span className=""> Rs 500,000 </span>
              </li>

              <li className="font-bold leading-10 font-sans responsive-cash-prizes2">
                <span className=""> 2nd Prize </span>
                <span className="mr-4 ml-4"> ➽ </span>
                <span className=""> Rs 400,000 </span>
              </li>

              <li className="font-bold leading-10 font-sans responsive-cash-prizes2">
                <span className=""> 3rd Prize </span>
                <span className="mr-4 ml-5"> ➽ </span>
                <span className=""> Rs 300,000 </span>
              </li>

              <li className="font-bold leading-10 font-sans responsive-cash-prizes2">
                <span className=""> 4th Prize </span>
                <span className="mr-4 ml-5"> ➽ </span>
                <span className=""> Rs 200,000 </span>
              </li>

              <li className="font-bold leading-10 font-sans responsive-cash-prizes2">
                <span className=""> 5th Prize </span>
                <span className="mr-4 ml-5"> ➽ </span>
                <span className=""> Rs 100,000 </span>
              </li>

              <li className="font-bold leading-10 font-sans responsive-cash-prizes2">
                <span className=""> 6th Prize </span>
                <span className="mr-4 ml-5"> ➽ </span>
                <span className="ml-[10px]"> Rs 80,000 </span>
              </li>

              <li className="font-bold leading-10 font-sans responsive-cash-prizes2">
                <span className="mr-4"> 7th Prize </span>
                <span className="mr-4 pl-1"> ➽ </span>
                <span className="ml-[10px]"> Rs 70,000 </span>
              </li>

              <li className="font-bold leading-10 font-sans responsive-cash-prizes2">
                <span className=""> 8th Prize </span>
                <span className="mr-4 ml-5"> ➽ </span>
                <span className="ml-[10px]"> Rs 50,000 </span>
              </li>

              <li className="font-bold leading-10 font-sans responsive-cash-prizes2">
                <span className=""> 9th Prize </span>
                <span className="mr-4 ml-5"> ➽ </span>
                <span className="ml-[10px]"> Rs 30,000 </span>
              </li>

              <li className="font-bold leading-10 font-sans responsive-cash-prizes2">
                <span className=""> 10th Prize </span>
                <span className="mr-4 ml-5"> ➽ </span>
                <span className="ml-[10px] mr-[10px]"> Rs 10,000 </span>
              </li>

              {/* */}
            </ul>

            {/* */}
          </div>

          <div
            className="m-4"
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            {/* */}

            <h1 className="text-[25px] mb-6 text-orange-900 font-bold">
              2. Charming Gifts
            </h1>

            <p className="text-[25px] mb-7 font-sans font-semibold responsive-gifts">
              10 lucky winners will get attractive gifts.
            </p>

            <p className="text-[25px] mb-7 pb-[80px] font-sans font-semibold responsive-gifts">
              We will organise a mini lucky contest among all the participants
              and we will choose 10 lucky winners.
            </p>

            {/* */}
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
      margin-bottom: -30px;
    }

    .responsive-heading {
      font-size: 2.5rem;
    }

    .responsive-venue-details {
      font-size: 1.8rem;
      line-height: 1.6;
      font-weight: bold;
    }

    .responsive-gifts {
      margin-left: 7px;
      margin-right: 7px;
      font-size: 2.1rem;
      font-weight: bold;
    }

    .responsive-cash-prizes2 {
      font-size: 2rem;
      line-height: 2.4;
    }

    /* */
  }

  /* */
`;
