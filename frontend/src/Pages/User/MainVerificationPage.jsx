/* */

import React, { useState, useEffect } from "react";

import Layout from "../../Components/All/Layout.jsx";

import styled from "styled-components";

import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";

import { useParams } from "react-router-dom";

import { CgSpinner } from "react-icons/cg";

import { BsFillShieldLockFill } from "react-icons/bs";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import OtpInput from "otp-input-react";

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

let localStoragePhoneNumber = localStorage.getItem("phoneNumber");

let localStorageEmail = localStorage.getItem("email");

import {
  signInStart,
  signInSuccess,
  signInFailure,
  setAccessToken,
} from "../../Redux/Actions/authActions.jsx";

export default function VerificationPage() {
  /* */

  const { userId, token, email } = useParams();

  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [Inputs, setInputs] = useState({});

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [emailLoading, setEmailLoading] = useState(false);

  const [sendOTPLoading, setSendOTPLoading] = useState(false);

  const [resendOTPLoading, setResendOTPLoading] = useState(false);

  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);

  const [otp, setOtp] = useState("");

  const [showOtpInput, setShowOtpInput] = useState(false);

  const [emailVerificationSendSuccess, setEmailVerificationSendSuccess] =
    useState(false);

  const [hideVerifyEmailButton, setHideVerifyEmailButton] = useState(false);

  const [hidePhoneVerifyButton, setHidePhoneVerifyButton] = useState(false);

  const [hideSendOtpButton, setHideSendOtpButton] = useState(false);

  const currentUserPhoneNumber = localStoragePhoneNumber;

  const currentUserEmail = localStorageEmail;

  const [emailVerified, setEmailVerified] = useState(false);

  const [phoneVerified, setPhoneVerified] = useState(false);

  const [user, setUser] = useState([]);

  const [showTimer, setShowTimer] = useState(false);

  const [minutes, setMinutes] = useState(1);

  const [seconds, setSeconds] = useState(30);

  const change = (event) => {
    /* */

    if (event.target.type === "email" || event.target.type === "number") {
      setInputs({ ...Inputs, [event.target.id]: event.target.value });
    }

    /* */
  };

  const emailPhoneVerifiedResult = () => {
    if (currentUser === null) {
      setEmailVerified(user.emailVerified);
      setPhoneVerified(user.phoneVerified);
    } else {
      setEmailVerified(currentUser.emailVerified);
      setPhoneVerified(currentUser.phoneVerified);
    }
  };

  const sendOTP = async (event) => {
    /* */

    try {
      /* */

      event.preventDefault();

      setError("");

      setSendOTPLoading(true);

      const { data } = await axios.post(
        `${VITE_SERVER_URL}/api/verification/send-otp-in-verification-page`,
        { phoneNumber: currentUserPhoneNumber }
      );

      if (data.success === false) {
        /* */

        toast.error(data.message);

        setSendOTPLoading(false);

        setError(data.message);

        return;

        /* */
      }

      toast.success("OTP has been send to your phone number");

      setSendOTPLoading(false);

      setShowOtpInput(true);

      setHideSendOtpButton(true);

      setShowTimer(true);

      setSeconds(30);

      setMinutes(1);

      /* */

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      setSendOTPLoading(false);

      if (error.message === "Request failed with status code 400") {
        /* */

        toast.error("This phone number is verified with another account!");

        setError("This phone number is verified with another account!");

        /* */
      } else {
        /* */

        toast.error("Something went wrong. Please try again");

        /* */
      }

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

        setVerifyOtpLoading(true);

        const res = await fetch(
          `${VITE_SERVER_URL}/api/verification/verify-otp-in-verification-page`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },

            body: JSON.stringify({
              otp,
              phoneNumber: currentUserPhoneNumber,
            }),

            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.success === false) {
          /* */

          dispatch(signInFailure(data.message));

          toast.error(data.message);

          setVerifyOtpLoading(false);

          setError(data.message);

          return;

          /* */
        }

        window.localStorage.setItem("id", data.user._id);

        dispatch(signInSuccess(data.user));

        dispatch(setAccessToken(data.token));

        setVerifyOtpLoading(false);

        setHidePhoneVerifyButton(true);

        setShowOtpInput(false);

        toast.success("OTP has been verified successfully");

        /* */
      } else {
        /* */

        setError("OTP must be 6 digit");

        /* */
      }

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      toast.error("Something went wrong");

      setVerifyOtpLoading(false);

      dispatch(signInFailure(data.message));

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

      setResendOTPLoading(true);

      const { data } = await axios.post(
        `${VITE_SERVER_URL}/api/verification/send-otp-in-verification-page`,
        { phoneNumber: currentUserPhoneNumber }
      );

      if (data.success === false) {
        /* */

        toast.error(data.message);

        setResendOTPLoading(false);

        setError(data.message);

        return;

        /* */
      }

      setResendOTPLoading(false);

      setShowOtpInput(true);

      setHideSendOtpButton(true);

      setShowTimer(true);

      setSeconds(30);

      setMinutes(1);

      toast.success("OTP has been send to your phone number");

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      setResendOTPLoading(false);

      if (error.message === "Request failed with status code 400") {
        /* */

        toast.error("This phone number is verified with another account!");

        setError("This phone number is verified with another account!");

        /* */
      } else {
        /* */

        toast.error("Something went wrong. Please try again");

        /* */
      }

      console.log(error);

      /* */
    }

    /* */
  };

  const sendVerificationMail = async (event) => {
    /* */

    try {
      /* */

      event.preventDefault();

      setEmailLoading(true);

      const res = await fetch(
        `${VITE_SERVER_URL}/api/verification/send-email`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: currentUserEmail,
          }),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success === false) {
        /* */

        toast.error(data.message);

        setEmailLoading(false);

        return;

        /* */
      }

      setEmailVerificationSendSuccess(true);

      setEmailLoading(false);

      setHideVerifyEmailButton(true);

      toast.success("Email verification link has been sent to your email id");

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      console.log(error);

      toast.error("Something went wrong. Please try again");

      setEmailLoading(false);

      /* */
    }

    /* */
  };

  const verifyEmail = async (event) => {
    /* */

    try {
      /* */

      dispatch(signInStart());

      const res = await fetch(
        `${VITE_SERVER_URL}/api/verification/verify-email/${userId}/${token}/${email}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success === false) {
        /* */

        dispatch(signInFailure(data.message));

        toast.error(data.message);

        setLoading(false);

        return;

        /* */
      }

      setLoading(false);

      window.localStorage.setItem("id", data.user._id);

      dispatch(signInSuccess(data.user));

      dispatch(setAccessToken(data.token));

      toast.success("Email verified successfully");

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      dispatch(signInFailure(error.message));

      toast.error("Something went wrong. Please try again later");

      console.log(error);

      /* */
    }

    /* */
  };

  const getSingleUserDetails = async () => {
    /* */

    try {
      /* */

      const res = await fetch(
        `${VITE_SERVER_URL}/api/user/getSingleUser/${currentUserEmail}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success === false) {
        /* */

        toast.error(data.message);

        return;

        /* */
      }

      setUser(data.existingUser);

      window.localStorage.setItem("phoneNumber", data.existingUser.phoneNumber);

      /* Catching the error and displaying it with a toast message. */
    } catch (error) {
      /* */

      console.log(error);

      /* */
    }

    /* */
  };

  /* ******************************************************************* */
  /* *******************  useEffect() hooks  *************************** */
  /* ******************************************************************* */

  useEffect(() => {
    /* */

    emailPhoneVerifiedResult();

    /* */
  }, [currentUser]);

  useEffect(() => {
    /* */

    getSingleUserDetails();

    /* */
  }, [currentUserEmail, currentUserPhoneNumber, user]);

  useEffect(() => {
    /* */

    verifyEmail();

    /* */
  }, [userId, token, email]);

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

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  return (
    /* */

    <Wrapper className="bg-image1 pt-5 pb-5 justify-center mx-auto bg-fixed">
      {/* */}

      <Layout title={"Verification-Page"}>
        {/* */}

        {/* ********************************************* */}
        {/* Creating a heading for the verification page. */}

        <div className="underline">
          <h1 className="text-5xl text-center font-bold font-sans my-7 text-red-900 mb-5">
            Your email and phone status
          </h1>
        </div>

        <hr className="my-[30px] text-3xl font-bold w-[70%] mx-auto" />

        {/* ************************************************************* */}
        {/* Section for the email id and phone number validation message. */}

        <div className="">
          {/* */}

          {!emailVerified && !phoneVerified ? (
            <h1 className="text-[24px] font-semibold font-sans text-center">
              Please verify your email id and phone number to login to your
              account
            </h1>
          ) : (
            <>
              {/* */}

              {!emailVerified ? (
                <h1 className="text-[24px] font-semibold font-sans text-center">
                  Please verify your email id
                </h1>
              ) : (
                ""
              )}

              {!phoneVerified ? (
                <h1 className="text-[24px] font-semibold font-sans text-center">
                  Please verify your phone number
                </h1>
              ) : (
                ""
              )}

              {/* */}
            </>
          )}

          {/* */}
        </div>

        {/* *************************************** */}
        {/* Section for the email id verification . */}

        <div className="bg-image1 pt-5 pb-5 justify-center bg-fixed">
          <div
            className="mt-[10px] p-3 max-w-4xl h-[auto] mx-auto rounded-lg bg-[#3fc099] 
            responsive-form-portion"
          >
            {/* */}

            <h1 className="text-4xl text-center font-bold font-sans my-7 text-red-900 mb-5">
              Email Id ={" "}
              {emailVerified == true ? (
                <span>✔️Verified</span>
              ) : (
                <span>❌ Not Verified</span>
              )}
            </h1>

            <div className="mb-6" style={{ textAlign: "center" }}>
              {/* */}

              {!hideVerifyEmailButton ? (
                <>
                  {!emailVerified ? (
                    /* */

                    <div className="flex flex-col">
                      {/* */}

                      <input
                        type="email"
                        id="email"
                        placeholder="Enter Your Email."
                        onChange={change}
                        value={currentUser ? currentUser.email : user.email}
                        className="border text-2xl font-sans font-semibold py-3 px-3 rounded-lg w-[60%] 
                        mb-4 mx-auto responsive-input-text"
                      />

                      <button
                        onClick={sendVerificationMail}
                        className="bg-emerald-900 text-2xl font-semibold font-sans text-red-300 py-4 
                        px-7 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-[40%] mx-auto
                        responsive-button"
                      >
                        {emailLoading && (
                          <CgSpinner
                            size={20}
                            className="mx-auto mb-2 animate-spin "
                          />
                        )}

                        <span>Verify Email Id</span>
                      </button>

                      {/* */}
                    </div>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}

              {/* */}
            </div>

            {emailVerificationSendSuccess ? (
              <h1 className="text-[19px] font-semibold font-sans text-center mt-3 mb-[30px] text-[#642235]">
                Email verification link has been sent to{" "}
                {currentUser ? currentUser.email : user.email}
                <br />
                Please verify your email !
              </h1>
            ) : (
              ""
            )}

            {/* */}
          </div>
        </div>

        <hr className="my-[30px] text-3xl font-bold w-[70%] mx-auto" />

        {/* ******************************************* */}
        {/* Section for the phone number verification . */}

        <div className="bg-image1 pt-5 pb-5 justify-center bg-fixed">
          <div
            className="mt-[10px] p-3 max-w-3xl h-[auto] mx-auto rounded-lg bg-[#3fc099] 
            responsive-form-portion"
          >
            {/* */}

            <h1 className="text-4xl text-center font-bold font-sans my-7 text-red-900 mb-5">
              Phone Number ={" "}
              {phoneVerified == true ? (
                <span>✔️Verified</span>
              ) : (
                <span>❌ Not Verified</span>
              )}
            </h1>

            <div className="" style={{ textAlign: "center" }}>
              {/* */}

              {!hidePhoneVerifyButton ? (
                <>
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
                                  className="text-2xl font-semibold font-sans text-gray-800 m-3 py-6 
                                  responsive-text"
                                >
                                  Please enter the OTP send to :{" "}
                                  <span className="underline">
                                    {currentUserPhoneNumber}
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

                              <div className="mx-auto">
                                {/* */}

                                <button
                                  onClick={verifyOTP}
                                  className="bg-emerald-900 text-2xl font-semibold font-sans py-3 px-7 
                                 text-red-300 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 
                                  w-[auto] mt-[19px] mr-4 responsive-button"
                                >
                                  {verifyOtpLoading && (
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
                                    className="bg-[#7e30a8] text-2xl font-semibold font-sans text-gray-200 
                                    py-3 px-7 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 
                                    w-[auto] mb-6 mt-[19px] hover:bg-[#405e24] responsive-button"
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
                                    className="text-2xl mt-4 text-center font-sans font-semibold
                                    text-[#611f32]"
                                  >
                                    Resend OTP in : {}
                                    <span style={{ fontWeight: 600 }}>
                                      {minutes < 10 ? `0${minutes}` : minutes} :
                                      {seconds < 10 ? `0${seconds}` : seconds}
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

                      {/* ***************** */}
                      {/* Sending the OTP : */}

                      {!phoneVerified ? (
                        /* */

                        <div>
                          {/* */}

                          <input
                            type="number"
                            id="phoneNumber"
                            placeholder="Enter Your phone number."
                            onChange={change}
                            value={
                              currentUser
                                ? currentUser.phoneNumber
                                : user.phoneNumber
                            }
                            className="border text-2xl font-sans font-semibold py-3 px-3 rounded-lg w-[60%] 
                            mb-4 mx-auto responsive-input-text"
                          />

                          <button
                            onClick={sendOTP}
                            className="bg-emerald-900 text-2xl font-semibold font-sans text-red-300 py-4  
                            px-7 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-[auto] mb-6 m-4 
                            responsive-button"
                          >
                            {sendOTPLoading ? (
                              <CgSpinner
                                size={20}
                                className="text-center mx-auto text-white animate-spin"
                              />
                            ) : (
                              "Verify Phone Number"
                            )}
                          </button>

                          {/* */}
                        </div>
                      ) : (
                        ""

                        /* */
                      )}

                      {/* */}
                    </>
                  )}

                  {/* */}
                </>
              ) : (
                ""
              )}

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

  .responsive-button {
    font-size: 1.6rem;
    padding: 10px;
    padding-top: 13px;
    padding-bottom: 13px;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-input {
      font-size: 2.4rem;
      padding: 5px;
      padding-top: 18px;
      padding-bottom: 18px;
    }

    .responsive-button {
      font-size: 2rem;
      padding-top: 15px;
      padding-bottom: 15px;
      width: auto;
    }

    .responsive-icon-eye {
      margin-top: -47px;
      margin-left: 270px;
      font-size: 3rem;
    }

    .responsive-input-text {
      font-size: 2rem;
      width: 80%;
    }

    /* */
  }

  /* */
`;
