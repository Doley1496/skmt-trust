/* */

import React, { useState, useEffect, useRef } from "react";

import Layout from "../../Components/All/Layout.jsx";

import PageNavigation from "../../Components/All/PageNavigation.jsx";

import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate, Link, NavLink } from "react-router-dom";

import { toast } from "react-toastify";

import { Checkmark } from "react-checkmark";

import { BsFillShieldLockFill } from "react-icons/bs";

import { CgSpinner } from "react-icons/cg";

import { BiShow, BiHide } from "react-icons/bi";

import "react-phone-input-2/lib/style.css";

import OtpInput from "otp-input-react";

import axios from "axios";

import { app } from "../../firebase.js";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../../Redux/Actions/authActions.jsx";

import {
  signInStart,
  signInSuccess,
  signInFailure,
  signOutUserSuccess,
} from "../../Redux/Actions/authActions.jsx";

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

// let userId = localStorage.getItem("id");

export default function ProfilePage() {
  /* */

  const fileRef = useRef(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const [error, setError] = useState(false);

  const [Error, setErrors] = useState(false);

  const [loading, setLoading] = useState(false);

  const [emailLoading, setEmailLoading] = useState(false);

  const [sendOTPLoading, setSendOTPLoading] = useState(false);

  const [resendOTPLoading, setResendOTPLoading] = useState(false);

  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);

  const [updatedMessage, setUpdatedMessage] = useState(false);

  const [deletedMessage, setDeletedMessage] = useState(false);

  const [file, setFile] = useState(undefined);

  const [fileUploadPercentage, setFileUploadPercentage] = useState(0);

  const [emailVerificationSendSuccess, setEmailVerificationSendSuccess] =
    useState(false);

  const [hideVerifyEmailButton, setHideVerifyEmailButton] = useState(false);

  const [hidePhoneVerifyButton, setHidePhoneVerifyButton] = useState(false);

  const [otp, setOtp] = useState("");

  const [showOtpInput, setShowOtpInput] = useState(false);

  const [Inputs, setInputs] = useState({});

  const inputPhoneNumber = Inputs.phoneNumber;

  const inputEmail = Inputs.email;

  const currentUserPhoneNumber = currentUser.phoneNumber;

  const currentUserEmail = currentUser.email;

  const userId = currentUser._id;

  const [mainPhoneNumber, setMainPhoneNumber] = useState("");

  const [mainEmail, setMainEmail] = useState("");

  const [emailVerified, setEmailVerified] = useState(false);

  const [phoneVerified, setPhoneVerified] = useState(false);

  const [hideSendOtpButton, setHideSendOtpButton] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showTimer, setShowTimer] = useState(false);

  const [minutes, setMinutes] = useState(1);

  const [seconds, setSeconds] = useState(30);

  const [user, setUser] = useState([]);

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

    /* */
  };

  const email = () => {
    /* */

    if (inputEmail != undefined) {
      setMainEmail(inputEmail);
    } else {
      setMainEmail(currentUserEmail);
    }

    /* */
  };

  const phoneNumber = () => {
    /* */

    if (inputPhoneNumber != undefined) {
      setMainPhoneNumber(inputPhoneNumber);
    } else {
      setMainPhoneNumber(currentUserPhoneNumber);
    }

    /* */
  };

  const emailPhoneVerifiedResult = () => {
    /* */

    if (user) {
      setEmailVerified(user.emailVerified);
      setPhoneVerified(user.phoneVerified);
    } else {
      setEmailVerified("");
      setPhoneVerified("");
    }

    /* */
  };

  const sendOTP = async (event) => {
    /* */

    try {
      /* */

      if (inputPhoneNumber === undefined && currentUserPhoneNumber === "") {
        /* */

        toast.error("Please add your phone number");

        setError("Please add your phone number");

        return;

        /* */
      }

      if (mainPhoneNumber.length === 10) {
        /* */

        setError("");

        setSendOTPLoading(true);

        const { data } = await axios.post(
          `${VITE_SERVER_URL}/api/verification/send-otp-in-profile-page`,
          { phoneNumber: mainPhoneNumber }
        );

        console.log(data);

        if (data.success === false) {
          /* */

          setSendOTPLoading(false);

          toast.error(data.message);

          setError(data.message);

          return;

          /* */
        }

        setSendOTPLoading(false);

        setShowOtpInput(true);

        setHideSendOtpButton(true);

        setShowTimer(true);

        setSeconds(30);

        setMinutes(1);

        toast.success("OTP has been send to your phone number");

        /* */
      } else {
        /* */

        toast.error("Please enter a valid phone number");

        /* */
      }

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

        signInStart(true);

        setError("");

        setVerifyOtpLoading(true);

        const res = await fetch(
          `${VITE_SERVER_URL}/api/verification/verify-otp-in-profile-page`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },

            body: JSON.stringify({
              otp,
              phoneNumber: mainPhoneNumber,
              email: mainEmail,
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

        window.localStorage.setItem("id", data._id);

        dispatch(signInSuccess(data));

        setVerifyOtpLoading(false);

        setHidePhoneVerifyButton(true);

        setShowOtpInput(false);

        toast.success("OTP has been verified successfully");

        /* */
      } else {
        /* */

        setError("OTP must be 6 digits");

        /* */
      }

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      toast.error("Something went wrong. Please try again");

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

      if (inputPhoneNumber === undefined && currentUserPhoneNumber === "") {
        /* */

        toast.error("Please add your phone number");

        setError("Please add your phone number");

        return;

        /* */
      }

      if (mainPhoneNumber.length === 10) {
        /* */

        setError("");

        setResendOTPLoading(true);

        const { data } = await axios.post(
          `${VITE_SERVER_URL}/api/verification/send-otp-in-profile-page`,
          { phoneNumber: mainPhoneNumber }
        );

        if (data.success === false) {
          /* */

          setResendOTPLoading(false);

          toast.error(data.message);

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

        /* */
      } else {
        /* */

        toast.error("Please enter a valid phone number");

        /* */
      }

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      setResendOTPLoading(false);

      console.log(error);

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
            email: mainEmail,
            phoneNumber: currentUserPhoneNumber,
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

      setEmailLoading(false);

      setEmailVerificationSendSuccess(true);

      setHideVerifyEmailButton(true);

      toast.success("Email verification link has been sent to your email id");

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      console.log(error);

      setEmailLoading(false);

      toast.error("Something went wrong. Please try agin later!");

      /* */
    }

    /* */
  };

  const handleUpdateUserAccount = async (event) => {
    /* */

    event.preventDefault();

    try {
      /* */

      dispatch(updateUserStart());

      setLoading(true);

      const res = await fetch(
        `${VITE_SERVER_URL}/api/user/update-profile/${currentUser._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Inputs),
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

          dispatch(updateUserFailure(data.message));

          toast.error(data.message);

          setLoading(false);

          return;

          /* */
        }

        /* */
      }

      dispatch(updateUserSuccess(data));

      setUpdatedMessage(true);

      setLoading(false);

      toast.success("Your profile is updated successfully");

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      dispatch(updateUserFailure(error.message));

      setLoading(false);

      console.log(error);

      /* */
    }

    /* */
  };

  const handleProfilePhotoUpload = (file) => {
    /* */

    /* Getting a storage using a firebase method getStorage() and we are passing app 
       which is the variable where firebase is initialized and storing it in a variable say storage.     
    */
    const storage = getStorage(app);

    /* Creating an unique file name using current time of our computer along with file.name. */
    const fileName = new Date().getTime() + file.name;

    /* Creating a storage-reference to know in which particular place we will save the storage 
       using a firebase method ref() and we are passing the storage and fileName inside it and
       storing it in a variable say storageRef.
    */
    const storageRef = ref(storage, fileName);

    /* To see the percentage of the uploading file we are using a firebase method uploadBytesResumable() 
       and passing the storageRef and file and storing it in a variable say uploadTask.
    */
    const uploadTask = uploadBytesResumable(storageRef, file);

    /*  We can use this variable uploadTask to get the percentage and also the error.

        Once we created a upload-task we will set the upload-task by uploadTask.on() and pass 
       "state_changed" and a callback function with snapshot inside uploadTask.on().
        Then we will get the error and then get the downloadUrl().
    */
    uploadTask.on(
      /* Here "state_changed" will track the changes and gives us a snapshot first which we will use to 
         create the progress and to set the percentage.
      */
      "state_changed",
      /* snapshot is a peice of information from each state change and we can just record the progress
         which is the percentage of upload by just saying snapshot.bytesTransferred / snapshot.totalBytes
         and we will have to multiply by 100 to get the percentage because that is something between 0 to 1
      */
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        /* Then we will set the FileUploadPercentage with the progress variable where we have stored the
           percentage value of the uploading file. We will get the % in decimal form therefore we are 
           converting the % to the integer form using Math.round() method. 
        */
        setFileUploadPercentage(Math.round(progress));
      },

      /* If any errors occurs when uploading the file we will display it. */
      (error) => {
        setErrors(true);
      },

      /* After displaying the error we will get the Url.
         We will create a callback function and use a firebase method call getDownloadURL() and pass
         uploadTask.snapshot.ref inside it and if the upload is successful then we will get the 
         downloadURL and set the Inputs object with previous values of Inputs array and we will set
         the avatar to the downloadURL. 
      */
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs({ ...Inputs, avatar: downloadURL });
        });
      }

      /* */
    );

    /* */
  };

  const handleDeleteUserAccount = async (event) => {
    /* */

    try {
      /* */

      /* Preventing the default refresh of the web page. */
      event.preventDefault();

      dispatch(deleteUserStart());

      const res = await fetch(
        `${VITE_SERVER_URL}/api/user/delete-profile/${currentUser._id}`,
        {
          method: "DELETE",
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

          dispatch(deleteUserFailure(data.message));

          toast.error(data.message);

          setLoading(false);

          return;

          /* */
        }

        /* */
      }

      dispatch(deleteUserSuccess(data));

      setDeletedMessage(true);

      toast.success("Your account has been deleted successfully");

      /* clearing the local-storage */
      localStorage.clear();

      navigate("/login");

      /* Reloading the web-page. */
      window.location.reload();

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      dispatch(deleteUserFailure(error.message));

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
        `${VITE_SERVER_URL}/api/user/getSingleUserUsingId/${userId}`,
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

    /* If there is an image(file) then we will call handleProfilePhotoUpload() function. */

    if (file) {
      /* */

      handleProfilePhotoUpload(file);

      /* */
    }

    /* */
  }, [file]);

  useEffect(() => {
    /* */

    handleUpdateUserAccount();

    /* */
  }, [currentUser]);

  useEffect(() => {
    /* */

    emailPhoneVerifiedResult();

    /* */
  }, [user]);

  useEffect(() => {
    /* */

    email();

    /* */
  }, [inputEmail, currentUserEmail]);

  useEffect(() => {
    /* */

    phoneNumber();

    /* */
  }, [inputPhoneNumber, currentUserPhoneNumber]);

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

  useEffect(() => {
    /* */

    getSingleUserDetails();

    /* */
  }, [currentUser, userId]);

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  return (
    /* */

    <Wrapper>
      {/* */}

      <div className="mt-[-105px] responsive-pagination">
        <PageNavigation title="Profile" />
      </div>

      <Layout title={"My-Profile-Page"}>
        {/* */}

        <div
          className="p-3 max-w-xl mx-auto"
          style={{
            textAlign: "center",
            display: "block",
          }}
        >
          {/* */}

          {/* **************************************** */}
          {/* Creating a heading for the profile page. */}

          <h1
            className="text-[26px] font-semibold m-7 mt-5 uppercase text-[#a94c4c]"
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            My Profile
          </h1>

          {/* ************************************************************* */}
          {/* Creating a form to get the user details from the signIn page. */}

          <form
            className="flex flex-col gap-4 p-3 text-2xl rounded-lg bg-slate-500 w-[130%] 
            font-bold ml-[-40px] responsive-profile"
            onSubmit={handleUpdateUserAccount}
          >
            {/* */}

            {/* ********************************************************************************* */}
            {/* Creating an input field to choose an image from the storage and making it hidden. */}

            <div className="">
              <input
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
                onChange={(event) => setFile(event.target.files[0])}
              />

              <h1 className="text-2xl font-bold font-sans text-[#F3E1C0] mt-3 text-center responsive-heading">
                My profile photo
              </h1>
            </div>

            {/* ************************************************* */}
            {/* Displaying the profile-image of the current user. */}

            <img
              /* When we get the currentUser we will display the currentUser's photo otherwise we will 
                 display the default profile-photo we set to every user. 
              */

              src={Inputs.avatar || currentUser.avatar}
              alt="profile-image"
              className="rounded-full h-[70px] w-[70px] object-cover cursor-pointer self-center"
              /* We are connecting the input feild and the profile-image together so that when the user 
                 will click on the profile-photo he can choose an image from his storage.
                 And inorder to do that we have to use an in-built function ie.. useRef from react.
              */
              onClick={() => fileRef.current.click()}
            />

            {/* *****************************************************************/}
            {/* Creating a paragraph to show the image upload success or error. */}

            {/* While uploading the file:

                * If we get any error we will display Error Image Upload in red color.
                * If the uploading file percentage is between 0 to 100 then we will show how 
                  much % has been uploaded in silver color.
                * If the uploading file percentage is completed ie. becomes 100% then we will show 
                Image Successfully Uploaded in green color otherwise we will show an empty string.

            */}

            <p className="self-center">
              {Error ? (
                <span className="text-[#800000] test-2xl font-sans font-semibold responsive-image-heading1">
                  Error Image Upload (image must be less then 2 MB)
                </span>
              ) : fileUploadPercentage > 0 && fileUploadPercentage < 100 ? (
                <span className="text-slate-700">{`Uploading ${fileUploadPercentage}%`}</span>
              ) : fileUploadPercentage === 100 ? (
                <span className="text-[#080B39] text-2xl font-sans font-semibold responsive-image-heading2">
                  Image Selected Successfully! Please click on update
                </span>
              ) : (
                ""
              )}
            </p>

            {/* ****************************************** */}
            {/* Creating an input field for the firstName. */}

            <div className="">
              <input
                type="text"
                id="firstName"
                placeholder="Enter Your First Name."
                onChange={change}
                className="border py-4 px-3 rounded-lg w-[100%] responsive-login-form"
                defaultValue={
                  currentUser.firstName ? currentUser.firstName : ""
                }
              />
            </div>

            {/* ***************************************** */}
            {/* Creating an input field for the lastName. */}

            <div className="">
              <input
                type="text"
                id="lastName"
                placeholder="Enter Your Last Name."
                onChange={change}
                className="border py-4 px-3 rounded-lg w-[100%] responsive-login-form"
                defaultValue={currentUser.lastName ? currentUser.lastName : ""}
              />
            </div>

            {/* ************************************** */}
            {/* Creating an input field for the email. */}

            <div className="mb-6 flex" style={{ textAlign: "center" }}>
              {/* */}

              {!hideVerifyEmailButton ? (
                <>
                  {/* */}

                  <input
                    type="email"
                    id="email"
                    placeholder="Enter Your Email."
                    onChange={change}
                    defaultValue={currentUser ? currentUser.email : ""}
                    className="border py-4 px-3 rounded-lg w-[100%] responsive-login-form"
                  />

                  {!emailVerified ? (
                    /* */

                    <div className="">
                      {/* */}

                      <span className=""> Not Verified </span>

                      <button
                        onClick={sendVerificationMail}
                        className="bg-emerald-900 text-2xl font-semibold font-sans text-red-300 py-3 
                        rounded-lg uppercase hover:opacity-95 disabled:opacity-80 px-3 mx-auto w-[auto]
                        responsive-button "
                      >
                        {emailLoading ? (
                          <CgSpinner
                            size={20}
                            className="text-center mx-auto text-white animate-spin"
                          />
                        ) : (
                          "Verify Email"
                        )}
                      </button>

                      {/* */}
                    </div>
                  ) : (
                    /* */

                    <div className="pl-3">
                      <span className="pl-3 pt-4">Verified </span>
                      <Checkmark size="30px" color="#223344" />
                    </div>

                    /* */
                  )}
                </>
              ) : (
                ""
              )}

              {/* */}
            </div>

            {emailVerificationSendSuccess ? (
              <h1 className="text-[17px] font-semibold font-sans text-center mt-3 mb-[30px] text-[#7c2e27]">
                Email verification link has been sent to{" "}
                {currentUser.email ? currentUser.email : mainEmail}
                <br />
                Please verify your email !
              </h1>
            ) : (
              ""
            )}

            {/* ************************************** */}
            {/* Creating an input field for the phone. */}

            <div className="flex">
              {/* */}

              <input
                type="number"
                id="phoneNumber"
                placeholder="Enter Your phone number."
                onChange={change}
                defaultValue={currentUser ? currentUser.phoneNumber : ""}
                className="border py-[20px] px-3 rounded-lg w-[100%] responsive-login-form"
              />

              {phoneVerified ? (
                /* */

                <div className="">
                  <span className="pl-3 pt-4">Verified </span>
                  <Checkmark size="30px" color="#223344" />
                </div>
              ) : (
                /* */

                /* ***************** */
                /* Sending the OTP : */

                <>
                  {!hideSendOtpButton ? (
                    <div className="pl-3">
                      {/* */}

                      <span className="pb-[20px]"> Not Verified </span>

                      <NavLink
                        onClick={sendOTP}
                        className="bg-emerald-900 text-2xl font-semibold font-sans text-red-300  
                        rounded-lg uppercase hover:opacity-95 disabled:opacity-80 py-3 px-3 mx-auto 
                        w-[auto] responsive-button flex"
                      >
                        {sendOTPLoading ? (
                          <CgSpinner
                            size={20}
                            className="text-center mx-auto text-white animate-spin"
                          />
                        ) : (
                          "Verify Phone"
                        )}
                      </NavLink>

                      {/* */}
                    </div>
                  ) : (
                    ""
                  )}
                </>

                /* */
              )}

              {/* */}
            </div>

            {/* ******************* */
            /* Confirming the OTP : */}

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
                        className="text-2xl font-semibold font-sans text-gray-300 m-3 py-6 
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
                          py-3 px-7 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-[auto] 
                          mb-6 mt-[19px] hover:bg-[#405e24] responsive-button"
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
                            {minutes < 10 ? `0${minutes}` : " " + minutes} :
                            {seconds < 10 ? " " + `0${seconds}` : " " + seconds}
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

            {/* **************************************** */}
            {/* Creating an input field for the address. */}

            <div className="">
              <input
                type="text"
                id="address"
                placeholder="Enter Your Address."
                onChange={change}
                className="border py-4 px-3 rounded-lg w-[100%] responsive-login-form"
                defaultValue={currentUser.address ? currentUser.address : ""}
              />
            </div>

            {/* ********************************** */}
            {/* Creating an input field for gender */}

            <div className="my-[20px]">
              {/* */}

              <span className="text-[18px]">Gender :</span>

              <label className="mr-2">
                <input
                  type="radio"
                  name="gender"
                  className="ml-3 mr-2"
                  onChange={change}
                  value="male"
                />
                Male
              </label>

              <label className="mr-2">
                <input
                  type="radio"
                  name="gender"
                  className="ml-3 mr-2"
                  onChange={change}
                  value="female"
                />
                Female
              </label>

              <label className="mr-2">
                <input
                  type="radio"
                  name="gender"
                  className="ml-3 mr-2"
                  onChange={change}
                  value="other"
                />
                Other
              </label>
            </div>

            {/* ***************************************** */}
            {/* Creating an input field for the password. */}

            <div className="flex">
              {/* */}

              <input
                /* When we will get showPassword then we will make our type as text otherwise password type. */
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Create your password"
                autoComplete="off"
                onChange={change}
                className="border p-3 py-4 rounded-lg text-2xl font-bold font-sans w-[100%] mr-4
                responsive-login-form"
              />

              {/* */}
            </div>

            {/* ******************************************************************************** */}
            {/* Using ternary operator when we will get showPassword then we will display show-icon
                otherwise we will display hide-icon. 
            */}

            <span className="cursor-pointer" onClick={handleShowPassword}>
              {showPassword ? (
                <BiShow
                  className="text-3xl font-bold font-sans ml-[390px] -mt-[56px] responsive-icon-eye 
                  responsive-login-form"
                />
              ) : (
                <BiHide
                  className="text-3xl font-bold font-sans ml-[390px] -mt-[56px] responsive-icon-eye 
                  responsive-login-form "
                />
              )}
            </span>

            {/* ***************************************************** */}
            {/* Creating a button to Update the user-profile details. */}

            <button
              className="bg-slate-700 text-white rounded-lg py-[17px] mb-5 uppercase hover:opacity-95
              disabled:opacity-80 w-[100%] text-3xl mt-4 font-semibold font-sans responsive-update-button"
            >
              {loading ? "Loading..." : "Update"}
            </button>

            {/* */}
          </form>

          {/* ************************************************ */}
          {/* Creating a button to delete the current account. */}

          {/* <div className="flex justify-between mt-5 pb-5">
            <button
              className="text-red-700 cursor-pointer font-semibold font-sans hover:underline text-3xl 
              ml-[130px] responsive-delete-button"
              onClick={handleDeleteUserAccount}
            >
              Delete Account
            </button>
          </div> */}

          {/* **************************************************************************************** */}
          {/* If user is successfully updated then we will display a success message that its updated. */}

          <div
            className="text-3xl mt-4 ml-8 responsive-text"
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            <p className="text-[#277946] mb-4 font-semibold font-sans">
              {updatedMessage ? "User is updated successfully" : ""}
            </p>

            <p className="font-semibold font-sans">
              {updatedMessage
                ? "After updating if you don't see the changes then Please! logout from your account and login again"
                : ""}
            </p>
          </div>

          {/* *************************************************************************************** */}
          {/* If user is successfully deleted then we will display a delete message that its deleted. */}

          <p className="text-red-700 text-3xl mt-3 ml-8 font-semibold font-sans">
            {deletedMessage ? "User is deleted successfully" : ""}
          </p>

          {/* */}
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

  padding: 9rem 0;

  /* */

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-text {
      font-size: 2rem;
      line-height: 1.3;
    }

    .responsive-login-form {
      font-size: 2rem;
    }

    .responsive-heading {
      font-size: 2rem;
    }

    .responsive-image-heading1 {
      font-size: 1.6rem;
    }

    .responsive-image-heading2 {
      font-size: 2rem;
    }

    .responsive-pagination {
      margin-top: -70px;
    }

    .responsive-profile {
      font-size: 2rem;
      margin-left: -37px;
    }

    .responsive-button {
      font-size: 1.7rem;
    }

    .responsive-update-button {
      font-size: 2.3rem;
      padding: 17px;
    }

    .responsive-delete-button {
      margin: auto;
      font-size: 2.4rem;
    }

    .responsive-icon-eye {
      margin-top: -45px;
      margin-left: 280px;
      font-size: 2.4rem;
    }

    /* */
  }

  /* */
`;
