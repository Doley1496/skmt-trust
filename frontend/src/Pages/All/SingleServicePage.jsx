/* */

import { useState, useEffect } from "react";

import Layout from "../../Components/All/Layout.jsx";

import styled from "styled-components";

import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

import PageNavigation from "../../Components/All/PageNavigation.jsx";

import MyImage from "../../Components/All/MyImages.jsx";

import { toast } from "react-toastify";

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function SingleService() {
  /* */

  const params = useParams();

  const [singleService, setSingleService] = useState([]);

  const getSingleServiceDetails = async () => {
    /* */

    try {
      /* */

      const res = await fetch(
        `${VITE_SERVER_URL}/api/service/getSingleService/${params.serviceId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success === false) {
        /* */

        toast.error(data.message);

        return;

        /* */
      }

      setSingleService(data);

      /* Catching the error and displaying it with a toast message. */
    } catch (error) {
      /* */

      toast.error("Something went wrong. Please try agin later!");

      /* */
    }

    /* */
  };

  /* ******************************************************************* */
  /* *******************  useEffect() hooks  *************************** */
  /* ******************************************************************* */

  useEffect(() => {
    /* */

    getSingleServiceDetails();

    /* */
  }, []);

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  return (
    /* */

    <Wrapper>
      {/* */}

      <Layout title={"Single-Service-Page"}>
        {/* */}

        <PageNavigation title={singleService.name} />

        <div className="container">
          {/* */}

          <div className="mt-[20px] newGrid grid-two-column">
            {/* */}

            {/* *************************** */}
            {/* All Images of the service.  */}

            <div className="flex justify-center items-center">
              {/* */}

              {/* Passing the image of the service as props to the MyImage component to style 
                  the image in the MyImage component and display it here.
              */}

              {<MyImage photo={singleService.photo} />}

              {/* */}
            </div>

            {/* ************************ */}
            {/* Data of all the service. */}

            <div className="mt-5">
              {/* */}

              {/* **************************** */}
              {/* Displaying the service name. */}

              <h2 className="text-4xl m-4 font-sans">{singleService.name}</h2>

              {/* *********************************** */}
              {/* Displaying the service description. */}

              <p className="text-[#d84c63] font-semibold text-2xl mb-5">
                {singleService.description}
              </p>

              <p className="text-[#978286] font-semibold text-2xl mb-5">
                We provide all this facilities in Dusutimukh eco camp
              </p>

              <Link
                to="/dusutimukh"
                className="btn btn-success rounded-lg mt-3 px-4 py-3 font-semibold text-[15px]"
              >
                Read More About Dusutimukh
              </Link>

              {/* */}
            </div>

            <hr className="font-bold text-5xl text-black w-[100%]" />

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

  .newGrid {
    display: grid;
    gap: 2rem;
  }

  .grid-two-column {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    padding: 0 2.4rem;

    .grid-two-column {
      grid-template-columns: repeat(1, 1fr);
    }

    /* */
  }

  /* */
`;
