/* */

import React, { useState, useEffect, useRef } from "react";

import styled from "styled-components";

import Layout from "../../Components/Layout.jsx";

import PageNavigation from "../../Components/PageNavigation.jsx";

import ReactToPrint from "react-to-print";

import { Link, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import { signOutUserSuccess } from "../../Redux/Actions/authActions.jsx";

let SessionId = localStorage.getItem("id");

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function TransactionPage() {
  /* */

  const dispatch = useDispatch();

  const location = useLocation();

  const clearLocalStorage = () => {
    /* */

    if (location.state) {
      /* */

      localStorage.removeItem("tickets");

      /* */
    }

    /* */
  };

  const componentRef = useRef();

  const { currentUser } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);

  const [tickets, setTickets] = useState([]);

  const [bookNumbers, setBookNumbers] = useState([]);

  const [indexNumber, setIndexNumber] = useState("");

  /* Creating current date using new Date() method of Javascript. */

  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  var day = today.toLocaleDateString("en-US", options);

  const getAllTickets = async () => {
    /* */

    try {
      /* */

      setLoading(true);

      if (SessionId) {
        /* */

        const res = await fetch(
          `${VITE_SERVER_URL}/api/ticket/get-allTickets/${SessionId}`,
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

        setTickets(data);

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

  const getAllBooks = async () => {
    /* */

    try {
      /* */

      setLoading(true);

      if (SessionId) {
        /* */

        const res = await fetch(
          `${VITE_SERVER_URL}/api/book/get-allBooks/${SessionId}`,
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

  /* ******************************************************************* */
  /* *******************  useEffect() hooks  *************************** */
  /* ******************************************************************* */

  useEffect(() => {
    /* */

    clearLocalStorage();

    /* */
  }, [location.state]);

  useEffect(() => {
    /* */

    getAllTickets();

    getAllBooks();

    /* */
  }, [indexNumber]);

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  return (
    /* */

    <Wrapper>
      <Layout title={"Transaction-Page"}>
        {/* */}

        <PageNavigation title="Success Transaction" />

        {/* ************************************ */}
        {/* Heading of the payment success page. */}

        <div className="">
          <h1 className="text-center text-4xl p-5 text-green-600 ">
            Your all successfull transaction.
          </h1>

          <p className="text-center text-3xl mb-[50px]">
            Thanks for joining with us.
          </p>
        </div>

        {/* ************************************ */}
        {/* Contents of the pdf to be displayed. */}

        <div className="">
          {/* */}

          <div className="pdfContent">
            <div className="ml-[30px]" ref={componentRef}>
              {/* */}

              {/* ****************** */}
              {/* PDF content data's */}

              <div className="">
                <img
                  src="/newImages/logo.png"
                  alt="contactus"
                  style={{ width: "100px", height: "100px" }}
                  className="rounded-3xl text-center responsive-image"
                />

                <p className="text-3xl font-serif text-[#69124A] mt-3 mb-3 responsive-heading">
                  Your Receipt
                </p>
              </div>

              <div className="text-2xl ml-[490px] mt-[-100px] mb-[40px] responsive-company-details">
                {/* */}

                <p className="mb-3 font-mono">SKMT Trust</p>

                <p>
                  <span className="font-mono pb-8">
                    Contact Us: skmt-trust.com || 70863-67457
                  </span>

                  <br />

                  <span className="ml-[114px] font-mono responsive-company-details1">
                    skmttrust23@gmail.com
                  </span>
                </p>

                <p className="italic font-mono mt-4">
                  Golaghat, (Assam) India 785621
                </p>

                <p className="text-2xl mt-4 font-mono">Date = {day}</p>

                {/* */}
              </div>

              <hr />

              <div className="ml-[40px] mb-4 mt-4">
                <p className="text-2xl font-mono text-[#69124A] mt-4">
                  Buyer Name ={" "}
                  {currentUser.firstName + " " + currentUser.lastName}
                </p>

                <p className="text-2xl font-mono text-[#69124A] mt-4">
                  Buyer Email = {currentUser.email}
                </p>

                {currentUser.phone ? (
                  <p className="text-2xl font-mono text-[#69124A] mt-4">
                    Buyer Phone = {currentUser.phone}
                  </p>
                ) : (
                  ""
                )}

                {tickets.length > 0
                  ? tickets?.map((tickets, index) => {
                      return (
                        <div
                          className="flex text-2xl font-sans text-[#69124A] mt-1 responsive-row"
                          key={index}
                        >
                          <p className="text-2xl font-sans text-[#69124A] mt-4">
                            Buyer Coupon Numbers =
                            {tickets.ticketNumbers.map(
                              (ticketNumbers, index) => {
                                return (
                                  <span className="text-2xl ml-4 font-bold font-mono mb-3">
                                    {ticketNumbers.ticket}
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
                          className="flex text-2xl font-sans text-[#69124A] mt-1 responsive-row"
                          key={index}
                        >
                          <p className="text-2xl font-sans text-[#69124A] mt-4">
                            Buyer Book Numbers =
                            {books.bookNumbers.map((bookNumbers, index) => {
                              return (
                                <span className="text-2xl ml-4 font-bold font-mono mb-3">
                                  {bookNumbers.book.join(" ")}
                                </span>
                              );
                            })}
                          </p>
                        </div>
                      );
                    })
                  : ""}

                {/* */}
              </div>

              <hr className="mb-4" />

              <div className="ml-[80px] pb-6">
                {/* */}

                {/* <p className="text-2xl font-sans text-[#69124A] mt-4">
                  Shipping Charges = ₹ 0
                </p>

                {tickets.length > 0 ? (
                  <div>
                    {tickets?.map((ticket, index) => {
                      return (
                        <div
                          className="flex text-2xl font-sans text-[#69124A] mt-1"
                          key={index}
                        >
                          <p className="text-2xl font-sans text-[#69124A] mt-4">
                            Total Amount paid = ₹ {ticket.amount[indexNumber]}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )} */}

                <img
                  src="/newImages/stamp1.jpg"
                  alt="contactus"
                  style={{ width: "100px", height: "100px" }}
                  className="rounded-full mt-3 text-center responsive-image"
                />

                <p className="text-2xl font-bold mt-3 ml-[10px]">
                  Thank You <br />
                  Regards
                </p>

                {/* */}
              </div>

              {/* */}
            </div>
          </div>

          {/* */}
        </div>

        {/* ********************************** */}
        {/* Create button to go the home-page. */}

        <div
          className="flex justify-center p-3 py-4 gap-3 bg-slate-700 text-white border 
                         rounded-lg hover:opacity-250 mb-60 uppercase w-[30%] mx-auto"
        >
          <Link to="/" className="text-2xl font-bold ">
            Go Back
          </Link>
        </div>

        {/* ************************************** */}
        {/* Create button to download the tickets. */}

        <div className="ml-[430px] mt-[-40px] responsive-button1">
          {tickets.length > 0 ? (
            <div>
              {tickets?.map((tickets) => {
                return (
                  <div className="grid responsive-row">
                    {tickets.ticketNumbers.map((ticket, index) => {
                      return (
                        <div>
                          <div className="flex text-3xl ml-4 font-bold font-mono mb-3">
                            <h3>Transaction number {index + 1} : </h3>

                            <button onClick={() => setIndexNumber(index)}>
                              <ReactToPrint
                                trigger={() => (
                                  <button
                                    className="text-bold text-2xl text-gray-300 bg-gray-600 py-4 px-4 rounded-lg 
                                    hover:opacity-80 mb-4 font-bold ml-4 mt-[-10px]"
                                  >
                                    <span
                                      onClick={() =>
                                        displayParticularTicket(index)
                                      }
                                    >
                                      Download Ticket
                                    </span>
                                  </button>
                                )}
                                content={() => componentRef.current}
                              />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>

        {/* */}
      </Layout>
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

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-heading {
      margin-left: -40px;
    }

    .responsive-image {
      margin-left: -40px;
    }

    .responsive-company-details {
      margin: auto;
      margin-top: 20px;
      margin-bottom: 10px;
    }

    .responsive-company-details1 {
      margin-left: 80px;
      padding-top: 15px;
    }

    .responsive-button {
      margin: auto;
      margin-left: 140px;
    }

    .responsive-button1 {
      margin: auto;
      margin-left: 20px;
    }

    /* */
  }

  /* */
`;
