/* */

import React from "react";

import Layout from "../../Components/All/Layout.jsx";

import styled from "styled-components";

import PageNavigation from "../../Components/All/PageNavigation.jsx";

import { Link } from "react-router-dom";

export default function GalleryPage() {
  /* */

  return (
    /* */

    <Wrapper>
      {/* */}

      <div className="mb-5 mt-[-100px] responsive-pagination">
        <PageNavigation title="Gallery" />
      </div>

      <Layout title={"Gallery-Page"}>
        {/* */}

        {/* **************************** */}
        {/* Heading of the gallery page. */}

        <div className="mb-[50px]">
          <h5 className="text-center underline text-6xl font-serif font-bold text-[#3d594f]">
            ❁ Our Gallery ❁
          </h5>
        </div>

        {/* ***************************************** */}
        {/* Creating Links to show photos and videos. */}

        <div className="row grid gap-[30px]" style={{ textAlign: "center" }}>
          {/* */}

          <Link
            to="/photoGallery"
            className="col-md-6 btn btn-success rounded-lg mt-3 px-5 py-[18px] font-semibold font-sans 
            text-[19px] hover:bg-red-900 mx-auto responsive-button"
          >
            Photo Gallery
          </Link>

          <Link
            to="/videoGallery"
            className="col-md-6 btn btn-success rounded-lg mt-3 px-5 py-[18px] font-semibold font-sans
            text-[19px] hover:bg-red-900 mx-auto responsive-button"
          >
            Video Gallery
          </Link>

          {/* */}
        </div>

        {/* */}
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

  padding: 9rem 0;

  /* */

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-pagination {
      margin-top: -70px;
    }

    .responsive-button {
      width: 80%;
      font-size: 2.6rem;
    }

    /* */
  }

  /* */
`;
