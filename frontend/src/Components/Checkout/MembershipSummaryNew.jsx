/* */

import React, { useState, useEffect } from "react";

import styled from "styled-components";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import { Box, Button, Grid } from "@mui/material";

import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { signOutUserSuccess } from "../../Redux/Actions/authActions.jsx";

import AddressCard from "./AddressCard.jsx";

// let userId = localStorage.getItem("id");

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function MembershipSummary() {
  /* */

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const userId = currentUser._id;

  const [loading, setLoading] = useState(false);

  const [billingUser, setBillingUser] = useState("");

  const [membershipUser, setMembershipUser] = useState("");

  const [billingUserAddressLength, setBillingUserAddressLength] = useState("");

  const [membershipUserPaymentDetails, setMembershipUserPaymentDetails] =
    useState("");

  const addressLength = () => {
    /* */

    if (billingUser) {
      setBillingUserAddressLength(billingUser.length);
    }

    /* */
  };

  const displayMembershipRazorpay = async (amount) => {
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
                  `${VITE_SERVER_URL}/api/payment/membershipPaymentVerification`,
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

                /* */
              } catch (error) {
                /* */

                navigate("/paymentFail");

                console.log(error);

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

  const getMembershipDetails = async () => {
    /* */

    try {
      /* */

      setLoading(true);

      if (userId) {
        /* */

        const res = await fetch(
          `${VITE_SERVER_URL}/api/user/get-membershipUser/${userId}`,
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

        setMembershipUser(data);

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

  const getMembershipPaymentDetails = async () => {
    /* */

    try {
      /* */

      setLoading(true);

      if (userId) {
        /* */

        const res = await fetch(
          `${VITE_SERVER_URL}/api/payment/get-membership-payment-details/${userId}`,
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

        setMembershipUserPaymentDetails(data);

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

    getMembershipDetails();

    /* */
  }, [currentUser]);

  useEffect(() => {
    /* */

    getMembershipPaymentDetails();

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

      <Grid container spacing={4} className="mb-[60px]">
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

                <Link to={"/membershipSummaryPage/?step=2"}>
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

                /* <Link to={"/membershipSummaryPage/?step=2"}>
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

        {/* ********************************** */}
        {/* Creating the order summary section */}

        <Grid item xs={12} lg={8}>
          <Box className="border rounded-s-md shadow-md">
            {/* */}

            {/* ********************************** */}
            {/* Creating the heading for the order */}

            {membershipUser ? (
              billingUser ? (
                billingUser.map((billingUser, index) => {
                  return (
                    /* */

                    <div className="" key={index}>
                      {/* */}

                      <p className="text-5xl font-bold my-[30px] pt-5 text-slate-700 font-serif text-center">
                        <span className="text-7xl">⁂</span>

                        <span> Hi {billingUser.firstName} </span>

                        <span className="text-7xl">⁂</span>
                      </p>

                      <h1
                        className="text-[21px] font-semibold font-sans my-[30px] pt-5 text-slate-700 
                        text-center responsive-text "
                      >
                        Thanks for becoming a member of SKMT Trust
                      </h1>

                      <p
                        className="text-[17px] text-[#C70039] text-center font-semibold font-sans 
                        pb-[80px] responsive-membership-details"
                      >
                        (We will send 4 books along with a membership
                        certificate to your provided address)
                      </p>

                      {/* */}
                    </div>

                    /* */
                  );
                })
              ) : (
                ""
              )
            ) : (
              <>
                {/* ********************************** */}
                {/* Creating the heading for the order */}

                {billingUser
                  ? billingUser.map((billingUser, index) => {
                      return (
                        /* */

                        <div className="" key={index}>
                          {/* */}

                          <p className="text-5xl font-bold my-[30px] pt-5 text-slate-700 font-serif text-center">
                            <span className="text-7xl">⁂</span>

                            <span> Hi {billingUser.firstName} </span>

                            <span className="text-7xl">⁂</span>
                          </p>

                          <h1
                            className="text-[21px] font-semibold font-sans my-[30px] pt-5 text-slate-700 
                            text-center responsive-text "
                          >
                            Please make your payment to become a member of SKMT
                            Trust
                          </h1>

                          {/* */}
                        </div>

                        /* */
                      );
                    })
                  : ""}

                {/* *********************************************** */}
                {/* Creating a payment button to make the payment : */}

                {billingUser ? (
                  <div
                    style={{
                      textAlign: "center",
                      display: "block",
                    }}
                  >
                    {/* */}

                    <button
                      onClick={() => displayMembershipRazorpay(2500)}
                      className="py-[20px] px-[40px] bg-[#800000] text-[#d8d0d2] mt-[45px] rounded-lg 
                      text-3xl mb-[40px] hover:opacity-75 disabled:opacity-90  font-sans font-semibold
                      responsive-button"
                    >
                      PAY ₹ 2500
                    </button>

                    {/* */}
                  </div>
                ) : (
                  ""
                )}
              </>

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

    .responsive-text {
      font-size: 16px;
      line-height: 1.7;
    }

    .responsive-button {
      font-size: 2.4rem;
    }

    .responsive-address-height {
      height: auto;
    }

    .responsive-membership-details {
      font-size: 2rem;
      line-height: 1.4;
    }

    /* */
  }

  /* */
`;
