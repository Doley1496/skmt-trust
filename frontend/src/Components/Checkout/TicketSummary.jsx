/* */

import React, { useState, useEffect } from "react";

import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import { Box, Button, Grid } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { signOutUserSuccess } from "../../Redux/Actions/authActions.jsx";

import AddressCard from "./AddressCard.jsx";

// let userId = localStorage.getItem("id");

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function TicketSummary() {
  /* */

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const userId = currentUser._id;

  const [billingUser, setBillingUser] = useState("");

  const [billingUserAddressLength, setBillingUserAddressLength] = useState("");

  const [loading, setLoading] = useState(false);

  const [tickets, setTickets] = useState([]);

  const [grandTotal, setGrandTotal] = useState("");

  const [discount, setDiscount] = useState("");

  const [amount, setAmount] = useState("");

  const [ticketPaymentDetails, setTicketPaymentDetails] = useState("");

  const [number_of_payments, setNumberOfPayments] = useState("");

  const addressLength = () => {
    /* */

    if (billingUser) {
      setBillingUserAddressLength(billingUser.length);
    }

    /* */
  };

  const grandTotalAmountAndDiscount = () => {
    /* */

    try {
      /* */

      if (tickets.length < 10) {
        setGrandTotal(100 * tickets.length);
        setAmount(100 * tickets.length);
        setDiscount(0);
      }

      if (tickets.length >= 10) {
        setGrandTotal(100 * tickets.length - 200);
        setAmount(100 * tickets.length - 200);
        setDiscount(200);
      }

      if (tickets.length >= 20) {
        setGrandTotal(100 * tickets.length - 400);
        setAmount(100 * tickets.length - 400);
        setDiscount(400);
      }

      if (tickets.length >= 30) {
        setGrandTotal(100 * tickets.length - 600);
        setAmount(100 * tickets.length - 600);
        setDiscount(600);
      }

      if (tickets.length >= 40) {
        setGrandTotal(100 * tickets.length - 1000);
        setAmount(100 * tickets.length - 1000);
        setDiscount(1000);
      }

      /* */
    } catch (error) {
      /* */

      toast.error(
        "Something went wrong! Please refresh the page or try again after some time."
      );

      /* */
    }

    /* */
  };

  const displayTicketsRazorpay = async (amount) => {
    /* */

    if (billingUserAddressLength === 1) {
      /* */

      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onerror = () => {
        alert("Razorpay SDK failed to load. Are you online?");
      };

      script.onload = async () => {
        /* */

        try {
          /* */

          setLoading(true);

          const {
            data: { order },
          } = await axios.post(`${VITE_SERVER_URL}/api/payment/create-order`, {
            amount,
          });

          const {
            data: { razorpayApiKey },
          } = await axios.get(
            `${VITE_SERVER_URL}/api/payment/getRazorpayKeyId`
          );

          const options = {
            key: razorpayApiKey,
            amount: order.amount,
            currency: order.currency,
            name: "SKMT",
            description: "Lucky Coupon Contest",
            image: "/newImages/logo.png",
            order_id: order.id,

            handler: async function (response) {
              /* */

              try {
                /* */

                const res = await fetch(
                  `${VITE_SERVER_URL}/api/payment/ticketPaymentVerification`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },

                    body: JSON.stringify({
                      razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_order_id: response.razorpay_order_id,
                      razorpay_signature: response.razorpay_signature,

                      numberOfPayments: 1,
                      amount,
                      userId: userId,
                      ticketNumbers: JSON.parse(
                        localStorage.getItem("tickets")
                      ),
                    }),

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

                    navigate("/paymentFail");

                    return;

                    /* */
                  }

                  /* */
                }

                toast.success("Payment Successfull");

                navigate("/paymentSuccess", {
                  state: {
                    a: data.amount,
                    payment_id: data.razorpay_payment_id,
                    order_id: data.razorpay_order_id,
                    isPaid: data.isPaid,
                  },
                });

                localStorage.removeItem("tickets");

                /* */
              } catch (error) {
                /* */

                console.log(error);

                navigate("/paymentFail");

                /* */
              }

              /* */
            },

            prefill: {
              id: currentUser ? currentUser._id : "",
              name: currentUser
                ? currentUser.firstName + " " + currentUser.lastName
                : "",
              email: currentUser ? currentUser.email : "",
              contact: currentUser ? currentUser.phoneNumber : "",
            },

            notes: {
              address:
                "Mirang Akum Veterinary Road Arengapara Milon Nagar Golaghat (Assam)",
            },

            theme: {
              color: "#3399cc",
            },

            /* */
          };

          setLoading(false);

          const razor = new window.Razorpay(options);

          razor.open();

          /* */
        } catch (error) {
          /* */

          alert(error);

          setLoading(false);

          /* */
        }

        /* */
      };

      document.body.appendChild(script);

      /* */
    } else {
      /* */

      toast.error("Please add your billing address to make payment");

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

      setLoading(false);

      console.log(error);

      /* */
    }

    /* */
  };

  const getTicketPaymentDetails = async () => {
    /* */

    try {
      /* */

      setLoading(true);

      if (userId) {
        /* */

        const res = await fetch(
          `${VITE_SERVER_URL}/api/payment/get-ticket-payment-details/${userId}`,
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

        setTicketPaymentDetails(data);

        setLoading(false);

        /* */
      }

      /* Catching the error and displaying it. */
    } catch (error) {
      /* */

      setLoading(false);

      console.log(error);

      /* */
    }

    /* */
  };

  /* ************************************************************************************** */
  /* ******************************** useEffect() hooks *********************************** */
  /* ************************************************************************************** */

  /* ********************************************************************* */
  /* Getting and setting the tickets in the local-storage in initial-time. */

  useEffect(() => {
    /* */

    const data = JSON.parse(localStorage.getItem("tickets"));

    if (data) {
      /* */

      setTickets(data);

      /* */
    } else {
      /* */

      return [];

      /* */
    }

    /* */
  }, []);

  useEffect(() => {
    /* */

    localStorage.setItem("tickets", JSON.stringify(tickets));

    /* */
  }, [tickets]);

  useEffect(() => {
    /* */

    grandTotalAmountAndDiscount();

    /* */
  }, [amount, grandTotal, discount]);

  useEffect(() => {
    /* */

    addressLength();

    /* */
  }, [billingUserAddressLength, billingUser]);

  useEffect(() => {
    /* */

    getBillingAddress();

    /* */
  }, [currentUser]);

  useEffect(() => {
    /* */

    getTicketPaymentDetails();

    /* */
  }, [currentUser]);

  /* ************************************************************************************** */
  /* **********************************     return      *********************************** */
  /* ************************************************************************************** */

  /* */
  return (
    /* */

    <Wrapper>
      {/* */}

      <Grid container spacing={4}>
        {/* */}

        {/* ****************************** */}
        {/* Creating the address section : */}

        <Grid
          xs={12}
          lg={4}
          className="border rounded-md shadow-md h-[auto] mt-[33px] py-[30px] responsive-address-height"
        >
          <div className="p-5 py-[40px] border-b cursor-pointer">
            {/* */}

            <AddressCard />

            <div className="">
              {billingUserAddressLength === 0 ? (
                /* */

                <Link to={"/ticketSummaryPage/?step=2"}>
                  <Button
                    sx={{
                      mt: 2,
                      mb: 10,
                      pb: 10,
                      ml: 8.3,
                      py: 1.5,
                      bgcolor: "RGB(145 85 253)",
                      fontSize: "14px",
                      fontWeight: "bold",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    Add new Address
                  </Button>
                </Link>
              ) : (
                /* */

                ""

                /* <Link to={"/ticketSummaryPage/?step=2"}>
                  <Button
                    sx={{
                      mt: 2,
                      mb: 10,
                      pb: 10,
                      ml: 8.6,
                      py: 1.5,
                      bgcolor: "RGB(145 85 253)",
                      fontSize: "14px",
                      fontWeight: "bold",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    Change Address
                  </Button>
                </Link> */

                /* */
              )}
            </div>

            {/* */}
          </div>
        </Grid>

        {/* **************************************************************** */}
        {/* Creating the order summary section to display the order summary. */}

        <Grid item xs={12} lg={8}>
          <Box className="border rounded-s-md shadow-md">
            {/* */}

            {tickets.length > 0 ? (
              <>
                {/* */}

                {/* ********************************* */
                /* Creating a dynamic order summary. */}

                <div
                  className=""
                  style={{
                    textAlign: "center",
                    display: "block",
                  }}
                >
                  {/* */}

                  <div
                    className="pb-[40px] pt-[10px] rounded-lg mx-auto w-[full] h-[auto] 
                    responsive-summary"
                  >
                    {/* */}

                    <p
                      className="text-5xl font-bold my-[10px] text-slate-700 font-serif  
                      responsive-summary-heading-text"
                    >
                      <span className="text-7xl">⁂</span>

                      <span> Order Summary </span>

                      <span className="text-7xl">⁂</span>
                    </p>

                    <p className="text-[18px] font-bold text-[#080B39] mt-[30px] font-sans responsive-text">
                      Number of Coupons Selected = {tickets.length}
                    </p>

                    {tickets.length > 0 ? (
                      <div
                        className="mx-[5px]"
                        style={{
                          textAlign: "center",
                          display: "block",
                        }}
                      >
                        <h3 className="text-3xl font-bold font-sans mb-4 my-[20px]">
                          {/* */}

                          <p className="mb-4 font-bold font-sans">
                            ✶ Your Selected Coupons Numbers ✶
                          </p>

                          {tickets?.map((ticket, index) => {
                            return (
                              <span className="gap-4 pr-4" key={index}>
                                {/* */}

                                {"✦" + ticket + " "}

                                {/* */}
                              </span>
                            );
                          })}

                          {/* */}
                        </h3>

                        {/* */}
                      </div>
                    ) : (
                      ""
                    )}

                    <p className="text-[18px] font-bold text-[#080B39] mt-[40px] font-sans responsive-text">
                      Price of one coupon = Rs 100
                    </p>

                    <p className="text-[18px] font-bold text-[#080B39] mt-5 font-sans responsive-text">
                      Total = Rs (100
                      <span className="font-bold text-2xl"> X </span>
                      {tickets.length}) = Rs {100 * tickets.length}
                    </p>

                    <p className="text-[18px] text-[#080B39] mt-5 font-bold font-sans">
                      {/* */}

                      {tickets.length < 10 ? (
                        <span className="text-[20px] responsive-text1">
                          GRAND TOTAL = Rs {grandTotal}
                        </span>
                      ) : (
                        <>
                          GRAND TOTAL =
                          <del className="mr-5 ml-4">
                            Rs {100 * tickets.length}
                          </del>
                          <span> Rs {grandTotal}</span>
                        </>
                      )}

                      {tickets.length >= 10 ? (
                        <p
                          className="pl-[150px] pt-4 font-semibold font-sans text-[#BA0F30] 
                          responsive-discount"
                        >
                          ( Rs {discount} Discount )
                        </p>
                      ) : (
                        ""
                      )}

                      {/* */}
                    </p>

                    {/* */}
                  </div>

                  {/* */}
                </div>

                {/* ************************************************* */}
                {/* Creating a link to go to the coupons-buying page. */}

                <Link
                  to="/ticketBuying"
                  style={{
                    textAlign: "center",
                    display: "block",
                  }}
                  className="py-[20px] px-[10px] bg-[#0d2e21] text-[#d8d0d2] rounded-lg 
                  hover:opacity-75 disabled:opacity-90 font-sans font-semibold text-[24px] 
                  hover:bg-[#a07422] w-[40%] mx-auto my-[20px] responsive-add-books"
                >
                  Add More Coupons
                </Link>

                {/* ****************************************************** */}
                {/* Creating a dynamic payment button to make the payment. */}

                <div
                  style={{
                    textAlign: "center",
                    display: "block",
                  }}
                >
                  {/* */}

                  <button
                    onClick={() => displayTicketsRazorpay(amount)}
                    className="py-[20px] px-[40px] bg-[#800000] text-[#d8d0d2] rounded-lg 
                    text-[23px] my-[40px] mb-[80px] hover:opacity-75 disabled:opacity-90 font-sans 
                    font-semibold w-[30%] responsive-button"
                  >
                    PAY ₹ {grandTotal}
                  </button>

                  {/* */}
                </div>

                {/* */}
              </>
            ) : (
              /* */

              <div style={{ textAlign: "center", paddingBottom: "30px" }}>
                {/* */}

                <h1 className="m-4 py-[30px] text-3xl text-center font-semibold font-sans responsive-text">
                  You don't have any coupons for payment. Please buy your
                  coupons
                </h1>

                <Link to={"/buyingPage"}>
                  <Button
                    sx={{
                      mt: 2,
                      mb: 10,
                      pb: 10,
                      ml: 10,
                      py: 1.5,
                      bgcolor: "#C9B1C6",
                      color: "#3B0918",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                    size="large"
                    variant="contained"
                    type="submit"
                    className="w-[30%] mx-auto responsive-button1"
                  >
                    Buy Coupons
                  </Button>
                </Link>

                {/* */}
              </div>

              /* */
            )}

            {/* */}
          </Box>
        </Grid>

        {/* */}
      </Grid>

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

    .responsive-summary-heading-text {
      margin-top: -30px;
    }

    .responsive-bg-table {
      height: auto;
    }

    .responsive-tickets {
      font-size: 1.8rem;
      margin-left: -8px;
    }

    .responsive-text {
      font-size: 2rem;
      line-height: 1.4;
    }

    .responsive-text1 {
      font-size: 2.2rem;
    }

    .responsive-summary {
      margin: auto;
      height: auto;
      margin-top: 40px;
      font-size: 1rem;
      width: 100%;
    }

    .responsive-summary2 {
      font-size: 2.4rem;
    }

    .responsive-discount {
      padding: 10px;
      margin-left: 150px;
      font-size: 2rem;
    }

    .hide {
      display: none;
    }

    .responsive-button {
      font-size: 2.6rem;
      width: 80%;
      margin-bottom: 70px;
    }

    .responsive-button1 {
      width: 55%;
      text-align: center;
      font-size: 2rem;
    }

    .responsive-address-height {
      height: auto;
    }

    .responsive-add-books {
      font-size: 2.4rem;
      width: 100%;
      padding: 24px;
      line-height: 1.4;
    }

    /* */
  }

  /* */
`;
