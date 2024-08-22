/* */

import React, { useState, useEffect } from "react";

import Layout from "../../Components/All/Layout.jsx";
import PageNavigation from "../../Components/All/PageNavigation.jsx";
import styled from "styled-components";

import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import OtpInput from "otp-input-react";

import {
  signInStart,
  signInSuccess,
  signInFailure,
  setAccessToken,
} from "../../Redux/Actions/authActions.jsx";

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

import axios from "axios";

export default function LoginWithOTPPage() {
  /* */

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [showOtpInput, setShowOtpInput] = useState(false);

  const [otp, setOtp] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  // const newPhone = "+" + phoneNumber; // +919101134037

  var newPhoneNumber = phoneNumber; // 919101134037

  var newPhoneString = "" + newPhoneNumber; // "919101134037"

  var slicePhoneNumber = newPhoneString.substring(2, newPhoneString.length); // 9101134037

  const [hideSendOtpButton, setHideSendOtpButton] = useState(false);

  const [sendOTPLoading, setSendOTPLoading] = useState(false);

  const [resendOTPLoading, setResendOTPLoading] = useState(false);

  const [verifyLoading, setVerifyLoading] = useState(false);

  const [showTimer, setShowTimer] = useState(false);

  const [minutes, setMinutes] = useState(1);

  const [seconds, setSeconds] = useState(30);

  const sendOTP = async (event) => {
    /* */

    try {
      /* */

      event.preventDefault();

      setError("");

      if (phoneNumber === "" || phoneNumber === undefined)
        return setError("Please enter a valid phone number");

      if (phoneNumber.length === 12) {
        /* */

        setSendOTPLoading(true);

        const { data } = await axios.post(
          `${VITE_SERVER_URL}/api/verification/send-otp-for-login`,
          { phoneNumber: slicePhoneNumber }
        );

        if (data.success === false) {
          /* */

          toast.error(data.message);

          setSendOTPLoading(false);

          return;

          /* */
        }

        setSendOTPLoading(false);

        setShowOtpInput(true);

        setShowTimer(true);

        setMinutes(1);

        setSeconds(30);

        toast.success("OTP has been send to your phone number");

        /* */
      } else {
        /* */

        setError("Enter a valid phone number");

        /* */
      }

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      setSendOTPLoading(false);

      toast.error("Something went wrong: Please try again later");

      console.log(error);

      /* */
    }

    /* */
  };

  const verifyOTP = async (event) => {
    /* */

    try {
      /* */

      event.preventDefault();

      if (otp === "" || otp === null) return setError("Please enter OTP");

      if (otp.length === 6) {
        /* */

        dispatch(signInStart());

        setError("");

        setVerifyLoading(true);

        const res = await fetch(
          `${VITE_SERVER_URL}/api/verification/verify-otp-for-login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },

            body: JSON.stringify({
              otp,
              phoneNumber: slicePhoneNumber,
            }),

            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.success === false) {
          /* */

          dispatch(signInFailure(data.message));

          toast.error(data.message);

          setVerifyLoading(false);

          return;

          /* */
        }

        window.localStorage.setItem("id", data.user._id);

        dispatch(signInSuccess(data.user));

        dispatch(setAccessToken(data.token));

        setVerifyLoading(false);

        toast.success("Successfully Logged In");

        // navigate("/lotteryCompetition");

        navigate("/");

        /* */
      } else {
        /* */

        setError("OTP must be 6 digit");

        /* */
      }

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      dispatch(signInFailure(error.message));

      toast.error("Something went wrong: Please try again later");

      setVerifyLoading(false);

      console.log(error);

      /* */
    }

    /* */
  };

  const reSendOTP = async (event) => {
    /* */

    try {
      /* */

      event.preventDefault();

      setError("");

      if (phoneNumber === "" || phoneNumber === undefined)
        return setError("Please enter a valid phone number");

      if (phoneNumber.length === 12) {
        /* */

        setResendOTPLoading(true);

        const { data } = await axios.post(
          `${VITE_SERVER_URL}/api/verification/send-otp-for-login`,
          { phoneNumber: slicePhoneNumber }
        );

        if (data.success === false) {
          /* */

          toast.error(data.message);

          setResendOTPLoading(false);

          return;

          /* */
        }

        setShowOtpInput(true);

        setHideSendOtpButton(true);

        setResendOTPLoading(false);

        setShowTimer(true);

        setMinutes(1);

        setSeconds(30);

        toast.success("OTP has been send to your phone number");

        /* */
      } else {
        /* */

        setError("Enter a valid phone number");

        /* */
      }

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      setResendOTPLoading(false);

      toast.error("Something went wrong. Please try again later");

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

    const interval = setInterval(() => {
      /* */

      /* Decrease seconds if greater then 0 : */
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      /* When seconds will reached 0, then we will check the minutes : 
      
         1. If the minutes also reached 0, then stop the countdown.

            ie..  when both minutes and seconds becomes 0 we will stop the countdown 
                  and show the resend otp button.

         2. Else we will reset the seconds to 59 seconds(1 minutes) and make the minutes 0 by 
            decreasing the minutes by 1.
      
      */

      if (seconds === 0) {
        /* */

        if (minutes === 0) {
          /* */

          clearInterval(interval);

          setShowTimer(false);

          /* */
        } else {
          /* */

          setSeconds(59);

          setMinutes(minutes - 1);

          /* */
        }

        /* */
      }

      /* */
    }, 1000);

    return () => {
      /* */

      /* Clean-up stop the interval when the component unmounts. */

      clearInterval(interval);

      /* */
    };

    /* */

    /* Return this effect whenever "seconds" changes. */
  }, [seconds]);

  /* ************************************************************************************** */
  /* ********************************     return    *************************************** */
  /* ************************************************************************************** */

  return (
    /* */

    <Wrapper>
      {/* */}

      <Layout title={"Login-Page"}>
        {/* */}

        <PageNavigation title="Login" />

        <div className="bg-image1 pt-5 pb-5 justify-center bg-fixed">
          <div className="p-3 max-w-2xl h-[auto] mx-auto rounded-lg bg-[#3fc099] responsive-form-portion">
            {/* */}

            {/* *************************************** */}
            {/* Creating a heading for the signIn page. */}

            <div>
              <h1
                className="text-4xl text-center font-bold font-sans mt-[30px] mb-[40px] text-orange-950 
                responsive-heading"
              >
                Welcome Back
              </h1>
            </div>

            {/* ***************************************** */}
            {/* Creating a form send and verify the OTP : */}

            <div>
              {/* */}

              {showOtpInput ? (
                <>
                  {/* */}

                  {/* ******************** */}
                  {/* Confirming the OTP : */}

                  <div className="">
                    {/* */}

                    {showOtpInput ? (
                      <>
                        {/* */}

                        <div style={{ textAlign: "center" }}>
                          {/* */}

                          <div className="">
                            {/* */}

                            <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                              <BsFillShieldLockFill size={30} />
                            </div>

                            <h1
                              className="text-2xl font-semibold font-sans text-gray-900 m-3 py-6 
                              responsive-text"
                            >
                              Please enter the OTP send to :{" "}
                              <span className="underline">
                                {slicePhoneNumber}
                              </span>
                            </h1>

                            <OtpInput
                              value={otp}
                              onChange={setOtp}
                              OTPLength={6}
                              otpType="number"
                              disabled={false}
                              autoFocus
                              className="otp-container font-bold text-2xl"
                            ></OtpInput>

                            {/* */}
                          </div>

                          <div className="mx-auto mt-[10px]">
                            {/* */}

                            <button
                              onClick={verifyOTP}
                              className="bg-emerald-900 text-2xl font-semibold font-sans py-[14px] px-7 
                               text-red-300 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 
                               w-[auto] mt-[19px] mr-4 responsive-button"
                            >
                              {verifyLoading && (
                                <CgSpinner
                                  size={20}
                                  className="text-center mx-auto mb-2 text-white animate-spin"
                                />
                              )}

                              <span>Verify OTP</span>
                            </button>

                            {!showTimer ? (
                              /* */

                              <button
                                onClick={reSendOTP}
                                disabled={seconds > 0 || minutes > 0}
                                className="bg-[#7e30a8] text-2xl font-semibold font-sans py-[15px] px-7 
                               text-red-300 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 
                                w-[auto] mt-[20px] mr-4 responsive-button"
                                style={{
                                  color:
                                    seconds > 0 || minutes > 0
                                      ? "#DFE3E8"
                                      : "#FF5630",
                                }}
                              >
                                {resendOTPLoading ? (
                                  <CgSpinner
                                    size={20}
                                    className="text-center mx-auto mb-2 text-white animate-spin"
                                  />
                                ) : (
                                  "Resend OTP"
                                )}
                              </button>
                            ) : (
                              /* */

                              <p
                                className="text-[20px] mt-4 text-center font-sans font-semibold
                                text-[#611f32]"
                              >
                                Resend OTP in -{" "}
                                <span style={{ fontWeight: 600 }}>
                                  {minutes < 10 ? `0${minutes}` : " " + minutes}{" "}
                                  :
                                  {seconds < 10
                                    ? " " + `0${seconds}`
                                    : " " + seconds}
                                </span>
                              </p>

                              /* */
                            )}

                            {/* */}
                          </div>

                          {/* */}
                        </div>

                        {/* */}
                      </>
                    ) : (
                      ""
                    )}

                    <div className="m-4 p-4 font-sans font-semibold text-3xl text-center text-red-800">
                      {error}
                    </div>

                    {/* */}
                  </div>

                  {/* */}
                </>
              ) : (
                <>
                  {/* */}

                  {/* ******************** */}
                  {/* Sending the OTP : */}

                  <div className="">
                    {/* */}

                    <label className="flex text-3xl font-semibold font-sans text-black m-3">
                      <BsTelephoneFill size={20} />
                      <span className="ml-4"> Phone Number </span>
                    </label>

                    <div className="react-tel-input font-bold font-sans py-[10px]">
                      <PhoneInput
                        country={"in"}
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                      />
                    </div>

                    <div className="m-4" style={{ textAlign: "center" }}>
                      {/* */}

                      <button
                        onClick={sendOTP}
                        className="bg-emerald-900 text-2xl font-semibold font-sans text-red-300 py-3  
                        px-7 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-[auto] mb-6 m-4 
                        responsive-button"
                      >
                        {sendOTPLoading ? (
                          <CgSpinner
                            size={20}
                            className="text-center mx-auto text-white animate-spin"
                          />
                        ) : (
                          "Send OTP"
                        )}
                      </button>

                      <Link to={"/login"}>
                        <button
                          className="bg-emerald-900 text-2xl font-semibold font-sans text-red-300 py-3 px-7 
                          rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-[auto] mb-6 m-4 
                          responsive-button"
                        >
                          Cancel
                        </button>
                      </Link>

                      {/* */}
                    </div>

                    {/* */}
                  </div>

                  {/* */}
                </>
              )}

              <div className="m-4 p-4 font-sans font-semibold text-3xl text-center text-[#69212f]">
                {error}
              </div>

              {/* */}
            </div>

            {/* */}
          </div>
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

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-form-portion {
      width: 500px;
    }

    .responsive-login-form {
      font-size: 2rem;
    }

    .responsive-icon-eye {
      margin-top: -47px;
      margin-left: 270px;
      font-size: 3rem;
    }

    .responsive-button {
      font-size: 2rem;
    }

    .responsive-text {
      font-size: 1.9rem;
      line-height: 2;
    }

    /* */
  }

  /* */
`;
