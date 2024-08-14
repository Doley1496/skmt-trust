/* */

/* */

import React, { useState } from "react";

import Layout from "../../Components/Layout.jsx";
import PageNavigation from "../../Components/PageNavigation.jsx";
import styled from "styled-components";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link, useNavigate } from "react-router-dom";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase.js";

import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import OtpInput from "otp-input-react";

export default function LoginWithOTPPage() {
  /* */

  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");

  const [otp, setOtp] = useState("");

  const [showOtp, setShowOtp] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [expandForm, setExpandForm] = useState(false);

  const [user, setUser] = useState("");

  // const auth = getAuth(app);

  const generateReCaptcha = () => {
    /* */

    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",

        callback: (response) => {
          /* reCAPTCHA solved, allow signInWithPhoneNumber. */

          sendOTP();
        },

        /* */
      }
    );

    /* */
  };

  const sendOTP = async (event) => {
    /* */

    setError("");

    if (phoneNumber === "" || phoneNumber === undefined)
      return setError("Please enter a valid phone number");

    if (phoneNumber.length >= 12) {
      /* */

      try {
        /* */

        generateReCaptcha();

        setLoading(true);

        setExpandForm(true);

        const appVerifier = window.recaptchaVerifier;

        const phone = "+" + phoneNumber;

        const confirmationResult = await signInWithPhoneNumber(
          auth,
          phone,
          appVerifier
        );

        if (confirmationResult) {
          /* */

          window.confirmationResult = confirmationResult;

          // setUser(confirmationResult);

          setLoading(false);

          setShowOtp(true);

          toast.success("OTP has been send to your phone number");

          /* */
        }

        /* */
      } catch (error) {
        /* */

        console.log(error);

        setLoading(false);

        setError(error.message);

        /* */
      }

      /* */
    } else {
      /* */

      setError("Enter a valid phone number");

      /* */
    }

    /* */
  };

  const verifyOTP = async (event) => {
    /* */

    if (otp === "" || otp === null) return setError("Please enter OTP");

    if (otp.length === 6) {
      /* */

      try {
        /* */

        setError("");

        const data = await window.confirmationResult.confirm(otp);

        setUser(data);

        console.log(data);

        navigate("/lotteryCompetition");

        /* */
      } catch (error) {
        /* */

        console.log(error);

        setError(error.message);

        /* */
      }

      /* */
    }

    /* */
  };

  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */

  return (
    /* */

    <Wrapper>
      {/* */}

      <Layout title={"Login-Page"}>
        {/* */}

        <PageNavigation title="Login" />

        <div className="bg-image1 pt-5 pb-5 justify-center bg-fixed">
          <div className="p-3 max-w-2xl h-[80vh] mx-auto rounded-lg bg-[#3fc099] responsive-form-portion">
            {/* */}

            <ToastContainer className="text-2xl font-bold" />

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

            {/* <form onSubmit={sendOTP}> */}

            <div>
              {/* */}

              {showOtp ? (
                <>
                  {/* */}

                  {/* ******************** */}
                  {/* Confirming the OTP : */}

                  <div style={{ textAlign: "center" }}>
                    {/* */}

                    <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                      <BsFillShieldLockFill size={30} />
                    </div>

                    <h1 className="text-2xl font-semibold font-sans text-gray-800 m-3 py-6">
                      Please enter the OTP send to {phoneNumber}
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

                    <button
                      onClick={verifyOTP}
                      className="bg-slate-200 text-2xl font-semibold font-sans text-green-900 p-3 rounded-lg 
                      uppercase hover:opacity-95 disabled:opacity-80 py-3 mb-6 w-75 mt-[40px]"
                    >
                      {loading && (
                        <CgSpinner size={20} className="mt-1 animate-spin " />
                      )}

                      <span>Verify OTP</span>
                    </button>

                    {/* */}
                  </div>

                  {/* */}
                </>
              ) : (
                <>
                  {/* */}

                  {/* ******************** */}
                  {/* Sending the OTP : */}

                  <div>
                    {/* */}

                    <label className="flex text-2xl font-semibold font-sans text-black m-3">
                      <BsTelephoneFill size={20} />
                      <span className="ml-4"> Phone Number </span>
                    </label>

                    <div className="react-tel-input">
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
                        disabled={loading}
                        className="bg-emerald-900 text-2xl font-semibold font-sans text-red-300 p-3 
                        rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-[170px] py-2.3 mb-6 m-4"
                      >
                        {loading ? (
                          <CgSpinner
                            size={20}
                            className="text-center mx-auto text-white animate-spin "
                          />
                        ) : (
                          "Send OTP"
                        )}
                      </button>

                      <Link to={"/login"}>
                        <button
                          className="bg-emerald-900 text-2xl font-semibold font-sans text-red-300 p-3 
                          rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-[140px] py-3 mb-6"
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

              <div className="m-4 p-4 font-sans text-3xl text-center text-red-800">
                {error}
              </div>

              <div id="recaptcha-container"></div>

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
}

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

    /* */
  }

  /* */
`;
