/* */

import React, { useState, useEffect, useRef } from "react";

import styled from "styled-components";

import { NavLink } from "react-router-dom";

import ReactToPrint from "react-to-print";

import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { signOutUserSuccess } from "../../Redux/Actions/authActions.jsx";

let userId = localStorage.getItem("id");

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const UserMenu = () => {
  /* */

  /* ************************************************************ */
  /* Creating current date using new Date() method of Javascript. */

  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  var day = today.toLocaleDateString("en-US", options);

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  const componentRef = useRef();

  const [loading, setLoading] = useState(false);

  const [tickets, setTickets] = useState([]);

  const [bookNumbers, setBookNumbers] = useState([]);

  const [billingUser, setBillingUser] = useState("");

  const getAllTickets = async () => {
    /* */

    try {
      /* */

      setLoading(true);

      if (userId) {
        /* */

        const res = await fetch(
          `${VITE_SERVER_URL}/api/ticket/get-allTickets/${userId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.success === false) {
          /* */

          if (data.statusCode === 401) {
            /* */

            setLoading(false);

            dispatch(signOutUserSuccess());

            localStorage.clear();

            alert(
              "Your cookie is mismatched or expired. You are signing out of our account!"
            );

            toast.success("Successfully Logged Out");

            return;

            /* */
          } else {
            /* */

            toast.error(data.message);

            setLoading(false);

            return;

            /* */
          }

          /* */
        }

        setLoading(false);

        setTickets(data);

        /* */
      }

      /* Catching the error and displaying it. */
    } catch (error) {
      /* */

      toast.error("Something went wrong. Please try again later!");

      setLoading(false);

      /* */
    }

    /* */
  };

  const getAllBooks = async () => {
    /* */

    try {
      /* */

      setLoading(true);

      if (userId) {
        /* */

        const res = await fetch(
          `${VITE_SERVER_URL}/api/book/get-allBooks/${userId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.success === false) {
          /* */

          if (data.statusCode === 401) {
            /* */

            setLoading(false);

            dispatch(signOutUserSuccess());

            localStorage.clear();

            alert(
              "Your cookie is mismatched or expired. You are signing out of our account!"
            );

            toast.success("Successfully Logged Out");

            return;

            /* */
          } else {
            /* */

            toast.error(data.message);

            setLoading(false);

            return;

            /* */
          }

          /* */
        }

        setLoading(false);

        setBookNumbers(data);

        /* */
      }

      /* Catching the error and displaying it. */
    } catch (error) {
      /* */

      toast.error("Something went wrong. Please try again later!");

      setLoading(false);

      /* */
    }

    /* */
  };

  const getBillingAddress = async () => {
    /* */

    try {
      /* */

      setLoading(true);

      if (userId) {
        /* */

        const res = await fetch(
          `${VITE_SERVER_URL}/api/address/get-billingAddress/${userId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.success === false) {
          /* */

          if (data.statusCode === 401) {
            /* */

            setLoading(false);

            dispatch(signOutUserSuccess());

            localStorage.clear();

            alert(
              "Your cookie is mismatched or expired. You are signing out of our account!"
            );

            toast.success("Successfully Logged Out");

            return;

            /* */
          } else {
            /* */

            toast.error(data.message);

            setLoading(false);

            return;

            /* */
          }

          /* */
        }

        setBillingUser(data);

        setLoading(false);

        /* */
      }

      /* Catching the error and displaying it. */
    } catch (error) {
      /* */

      toast.error("Something went wrong. Please try again later!");

      setLoading(false);

      /* */
    }

    /* */
  };

  /* ***************************************************************************** */
  /* *************************   useEffect()      ******************************** */
  /* ***************************************************************************** */

  useEffect(() => {
    /* */

    getAllTickets();

    getAllBooks();

    /* */
  }, []);

  useEffect(() => {
    /* */

    getBillingAddress();

    /* */
  }, [userId]);

  /* ***************************************************************************** */
  /* *************************     return      *********************************** */
  /* ***************************************************************************** */

  return (
    /* */

    <Wrapper>
      <div className="text-center">
        {/* */}

        <h3 className="font-semibold uppercase mb-6 mt-6 text-gray-700 text-4xl responsive-heading">
          DASHBOARD
        </h3>

        <div className="flex flex-col gap-5 text-3xl mt-5">
          {/* */}

          <NavLink to="/dashboard/user/profile">
            <button
              className="text-bold text-3xl text-gray-100 bg-[#0e0c0d] py-[20px] px-7 rounded-lg 
              hover:opacity-80 mb-4 font-semibold font-sans w-[60%] responsive-button"
            >
              My Profile
            </button>
          </NavLink>

          <NavLink to="/dashboard/user/ticketsAndBooks">
            <button
              className="text-bold text-3xl text-gray-100 bg-[#0e0c0d] py-[20px] px-7 rounded-lg 
              hover:opacity-80 mb-4 font-semibold font-sans w-[60%] responsive-button"
            >
              My Coupons
            </button>
          </NavLink>

          {/* ************************************************ */}
          {/* Create button to download the coupons and books. */}

          {(tickets.length > 0 || bookNumbers.length > 0) &&
          billingUser.length > 0 ? (
            <NavLink to="">
              <ReactToPrint
                trigger={() => (
                  <button
                    onClick={() => setLoading(true)}
                    className="text-bold text-3xl text-gray-100 bg-[#0e0c0d] py-[20px] px-7 rounded-lg 
                    hover:opacity-80 mb-4 font-semibold font-sans w-[80%] responsive-button1"
                  >
                    {loading ? "Loading..." : "Download Coupon"}
                  </button>
                )}
                content={() => componentRef.current}
              />
            </NavLink>
          ) : (
            ""
          )}

          {/* ************************************ */}
          {/* Contents of the pdf to be displayed. */}

          <div className="pdfContent">
            <div className="mx-[17px] " ref={componentRef}>
              {/* */}

              <div className="pt-[30px]">
                {/* */}

                <img
                  src="/documents/couponPad.jpg"
                  alt="contactus"
                  style={{ width: "100%", height: "100%" }}
                  className="rounded-3xl text-center responsive-image"
                />

                <div className="mt-[10px] mb-[20px]">
                  <span
                    className="text-4xl font-sans font-semibold ml-[45px] text-[#69124A] mt-3 mb-3 
                    responsive-heading"
                  >
                    Your Receipt
                  </span>

                  <span className="text-[19px] font-sans font-semibold ml-[290px]">
                    Date = {day}
                  </span>
                </div>

                {/* */}
              </div>

              <hr className="mb-[10px]" />

              <div
              // style={{
              //   backgroundImage: "url(/mainImages/couponPad2.jpg)",
              //   backgroundRepeat: "no-repeat",
              //   backgroundSize: "cover",
              //   width: "auto",
              //   marginTop: "-45px",
              //   fontSize: "20px",
              // }}
              >
                {/* */}

                <div className="">
                  {/* */}

                  {billingUser
                    ? billingUser.map((billingUser, index) => {
                        return (
                          /* */

                          <div key={index}>
                            {/* */}

                            <div className="grid gap-3 mt-4 mb-6">
                              {/* */}

                              <p className="text-[17px] font-sans font-semibold text-[#2F2440] mt-4">
                                <span> Buyer ID </span>

                                <span className="text-[28px] mx-3 mt-[-8px]">
                                  {" "}
                                  →{" "}
                                </span>

                                <span className="uppercase">
                                  {currentUser._id}
                                </span>
                              </p>

                              <p className="text-[17px] font-sans font-semibold text-[#2F2440] mt-4">
                                <span> Buyer Name </span>

                                <span className="text-[28px] mx-3 mt-[-8px]">
                                  {" "}
                                  →{" "}
                                </span>

                                <span className="uppercase">
                                  {billingUser.firstName} {billingUser.lastName}
                                </span>
                              </p>

                              {billingUser.email ? (
                                <p className="text-[17px] font-sans font-semibold text-[#2F2440] mt-4">
                                  <span> Buyer Email </span>

                                  <span className="text-[28px] mx-3 mt-[-8px]">
                                    →
                                  </span>

                                  <span> {billingUser.email} </span>
                                </p>
                              ) : (
                                ""
                              )}

                              <p className="text-[17px] font-sans font-semibold text-[#2F2440] mt-4">
                                <span> Buyer Phone </span>

                                <span className="text-[28px] mx-3 mt-[-8px]">
                                  {" "}
                                  →{" "}
                                </span>

                                <span> {billingUser.phone} </span>
                              </p>

                              <p className="text-[17px] font-sans font-semibold text-[#2F2440] mt-4">
                                <span> Buyer Address </span>

                                <span className="text-[28px] mx-3 mt-[-8px]">
                                  {" "}
                                  →{" "}
                                </span>

                                <span className="mx-3 px-3">
                                  {billingUser.streetAddress},{" "}
                                  {billingUser.pincode}
                                </span>

                                <span>
                                  {billingUser.city}, ({billingUser.state})
                                </span>
                              </p>

                              {/* */}
                            </div>

                            {/* */}
                          </div>
                        );
                      })
                    : ""}

                  {tickets.length > 0
                    ? tickets?.map((tickets, index) => {
                        return (
                          <div
                            className="font-sans mt-1 mr-7 responsive-row"
                            key={index}
                          >
                            <p className="text-[18px] font-sans font-semibold text-[#2F2440] mt-4">
                              <span> Buyer Individual Coupon Numbers </span>

                              <span className="text-[28px] mx-3 mt-[-8px]">
                                →
                              </span>

                              {tickets.ticketNumbers.map(
                                (ticketNumbers, index) => {
                                  return (
                                    <span className="text-[18px] mx-3 font-sans font-bold mb-3">
                                      {ticketNumbers.tickets.join("  ")}
                                    </span>
                                  );
                                }
                              )}
                            </p>
                          </div>
                        );
                      })
                    : ""}

                  {bookNumbers.length > 0
                    ? bookNumbers?.map((books, index) => {
                        return (
                          <div
                            className="text-[17px] font-sans font-semibold text-[#69124A]"
                            key={index}
                          >
                            {/* */}

                            <h3 className="pb-3 text-[20px] text-center mt-[40px] font-sans font-semibold">
                              ✸ Buyer book numbers along with the coupons
                              numbers ✸
                            </h3>

                            {/* Book Numbers */}

                            <p className="mr-[14px] my-[17px] ">
                              {/* */}

                              <span className="font-sans font-bold text-[20px] text-[#2F2440]">
                                Book numbers
                              </span>

                              <span className="text-[28px] mx-3 mt-[-8px]">
                                →
                              </span>

                              {books.bookNumbers.map((bookNumbers, index) => {
                                return (
                                  <span className="font-mono mb-8">
                                    <span
                                      className="text-[18px] font-sans font-bold ml-4 mb-3"
                                      key={index}
                                    >
                                      {bookNumbers.books.join("  ")}
                                    </span>
                                  </span>
                                );
                              })}

                              {/* */}
                            </p>

                            {/* Coupon numbers of the above book numbers */}

                            <p className="">
                              {/* */}

                              <span className="mt-4 font-sans font-bold text-[20px] text-[#2F2440]">
                                Coupon numbers of the above book numbers
                              </span>

                              <span className="text-[28px] mx-3 mt-3">→</span>

                              {books.ticketsOfTheBookNumbers.map(
                                (ticketNumbers, index) => {
                                  return (
                                    <div className="my-3">
                                      <p
                                        className="text-[14px] font-sans pr-[10px]"
                                        key={index}
                                      >
                                        {ticketNumbers.tickets.join("  ") +
                                          "  "}
                                      </p>
                                    </div>
                                  );
                                }
                              )}

                              {/* */}
                            </p>

                            {/* */}
                          </div>
                        );
                      })
                    : ""}

                  {/* */}
                </div>

                <hr className="my-[30px] " />

                <div className="flex ml-[30px]">
                  {/* */}

                  <img
                    src="/newImages/stamp1.jpg"
                    alt="contactus"
                    style={{ width: "100px", height: "100px" }}
                    className="rounded-full mt-3 text-center responsive-image"
                  />

                  <p className="text-[23px] mt-[20px] font-bold font-sans ml-[10px]">
                    Thank You <br />
                    Regards
                  </p>

                  {/* */}
                </div>

                {/* */}
              </div>

              {/* */}
            </div>
          </div>

          {/* */}
        </div>

        {/* */}
      </div>
    </Wrapper>

    /* */
  );

  /* */
};

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
      font-size: 3rem;
    }

    .responsive-button {
      font-size: 2rem;
      margin-right: 15px;
      padding: 20px;
    }

    .responsive-button1 {
      font-size: 2rem;
      margin-right: 15px;
      width: 60%;
    }

    /* */
  }

  /* */
`;
