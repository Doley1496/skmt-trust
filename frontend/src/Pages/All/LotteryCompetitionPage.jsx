/* */

import React from "react";

import Layout from "../../Components/All/Layout.jsx";

import PageNavigation from "../../Components/All/PageNavigation.jsx";

import styled from "styled-components";

import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";

export default function LotteryPage() {
  /* */

  const { currentUser } = useSelector((state) => state.user);

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  return (
    /* */

    <Wrapper>
      {/* */}

      <div className="mb-5 mt-[-107px] responsive-pagination">
        <PageNavigation title="Coupon" />
      </div>

      <Layout title={"Coupon-Page"}>
        {/* */}

        <div
          className="pb-[50px] justify-center mx-auto bg-fixed fonts bg-[#e9b7b7]
          mt-[-40px] mb-[-170px] responsive-competition-top-bottom"
        >
          {/* */}

          {/* *************** */}
          {/* heading details */}

          <div className="text-2xl pt-[60px] font-semibold font-sans">
            {/* */}

            {/* ****************************** */}
            {/* Heading and the ticket images. */}

            <div>
              <h3
                className="text-[30px] font-semibold font-sans mb-[45px] leading-10 text-center 
                responsive-main-heading"
              >
                Welcome to the lucky draw coupon on behalf of SKMT Trust
              </h3>

              {/* <img src="/newImages/ticket2.jpg" alt="ticket" className="mb-5" />

              <img src="/newImages/ticket1.jpg" alt="ticket" className="mb-5" /> */}

              <img
                src="/mainImages/mainTicket.jpg"
                alt="ticket"
                className="mb-5"
              />

              <p className="text-center text-3xl mt-5 font-semibold font-sans responsive-text0">
                We are selling the coupons both offline and online for our
                members and well wishers
              </p>

              <p className="text-center text-3xl mt-5 mb-5 font-semibold font-sans">
                <br /> Price Per Coupon = Rs 100
              </p>
            </div>

            {/* ************************** */}
            {/* Coupons and Books details. */}

            <div className="text-center text-3xl">
              {/* */}

              <p className="mt-4">
                There are total 5,00,004 coupons for online
              </p>

              <p className="mt-4 leading-10 responsive-text">
                According to your choice you can select any coupons that are
                available
              </p>

              <p className="text-3xl mt-[30px] ml-[20px] font-bold text-[#800000] mb-4 ">
                <span className="text-4xl"> ➨ </span> For online Coupons numbers
                starts from 2012342 to 2512345
              </p>

              <p className="text-3xl ml-[20px] mb-[30px] font-bold text-[#800000]">
                <span className="text-4xl"> ➨ </span> For online Book numbers
                starts from 184567 to 226233
              </p>

              <p className="text-3xl ml-[20px] mt-4 font-bold text-[#800000]">
                Ex: The 1st book number is 184567
              </p>

              <p className="text-3xl ml-[20px] mt-4 font-bold text-[#800000]">
                The 2nd book number will be 184568
              </p>

              <p className="text-3xl ml-[20px] mt-4 font-bold text-[#800000]">
                The 3rd book number will be 184569
              </p>

              <p className="text-3xl ml-[20px] mt-4 font-bold text-[#800000]">
                And so on it continues to the last book number 226233
              </p>

              {/* */}
            </div>

            {/* ******************************** */}
            {/* Coupons and Books offer details. */}

            <div className="text-2xl mt-[40px] text-[#800000] text-center">
              {/* */}

              <p className="m-3 mb-5 text-3xl font-sans font-bold leading-10 ">
                ✹ You can buy individual coupons or a whole book of coupons
              </p>

              <div
                className="m-3 pl-7  text-2xl font-sans font-semibold text-center leading-10
                           responsive-star-content"
              >
                <p className="mb-4">
                  ✹ If you buy 10 to 19 tickets individually then you will get a
                  discount of Rs 200.
                </p>

                <p className="mb-4">
                  ✹ If you buy 20 to 29 tickets individually then you will get a
                  discount of Rs 400.
                </p>

                <p className="mb-4">
                  ✹ If you buy 30 to 39 tickets individually then you will get a
                  discount of Rs 600.
                </p>

                <p className="mb-4">
                  ✹ If you buy more then 39 tickets individually then you will
                  get a discount of Rs 1000.
                </p>
              </div>

              <div className="text-[#72435C] font-semibold font-sans responsive-text">
                <p className="m-3 "> 1 Book = 12 Coupons</p>

                <p className="m-3">
                  Price of 1 Book = <del>Rs 1200</del>
                  <span className="ml-3">Rs 1000</span>
                </p>
              </div>

              <p className="m-3 pl-4 leading-10 responsive-star-content">
                ✹ We will also organize a mini contest with the cover(book)
                number of every books.
                <br />
                <span className="pt-7">
                  So, if you buy a book you will gain to join the mini contest
                  and also you will get a Rs 200 discount.
                </span>
              </p>

              <div>
                <p className="mt-5">
                  <span className="text-center leading-10 responsive-text">
                    Ex : The Book number 184567 contains the following coupon
                    numbers :
                  </span>

                  <br />
                </p>

                <p className="mt-5">
                  <span className="text-center leading-10 responsive-text">
                    2012342 , 2012343, 2012344, 2012345, 2012346, 2012347,
                    2012348, 2012349, 2012350, 2012351, 2012352, 2012353,
                  </span>
                </p>

                <p className="mt-5 leading-10 responsive-text">
                  With the Book number 184567 you can join the mini contest
                </p>
              </div>

              {/* */}
            </div>

            {/* */}
          </div>

          {/* ********************* */}
          {/* Steps to buy coupon : */}

          <div className="text-2xl p-5 m-3 font-semibold font-sans">
            {currentUser ? (
              <>
                <h1 className="text-center text-3xl mt-[40px] mb-2 font-bold font-sans">
                  Make your payment to join the competition
                </h1>
              </>
            ) : (
              <>
                <h1 className="text-center text-3xl mt-[40px]">
                  Please follow the below steps to buy your Coupons.
                </h1>

                <div className="text-center font-sans font-semibold">
                  <p className="text-center text-3xl mt-5">
                    1 : Login to your account
                  </p>

                  <p className="text-center text-3xl mt-5 ml-[27px] responsive-steps1">
                    2 : Add your billing address
                  </p>

                  <p className="text-center text-3xl mt-5 ml-[-26px] responsive-steps2 ">
                    3 : Make your payment
                  </p>
                </div>
              </>
            )}
          </div>

          {/* *************************************** */}
          {/* Button for registration or buy coupon : */}

          <div className="mb-[60px] pb-[80px]">
            {currentUser ? (
              <NavLink
                to="/buyingPage"
                style={{
                  textAlign: "center",
                  display: "block",
                }}
              >
                <button
                  className="py-[20px] px-4 bg-[#800000] text-[#d8d0d2] rounded-lg hover:opacity-75 
                  disabled:opacity-90 w-[30%] mx-auto font-sans font-bold text-3xl text-center
                 hover:text-indigo-400 responsive-button"
                >
                  Buy your Coupon
                </button>
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                style={{
                  textAlign: "center",
                  display: "block",
                }}
              >
                <button
                  className="py-[20px] px-4 bg-[#800000] text-[#d8d0d2] rounded-lg hover:opacity-75 
                  disabled:opacity-90 w-[30%] mx-auto font-sans font-bold text-4xl text-center
                 hover:text-indigo-400 responsive-button"
                >
                  Login
                </button>
              </NavLink>
            )}
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

  padding: 9rem 0;

  /* */

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-competition-top-bottom {
      margin: auto;
      margin-top: -25px;
      margin-bottom: -120px;
    }

    .responsive-pagination {
      margin-top: -70px;
    }

    .responsive-main-heading {
      line-height: 1.4;
      font-size: 2.4rem;
    }

    .responsive-heading {
      padding-top: 5px;
      margin-top: 10px;
    }

    .responsive-text0 {
      font-size: 2rem;
      line-height: 1.4;
    }

    .responsive-text {
      font-size: 1.9rem;
      margin-bottom: 15px;
    }

    .responsive-text1 {
      font-size: 1.7rem;
      margin: 0px;
      padding-bottom: 30px;
    }

    .responsive-star-content {
      font-size: 1.9rem;
      padding-top: 8px;
      padding-left: 14px;
      padding-bottom: 20px;
    }

    .responsive-star-content1 {
      font-size: 1.9rem;
      padding-top: 8px;
      padding-left: -5px;
      padding-bottom: 20px;
    }

    .responsive-steps1 {
      margin-left: 18px;
    }

    .responsive-steps2 {
      margin-left: -18px;
    }

    .responsive-steps3 {
      margin-left: 30px;
    }

    .responsive-button {
      width: 70%;
      padding: 17px;
      font-size: 2.7rem;
    }

    /* */
  }

  /* */
`;
