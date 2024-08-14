/* */

import React, { useState } from "react";

import Layout from "../../Components/All/Layout.jsx";

import PageNavigation from "../../Components/All/PageNavigation.jsx";

import styled from "styled-components";

import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { BiShow, BiHide } from "react-icons/bi";

import { ImLocation2 } from "react-icons/im";

import { IoPersonSharp } from "react-icons/io5";

import { RiLockPasswordFill } from "react-icons/ri";

import { MdMarkEmailUnread } from "react-icons/md";

import { FaPhoneVolume } from "react-icons/fa6";

import {
  signInStart,
  signInSuccess,
  signInFailure,
  doingVerificationStart,
} from "../../Redux/Actions/authActions.jsx";

import { ValidationSchema } from "../../Components/All/Validation.jsx";

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function RegistrationPage() {
  /* */

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [Inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    phoneNumber: "",
    gender: "",
    address: "",
    terms: "",
  });

  // const newPhone = "+91" + Inputs.phoneNumber;

  const newPhone = Inputs.phoneNumber;

  const handleShowPassword = () => {
    setShowPassword((previous) => !previous);
  };

  const change = (event) => {
    /* */

    if (
      event.target.type === "text" ||
      event.target.type === "email" ||
      event.target.type === "password" ||
      event.target.type === "number"
    ) {
      setInputs({ ...Inputs, [event.target.id]: event.target.value });
    }

    if (event.target.type === "radio") {
      setInputs({ ...Inputs, [event.target.name]: event.target.value });
    }

    if (event.target.type === "checkbox") {
      setInputs({ ...Inputs, [event.target.name]: event.target.checked });
    }

    /* */
  };

  const handleRegistration = async (event) => {
    /* */

    try {
      /* */

      event.preventDefault();

      dispatch(signInStart());

      await ValidationSchema.validate(Inputs, {
        abortEarly: false,
      });

      setLoading(true);

      const res = await fetch(`${VITE_SERVER_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Inputs, phoneNumber: newPhone }),
        credentials: "include",
      });

      const data = await res.json();

      console.log(data);

      if (data.success === false) {
        /* */

        dispatch(signInFailure(data.message));

        setLoading(false);

        toast.error(data.message);

        setErrors(data.message);

        console.log(data.message);

        return;

        /* */
      }

      dispatch(signInSuccess(data));

      dispatch(doingVerificationStart(data));

      /* Storing some data of the user in Local Storage. */

      window.localStorage.setItem("registerUserId", data._id);

      window.localStorage.setItem("email", data.email);

      window.localStorage.setItem("phoneNumber", data.phoneNumber);

      toast.success("Successfully Registered");

      navigate(`/verification/${"Registered but not verified"}/${401}`);

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      const newError = {};

      error.inner.forEach((error) => {
        newError[error.path] = error.message;
      });

      setErrors(newError);

      dispatch(signInFailure(error.message));

      console.log(error);

      /* */
    }

    /* */
  };

  /* ************************************************************************************* */
  /* **********************************    return    ************************************* */
  /* ************************************************************************************* */

  return (
    /* */

    <Wrapper>
      {/* */}

      <PageNavigation title="Register" />

      <Layout title={"Registration-Page"}>
        {/* */}

        <div className="bg-image2 pt-5 pb-5 justify-center mx-auto bg-fixed">
          <div
            className="p-3 max-w-2xl mx-auto rounded-lg bg-[#2d89a5] pt-4 pb-5 mt-5
            responsive-form-portion"
          >
            {/* */}

            {/*********************************************** */}
            {/* Creating a heading for the Registration form. */}

            <h1 className="text-4xl text-center font-bold font-sans my-7 mb-5 text-blue-950">
              Registration Form
            </h1>

            {/*************************************************************** */}
            {/* Creating a form to get the user details from the signUp page. */}

            <form className="flex flex-col gap-4" onSubmit={handleRegistration}>
              {/* */}

              {/* ************************************** */}
              {/* Creating an input field for firstName. */}

              <div className="flex">
                {/* */}

                <span className="cursor-pointer">
                  <IoPersonSharp className="text-[22px] mt-[18px] mr-3" />
                </span>

                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Your First Name"
                  autoComplete="off"
                  autoFocus="on"
                  className="border p-3 py-4 rounded-lg font-bold font-sans text-2xl w-[100%] mr-4
                  responsive-login-form"
                  value={Inputs.firstName}
                  onChange={change}
                />

                {/* */}
              </div>

              {errors.firstName && (
                <div className="text-[16px] text-[#72263b] text-center font-semibold font-sans mb-4">
                  {errors.firstName}
                </div>
              )}

              {/* ************************************* */}
              {/* Creating an input field for lastName. */}

              <div className="flex">
                {/* */}

                <span className="cursor-pointer">
                  <IoPersonSharp className="text-[22px] mt-[18px] mr-3" />
                </span>

                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Your Last Name"
                  autoComplete="off"
                  className="border p-3 py-4 rounded-lg font-bold font-sans text-2xl w-[100%] mr-4
                  responsive-login-form"
                  value={Inputs.lastName}
                  onChange={change}
                />

                {/* */}
              </div>

              {errors.lastName && (
                <div className="text-[16px] text-[#72263b] text-center font-semibold font-sans mb-4">
                  {errors.lastName}
                </div>
              )}

              {/* ************************************* */}
              {/* Creating an input field for password. */}

              <div className="flex">
                {/* */}

                <span className="cursor-pointer">
                  <RiLockPasswordFill className="text-[22px] mt-[18px] mr-3" />
                </span>

                <input
                  /* When we will get showPassword then we will make our type as text otherwise password type. */
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Create a Password"
                  autoComplete="off"
                  className="border p-3 py-4 rounded-lg font-bold font-sans text-2xl w-[100%] mb-[-10px] mr-4
                  responsive-login-form"
                  value={Inputs.password}
                  onChange={change}
                />

                {/* */}
              </div>

              <span className="cursor-pointer" onClick={handleShowPassword}>
                {/* */}

                {/* Using ternary operator when we will get showPassword then we will display show-icon
                    otherwise we will display hide-icon. 
                */}

                {showPassword ? (
                  <BiShow className="text-[22px]  ml-[400px] mt-[-50px] responsive-eye-icon" />
                ) : (
                  <BiHide className="text-[22px]  ml-[400px] mt-[-50px] responsive-eye-icon" />
                )}
              </span>

              {errors.password && (
                <div className="text-[16px] text-[#72263b] text-center font-semibold font-sans mb-4">
                  {errors.password}
                </div>
              )}

              {/* *********************************** */}
              {/* Creating an input field for gender. */}

              <div className="my-3">
                {/* */}

                <span className="text-[22px] font-bold font-sans responsive-gender">
                  Gender :
                </span>

                <label className="mr-4 text-[19px] font-bold font-sans responsive-gender">
                  <input
                    type="radio"
                    name="gender"
                    className="ml-3 mr-1"
                    value="male"
                    onChange={change}

                    // value={(values.gender = "male")}
                    // onChange={handleChange}
                    // onBlur={handleBlur}
                  />
                  Male
                </label>

                <label className="mr-4 text-[19px] font-bold font-sans responsive-gender">
                  <input
                    type="radio"
                    name="gender"
                    className="ml-3 mr-1"
                    value="female"
                    onChange={change}
                  />
                  Female
                </label>

                <label className="mr-2 text-[19px] font-bold font-sans responsive-gender">
                  <input
                    type="radio"
                    name="gender"
                    className="ml-3 mr-1"
                    value="other"
                    onChange={change}
                  />
                  Other
                </label>

                {errors.gender && (
                  <div className="text-[16px] text-[#72263b] text-center font-semibold font-sans mb-4">
                    {errors.gender}
                  </div>
                )}

                {/* */}
              </div>

              {/* ********************************** */}
              {/* Creating an input field for email. */}

              <div className="flex">
                {/* */}

                <span className="cursor-pointer">
                  <MdMarkEmailUnread className="text-[22px] mt-[18px] mr-3" />
                </span>

                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email Id"
                  autoComplete="off"
                  className="border p-3 py-4 rounded-lg font-bold font-sans text-2xl w-[100%] mr-4
                  responsive-login-form"
                  value={Inputs.email}
                  onChange={change}
                />

                {/* */}
              </div>

              {errors.email && (
                <div className="text-[16px] text-[#72263b] text-center font-semibold font-sans">
                  {errors.email}
                </div>
              )}

              {/* ***************************************** */}
              {/* Creating an input field for phone number. */}

              <div className="flex">
                {/* */}

                <span className="cursor-pointer">
                  <FaPhoneVolume className="text-[22px] mt-[18px] mr-3" />
                </span>

                <input
                  type="number"
                  name="phoneNumber"
                  id="phoneNumber"
                  placeholder="Your Phone Number"
                  className="border p-3 py-4 rounded-lg font-bold font-sans text-2xl w-[100%] mr-4
                    responsive-login-form"
                  value={Inputs.phoneNumber}
                  onChange={change}
                />

                {/* */}
              </div>

              {errors.phoneNumber && (
                <div className="text-[16px] text-[#72263b] text-center font-semibold font-sans">
                  {errors.phoneNumber}
                </div>
              )}

              {/* ************************************ */}
              {/* Creating an input field for address. */}

              <div className="flex">
                {/* */}

                <span className="cursor-pointer">
                  <ImLocation2 className="text-[22px] mt-[18px] mr-3" />
                </span>

                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Your Address"
                  autoComplete="off"
                  className="border p-3 py-4 rounded-lg font-bold font-sans text-2xl w-[100%] mr-4 
                  responsive-login-form"
                  value={Inputs.address}
                  onChange={change}
                />

                {/* */}
              </div>

              {errors.address && (
                <div className="text-[16px] text-[#72263b] text-center font-semibold font-sans mb-4">
                  {errors.address}
                </div>
              )}

              {/* ******************** */}
              {/* Terms and conditions */}

              <div className="mt-4">
                <input
                  type="radio"
                  name="terms"
                  id="terms"
                  value="true"
                  className="text-2xl"
                  checked={Inputs.terms}
                  onChange={change}
                />
                <span className="text-[18px] font-bold font-sans ml-3 responsive-terms">
                  All terms and conditions apply
                </span>
              </div>

              {errors.terms && (
                <div className="text-[16px] text-[#72263b] text-center font-semibold font-sans mb-4">
                  {errors.terms}
                </div>
              )}

              {/* ******************************* */}
              {/*  Creating a button to Register. */}

              <button
                disabled={loading}
                className="bg-slate-700 text-gray-300 py-[18px] rounded-lg uppercase hover:opacity-95 
                disabled:opacity-80 text-3xl mt-4 font-semibold font-sans responsive-button"
              >
                {loading ? "Loading..." : "Register"}
              </button>

              {/* */}
            </form>

            {/******************************************************************************* */}
            {/* Creating a link to go to the register page when user already have an account. */}

            <div className="flex gap-2 mt-5">
              <p className="font-bold font-sans text-slate-700 text-2xl responsive-link">
                Already Registered ?
              </p>

              <Link to="/login">
                <span className="text-blue-700 font-bold font-sans text-3xl underline responsive-link1">
                  Login
                </span>
              </Link>
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
      display: flex;
      flex-direction: column;
      font-size: 2rem;
    }

    .responsive-eye-icon {
      margin-top: -37px;
      margin-left: 270px;
      font-size: 2.7rem;
    }

    .responsive-terms {
      font-size: 2.2rem;
    }

    .responsive-button {
      font-size: 2.1rem;
    }

    .responsive-link {
      font-size: 2.3rem;
    }

    .responsive-link1 {
      font-size: 3rem;
    }

    .responsive-gender {
      font-size: 2.1rem;
    }

    /* */
  }

  /* */
`;
