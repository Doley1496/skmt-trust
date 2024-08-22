/* */

import React, { useState } from "react";

import Layout from "./Layout";

import styled from "styled-components";

import { NavLink, Link } from "react-router-dom";

export default function () {
  /* */

  const [loading, setLoading] = useState(false);

  const events = [
    /* */

    {
      id: 1,
      image: "/newImages/couponResults.jpg",
      name: "Luck Coupon Draw Results",
      description: "Lucky draw 2024 Results -- Golaghat",
      link: "/couponResults",
    },

    {
      id: 2,
      image: "/newImages/fish1.jpg",
      name: "Fishing Competition",
      description: "Fishing Comeptition 2024 -- Golaghat",
      link: "/fishingCompetition",
    },

    {
      id: 3,
      image: "/newImages/quiz2.webp",
      name: "Quiz Competition",
      description: "Quiz Competition 2024 -- Golaghat",
      link: "/quizCompetition",
    },

    /* */
  ];

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  return (
    /* */

    <Layout>
      {/* */}

      <Wrapper className="my-5 fonts mt-[40px]">
        {/* */}

        <div className="mb-[30px] mt-[60px]">
          <h5 className="text-center text-5xl font-semibold font-sans text-[#14527C]">
            ✸ Our Latest News & Events ✸
          </h5>
        </div>

        <div className="container">
          {/* */}

          <div className="row">
            {/* */}

            {/* **************************************************************** */}
            {/* When we get the loading as true(ie. when the web-page is refreshing)  
                then we will display Loading...  
            */}

            {loading && (
              <p className="text-xl text-slate-700 text-center w-full">
                Loading...
              </p>
            )}

            {/* ************************************************************************** */}
            {/* Dynamically Accessing the above products array using map function and passing
                all its data's in the product parameter.
            */}

            {events?.map((event) => (
              /* */

              <NavLink
                key={event.id}
                to={event.link}
                className="col-lg-4 col-md-4 mb-4 hover:no-underline"
              >
                <div
                  className="border rounded-2xl overflow-hidden cursor-pointer h-[580px]"
                  style={{ boxShadow: "0 0 30px rgba(0,0,0,0.5)" }}
                >
                  {/* */}

                  {/* ***************** IMAGE **************** */}
                  {/* Displaying 1st the image of the service. */}

                  <figure className="gap-5 mx-3">
                    <figcaption
                      className="caption bg-gray-300 font-bold font-serif text-2xl m-3
                        rounded-lg px-3 py-3 text-[#72435C] responsive-heading"
                    >
                      {event.description}
                    </figcaption>

                    <img
                      src={event.image}
                      alt={event.name}
                      className="sm:h-[140px] w-full object-cover hover:scale-105 transition-scale 
                                   duration-300 rounded-lg pt-2 responsive-img "
                      style={{
                        width: "100%",
                        height: "360px",
                        backgroundRepeat: "no-repeat",
                      }}
                    />
                  </figure>

                  {/* ************** NAME *************** */}
                  {/* Displaying the name of the service. */}

                  <h4 className="text-center text-[20px] text-[#800000] font-serif py-4 mt-4">
                    {event.name}
                  </h4>

                  <div className="">
                    <Link
                      to={event.link}
                      className="btn btn-success rounded-lg text-center px-4 py-3 font-semibold text-[15px]
                      text-[#411616] font-serif pb-3 mt-3 mb-6 ml-[10px] responsive-readMore"
                      style={{ width: "95%" }}
                    >
                      Read More
                    </Link>
                  </div>

                  {/* */}
                </div>
              </NavLink>

              /* */
            ))}

            {/* */}
          </div>

          {/* */}
        </div>

        {/* */}
      </Wrapper>

      {/* */}
    </Layout>

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

    .responsive-heading {
      font-size: 1.9rem;
      line-height: 1.5;
    }

    .responsive-readMore {
      margin-left: 8px;
    }

    /* */
  }

  /* */
`;
