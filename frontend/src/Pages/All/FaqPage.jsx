/* */

import React from "react";

import styled from "styled-components";

import PageNavigation from "../../Components/All/PageNavigation.jsx";

import Layout from "../../Components/All/Layout.jsx";

export default function FaqPage() {
  /* */

  return (
    /* */

    <Wrapper className="pb-[80px]">
      {/* */}

      <Layout title={"Faq-Page"}>
        {/* */}

        <PageNavigation title="Faq Page" />

        <h1 className="text-5xl text-center p-5 font-serif responsive-main-heading">
          Frequently Asked Questions
        </h1>

        <h4 className="ml-[60px] text-[30px] mb-3 responsive-heading">
          1. Who can participate?
        </h4>

        <p className="ml-[90px] font-semibold mb-5 mr-5 text-2xl leading-[25px] responsive-content">
          Any person whose aged is above 18 years can buy tickets for the
          lottery contest
        </p>

        <h4 className="ml-[60px] text-[30px] mb-3 responsive-heading">
          2. Is there any limitations to buy tickets?
          <span className="responsive-space"></span>
        </h4>

        <p className="ml-[90px] font-semibold mb-5 mr-5 text-2xl leading-[25px] responsive-content">
          No, there is no limitations everyone can buy as many tickets he or she
          wants
        </p>

        <h4 className="ml-[60px] text-[30px] mb-3 responsive-heading">
          3. What is a date of the contest?
          <span className="responsive-space"></span>
        </h4>

        <p className="ml-[90px] font-semibold mb-5 mr-5 text-2xl leading-[25px] responsive-content">
          The contest will be held in 15 August 2024 and the results will be
          live on our facebook page Tani Land news
        </p>

        <h4 className="ml-[60px] text-[30px] mb-3 mr-4 responsive-heading">
          4. What is the entry fee for this contest?
          <span className="responsive-space"></span>
        </h4>

        <p className="ml-[90px] font-semibold mb-5 mr-5 text-2xl responsive-content">
          The price of per ticket is Rs 100 only
        </p>

        <h4 className="ml-[60px] text-[30px] mb-3 responsive-heading">
          5. What is the format of the contest?
          <span className="responsive-space"></span>
        </h4>

        <p className="ml-[90px] font-semibold mb-[40px] mr-20 text-2xl leading-[25px] responsive-content">
          A spinning wheel will be used to form a price number. The spinning
          wheel will be rotated 7 times to form a 7 digit number <br /> which
          will be particular price number. For every spinning one number will be
          considered. If somehow the arrow of the wheel <br /> is exactly
          between two numbers then re-rotation of the wheel will be done.
        </p>

        <h4 className="ml-[60px] text-[30px] mb-3 responsive-heading">
          6. Can I cancel and buy the coupons again
          <span className="responsive-space"></span>
        </h4>

        <p className="ml-[90px] font-semibold mb-[40px] mr-15 text-2xl leading-[25px] responsive-content">
          Once the payment is confirmed for a particular coupon then you cannot
          cancel or buy the same coupon again
        </p>

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

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-heading {
      margin-left: 20px;
      margin-right: 10px;
      font-size: 2.6rem;
    }

    .responsive-content {
      font-size: 1.7rem;
      padding-top: 19px;
      margin-left: 14px;
      margin-right: 14px;
      line-height: 1.8;
    }

    .responsive-main-heading {
      font-size: 5rem;
      line-height: 1.2;
    }

    .responsive-space {
      margin-left: 40px;
    }

    /* */
  }

  /* */
`;
