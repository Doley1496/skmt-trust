/* */

import React from "react";

import Layout from "../../Components/All/Layout.jsx";

import PageNavigation from "../../Components/All/PageNavigation.jsx";

import styled from "styled-components";

import { NavLink, Link } from "react-router-dom";

export default function CompetitionsPage() {
  /* */

  return (
    /* */

    <Wrapper>
      {/* */}

      <Layout title={"Competitions-page"}>
        {/* */}

        <div className="bg-[#9a999c] mt-[-100px] mb-[-170px] responsive-competition-top-bottom">
          {/* */}

          <PageNavigation title="Competition Page" />

          {/* ***************************************** */}
          {/* Links to go the lottery competition page. */}

          <div
            className="pt-5 text-3xl text-slate-600 flex flex-col m-4 pb-[20px] font-sans"
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            {/* */}

            <h1 className="text-4xl font-bold text-[#69124A] pb-8">
              ✺ Our Current events ✺
            </h1>

            <p className="text-2xl mt-3 text-[#080B39] font-bold font-sans pb-8 responsive-paragraph">
              ✴ On behalf of our trust we are going to organized a lucky draw
              coupon on 15 August 2024 ✴
            </p>

            <p className="text-[#080B39] text-3xl font-bold fonts pb-8 responsive-paragraph1">
              ✹ To check details regarding the lucky draw click on the below
              button ✹
            </p>

            <NavLink
              to="/pageNotFound"
              // to="/lotteryCompetition"
              className="mr-5 mb-5 mt-[40px] text-[#4d2339] text-3xl uppercase bg-[#D8CEE6] py-[17px] 
              px-4 rounded-lg font-sans font-semibold mx-auto w-[30%] hover:bg-[#424651] responsive-button"
              style={{
                textAlign: "center",
                display: "block",
              }}
            >
              Lucky Draw Coupon
            </NavLink>

            {/* */}
          </div>

          <hr className="mt-5 font-bold w-[75%] mx-auto text-[40px]" />

          {/* ***************************************** */}
          {/* Links to go the fishing competition page. */}

          <div
            className="pt-5 text-3xl text-slate-600 flex flex-col m-4 pb-[20px] font-sans"
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            {/* */}

            <h2 className="text-4xl font-bold text-[#69124A] pb-8">
              ✺ Our upcomming events ✺
            </h2>

            <p className="text-2xl mt-3 text-[#080B39] font-bold font-sans pb-8 responsive-paragraph">
              ✴ On behalf of our trust we are going to organized a fishing
              competition on the month of November 2024 ✴
            </p>

            <p className="text-[#080B39] text-3xl font-bold fonts pb-8 responsive-paragraph1">
              ✹ To check details regarding the fishing competition click on the
              below button ✹
            </p>

            <NavLink
              to="/fishingCompetition"
              className="mr-5 mb-5 mt-[40px] text-[#4d2339] text-3xl uppercase bg-[#D8CEE6] py-[17px] 
              px-4 rounded-lg font-sans font-semibold mx-auto w-[30%] hover:bg-[#424651] responsive-button"
              style={{
                textAlign: "center",
                display: "block",
              }}
            >
              Fishing Competition
            </NavLink>

            {/* */}
          </div>

          <hr className="mt-5 font-bold w-[75%] mx-auto text-[40px]" />

          {/* ************************************** */}
          {/* Links to go the quiz competition page. */}

          <div
            className="pt-5 text-3xl text-slate-600 flex flex-col m-4 pb-[100px] font-sans"
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            {/* */}

            <h2 className="text-4xl font-bold text-[#69124A] pb-8">
              ✺ Our upcomming events ✺
            </h2>

            <p className="text-2xl mt-3 text-[#080B39] font-bold font-sans pb-8 responsive-paragraph">
              ✴ On behalf of our trust we are going to organized a quiz
              competition for school students in the month of April 2024 ✴
            </p>

            <p className="text-[#080B39] text-3xl font-bold fonts pb-8 responsive-paragraph1">
              ✹ To check details regarding the quiz competition click on the
              below button ✹
            </p>

            <NavLink
              to="/quizCompetition"
              className="mr-5 mb-5 mt-[40px] text-[#4d2339] text-3xl uppercase bg-[#D8CEE6] py-[17px] 
              px-4 rounded-lg font-sans font-semibold mx-auto w-[30%] hover:bg-[#424651] responsive-button"
              style={{
                textAlign: "center",
                display: "block",
              }}
            >
              Quiz Competition
            </NavLink>

            {/* */}
          </div>

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

  padding: 9rem 0;

  /* */

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-competition-top-bottom {
      margin: auto;
      margin-top: -70px;
      margin-bottom: -120px;
    }

    .responsive-paragraph {
      font-size: 1.6rem;
      margin: 10px;
    }

    .responsive-paragraph1 {
      font-size: 1.9rem;
      margin: 10px;
    }

    .responsive-button {
      width: 75%;
      font-size: 1.9rem;
      padding: 15px;
    }

    /* */
  }

  /* */
`;
