/* */

import { React } from "react";

import Layout from "../../Components/All/Layout.jsx";

import styled from "styled-components";

import PageNavigation from "../../Components/All/PageNavigation.jsx";

export default function PhotoGalleryPage() {
  /* */

  return (
    /* */

    <Wrapper>
      {/* */}

      <div className="mb-5 mt-[-100px] responsive-pagination">
        <PageNavigation title="Coupons-Results" />
      </div>

      <Layout title={"Results-Page"}>
        {/* */}

        {/* ********************************** */}
        {/* Heading of the photo gallery page. */}

        <div className="mb-[70px]">
          <h5
            className="text-center underline text-6xl font-serif font-bold text-[#3d594f] 
            responsive-heading"
          >
            ❁ Swahid Kamala Miri Trust Coupon Contest Results ❁
          </h5>
        </div>

        {/* *********************** */}
        {/* Displaying the results. */}

        <div
          className="border rounded-lg overflow-hidden cursor-pointer h-[auto] w-[auto] m-[20px]"
          style={{ boxShadow: "0 0 30px rgba(0,0,0,0.5)" }}
        >
          <img
            src="/newImages/couponResults.jpg"
            alt="photo"
            style={{ width: "100%", height: "100%" }}
            className="object-cover hover:scale-105 transition-scale duration-300"
          />

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

    .responsive-heading {
      font-size: 2.1rem;
      margin: 30px;
      line-height: 2;
    }

    /* */
  }

  /* */
`;
