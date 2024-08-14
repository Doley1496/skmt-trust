/* */

import React, { useState, useEffect, useRef } from "react";

import styled from "styled-components";

import Layout from "../../Components/All/Layout.jsx";

import PageNavigation from "../../Components/All/PageNavigation.jsx";

import ReactToPrint from "react-to-print";

import { Link, NavLink, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import { signOutUserSuccess } from "../../Redux/Actions/authActions.jsx";

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

let userId = localStorage.getItem("id");

export default function PaymentSuccess() {
  /* */

  const dispatch = useDispatch();

  const location = useLocation();

  const componentRef = useRef();

  const [tickets, setTickets] = useState([]);

  const [bookNumbers, setBookNumbers] = useState([]);

  const { currentUser } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);

  const [billingUser, setBillingUser] = useState("");

  const [amount, setAmount] = useState("");

  const [isPaid, setIsPaid] = useState("");

  const [orderId, setOrderId] = useState("");

  const [paymentId, setPaymentId] = useState("");

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

  const transactionDetails = () => {
    /* */

    if (location.state) {
      /* */

      setIsPaid(location.state.isPaid);

      setAmount(location.state.a);

      setPaymentId(location.state.payment_id);

      setOrderId(location.state.order_id);

      /* */
    }

    /* */
  };

  const clearLocalStorage = () => {
    /* */

    if (location.state) {
      /* */

      localStorage.removeItem("tickets");

      localStorage.removeItem("allTicketNumbers");

      localStorage.removeItem("allBookNumbers");

      localStorage.removeItem("dividedBooks");

      /* */
    }

    /* */
  };

  const getAllTickets = async () => {
    /* */

    try {
      /* */

      if (userId) {
        /* */

        setLoading(true);

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

      if (userId) {
        /* */

        setLoading(true);

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

      if (userId) {
        /* */

        setLoading(true);

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

  /* ******************************************************************* */
  /* *******************  useEffect() hooks  *************************** */
  /* ******************************************************************* */

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

  useEffect(() => {
    /* */

    clearLocalStorage();

    /* */
  }, [location.state]);

  useEffect(() => {
    /* */

    transactionDetails();

    /* */
  }, [location.state]);

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  return (
    /* */

    <Wrapper>
      <Layout title={"Coupon"}>
        {/* */}

        <PageNavigation title="Payment Success" />

        {/* *********************************************** */}
        {/* Displaying the transaction details to the user. */}

        {location.state ? (
          <div className="text-[#581845] font-semibold font-sans">
            {/* */}

            <div className="">
              {/* */}

              <img
                src="/newImages/tick.webp"
                alt=""
                className="h-[80px] w-[80px] justify-center align-middle text-center mx-auto mt-5"
              />

              <h1 className="text-center text-4xl p-5 text-green-600 ">
                Your Payment is successfull !
              </h1>

              <p className="text-center text-3xl mb-3">
                All the best for the Lucky Draw !
              </p>

              <p className="text-center text-3xl mb-[30px]">
                Thanks for joining with us.
              </p>

              <p className="text-center text-3xl mx-[30px] mt-[20px] leading-10 mb-3 font-semibold font-sans">
                Your payment has been successfully received as shown. Please
                quote your Payment ID for any queries pertaining to this
                transaction. For any assistance please call our customer contact
                numbers.
              </p>

              {/* */}
            </div>

            <h1 className="text-3xl text-center font-semibold font-sans mt-[40px]">
              Transaction Details
            </h1>

            <hr className="my-[20px] w-[60%] mx-auto" />

            <div className="text-center my-[20px]">
              {/* */}

              <p className="text-2xl font-semibold font-sans my-4">
                Transaction Date : {day}
              </p>

              <hr className="my-[30px] w-[40%] mx-auto" />

              <p className="text-2xl font-semibold font-sans my-4">
                Transaction Order ID : {orderId}
              </p>

              <hr className="my-[30px] w-[40%] mx-auto" />

              <p className="text-2xl font-semibold font-sans my-4">
                Transaction Payment ID : {paymentId}
              </p>

              <hr className="my-[30px] w-[40%] mx-auto" />

              <p className="text-2xl font-semibold font-sans my-4">
                Transaction Amount : {amount}
              </p>

              <hr className="my-[30px] w-[40%] mx-auto" />

              <p className="text-2xl font-semibold font-sans my-4">
                Transaction Status :{" "}
                <span className="bg-[#478C5C] px-3 py-2 rounded-lg text-gray-100 font-semibold font-sans">
                  {isPaid === true ? "Success" : "Failed"}
                </span>
              </p>

              {/* */}
            </div>

            <hr className="my-[30px] w-[60%] mx-auto font-bold text-[40px]" />

            {/* */}
          </div>
        ) : (
          ""
        )}

        {/* **************************************** */}
        {/* Button to display the coupons and books. */}

        <div className="mt-[70px]">
          <NavLink to={currentUser ? "/dashboard/user/ticketsAndBooks" : ""}>
            <button
              className="flex text-center text-bold text-3xl text-gray-900 bg-[#a0c065] py-[24px] px-4 
              rounded-lg hover:opacity-80 mb-4 mx-auto font-semibold font-sans"
              style={{
                textAlign: "center",
                display: "block",
              }}
            >
              To view your coupons click here
            </button>
          </NavLink>
        </div>

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
                            ✸ Buyer book numbers along with the coupons numbers
                            ✸
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
                                      {ticketNumbers.tickets.join("  ") + "  "}
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

        {/* ************************************************ */}
        {/* Create button to download the coupons and books. */}

        {(tickets.length > 0 || bookNumbers.length > 0) &&
        billingUser.length > 0 ? (
          <NavLink
            to=""
            className="pt-6 mb-6"
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            <ReactToPrint
              trigger={() => (
                <button
                  onClick={() => setLoading(true)}
                  className="text-bold text-3xl text-gray-100 bg-[#900C3F] py-[20px] px-4 rounded-lg   
                  mx-auto hover:opacity-80 hover:bg-[#3B0918] font-semibold font-sans w-[20%] mb-4
                  responsive-button"
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

        {/* ***************************** */}
        {/* A button to go the home page. */}

        <div
          className="pt-6 mb-[70px]"
          style={{
            textAlign: "center",
            display: "block",
          }}
        >
          <Link to="/" className="text-2xl font-bold ">
            <button
              className="text-bold text-3xl text-gray-100 bg-[#0e0c0d] py-[20px] px-7 rounded-lg 
              hover:opacity-80 mb-4 font-semibold font-sans w-[20%] responsive-button"
            >
              Go Back
            </button>
          </Link>
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

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-heading {
      margin-left: -40px;
    }

    .responsive-image {
      margin-left: -40px;
    }

    .responsive-company-details1 {
      margin-left: 80px;
      padding-top: 15px;
    }

    .responsive-button {
      width: 55%;
      padding: 17px;
    }

    /* */
  }

  /* */
`;
