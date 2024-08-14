/* */

import React, { useState } from "react";

import Layout from "../../Components/All/Layout.jsx";

import PageNavigation from "../../Components/All/PageNavigation.jsx";

import styled from "styled-components";

import { NavLink, Link } from "react-router-dom";

export default function () {
  /* */

  const [loading, setLoading] = useState(false);

  const services = [
    /* */

    {
      id: 1,
      image: "/newImages/gaon1.jpeg",
      name: "Exploring",
      description:
        "Enjoy the exciting views of the river brahmaputra and its surroundings",
      link: "/exploration",
    },

    {
      id: 2,
      image: "/newImages/gaon17.jpeg",
      name: "Boating",
      description: "Enjoy boating in the nearby lakes of river brahmaputra",
      link: "/boating",
    },

    {
      id: 3,
      image: "/mainImages/cottage1.jpg",
      name: "Cottages",
      description: "Enjoy staying in the traditional bamboo cottages",
      link: "/cottage",
    },

    {
      id: 4,
      image: "/newImages/fish1.jpeg",
      name: "Fishing",
      description: "Catch fish in the river brahmaputra",
      link: "/fishing",
    },

    /* */
  ];

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  return (
    /* */

    <Layout title={"Service-Page"}>
      {/* */}

      <PageNavigation title="Service" />

      <Wrapper className="my-5 fonts">
        {/* */}

        <div className="mb-[50px]">
          <h5 className="text-center underline text-6xl font-semibold font-serif text-[#3d594f]">
            ❁ Our Services ❁
          </h5>
        </div>

        <div className="container">
          {/* */}

          <div className="row">
            {/* */}

            {/* When we get the loading as true(ie. when the web-page is refreshing)  
                then we will display Loading...  
            */}

            {loading && (
              <p className="text-xl text-slate-700 text-center w-full">
                Loading...
              </p>
            )}

            {/* Dynamically Accessing the above products array using map function and passing
                all its data's in the product parameter.
            */}

            {services?.map((service) => (
              /* */

              <NavLink
                key={service.id}
                to={service.link}
                className="col-lg-3 col-md-4 mb-4 hover:no-underline"
              >
                <div
                  className="border rounded-2xl overflow-hidden cursor-pointer h-[300px]"
                  style={{ boxShadow: "0 0 30px rgba(0,0,0,0.5)" }}
                >
                  {/* */}

                  {/* ***************** IMAGE **************** */}
                  {/* Displaying 1st the image of the service. */}

                  <div className="">
                    <img
                      src={service.image}
                      alt="service-cover"
                      style={{ width: "100%", height: "200px" }}
                      className="sm:h-[170px] w-full object-cover hover:scale-105 transition-scale 
                      duration-300 rounded-lg pt-2"
                    />
                  </div>

                  {/* **************  NAME AND DESCRIPTION  ************* */}
                  {/* Displaying the name and description of the service. */}

                  <div className="mt-3 px-3">
                    {/* */}

                    {/* ************** NAME *************** */}
                    {/* Displaying the name of the service. */}

                    <h4 className="text-center text-[20px] text-[#800000] font-serif pb-3">
                      {service.name}
                    </h4>

                    {/* ************** DESCRIPTION *************** */}
                    {/* Displaying the description of the service. */}

                    <p className="line-clamp-2 font-mono font-semibold text-[15px]">
                      {service.description}
                    </p>

                    {/* */}
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

        <div
          className="mt-[60px] mb-[80px]"
          style={{
            textAlign: "center",
            display: "block",
          }}
        >
          <p className="text-[#f54c6b] font-semibold font-sans text-4xl  responsive-paragraph">
            We provide all this facilities from Borbeel(Dusutimukh) Eco-tourism
            camp
          </p>

          <Link
            to="/dusutimukh"
            className="btn btn-success rounded-lg mt-4 px-4 py-4 font-semibold font-sans text-[18px] 
            text-center hover:bg-[#f54c6b]"
          >
            Read More About Borbeel Eco-tourism
          </Link>
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

    .responsive-paragraph {
      font-size: 2.1rem;
      line-height: 1.3;
    }

    .responsive-readMore {
      padding-left: 100px;
    }

    .responsive-heading {
      font-size: 1.9rem;
      line-height: 1.5;
    }

    /* */
  }

  /* */
`;
