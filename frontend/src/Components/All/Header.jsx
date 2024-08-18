/* */

import React, { useState, useRef, useEffect } from "react";

import styled from "styled-components";

import { Link, NavLink } from "react-router-dom";

import { FaTimes } from "react-icons/fa";

import { CiMenuFries } from "react-icons/ci";

import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";

import { useSelector } from "react-redux";

import Dropdown from "./Dropdown.jsx";

function Header() {
  /* */

  /* Creating a logic to hide the dropdown menu when the user click on any part of the page. */
  const menuRef = useRef();
  const imgRef = useRef();

  const { currentUser } = useSelector((state) => state.user);

  const [openProfile, setOpenProfile] = useState(false);

  const [click, setClick] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  /* When the user will click outside any portion of the profile-pic then we will set the openProfile 
     array of the useState() hook using its setter function setOpenProfile() as false so that the 
     dropdown menu get's hidden immediately.
   
        To do that we will use useRef() hook of react.
   
      we will make two variable's menuRef and imgRef from useRef() hook and pass this varibles in the
      ref method of profile-pic and its Link tag.
  */

  window.addEventListener("click", (event) => {
    /* */

    if (event.target !== menuRef.current && event.target !== imgRef.current) {
      setOpenProfile(false);
    }

    /* */
  });

  const content = (
    /* */

    <>
      <div
        className={
          click
            ? `lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900 mt-[65px] h-[100vh]
               transition z-[10]`
            : `hidden`
        }
      >
        {/* */}

        <ul className="text-center text-xl py-[40px] mb-[40px] mt-[10px]">
          {/* */}

          {/*************************  <!-- Dropdown menu --> ***************************/}

          {/* Creating a ternary operator, when we will get the currentUser ie. when the user is
              logged-in then we will display his profile-pic otherwise we will display the Login text.

              And when the user will click on his profile-pic then we will set the openProfile array 
              of the useState() hook as true by using its setter function setOpenProfile() so that we 
              can display the dropdown menu. 

              And when this openProfile array becomes true we will display the dropdown menu.
          */}

          <div className="pt-3 pb-[30px]">
            {/* */}

            {openProfile && <Dropdown handleClick={handleClick} />}

            {localStorage.getItem("id") ? (
              <Link
                className="hover:text-slate-600 font-semibold text-white"
                onClick={() => setOpenProfile((previous) => !previous)}
                ref={menuRef}
              >
                <img
                  src={currentUser ? currentUser.avatar : ""}
                  alt="profile"
                  className="rounded-full h-[50px] w-[50px] object-cover ml-5 responsive-dropdown"
                  ref={imgRef}
                />
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-slate-700 text-[#eee6e8] rounded-lg uppercase hover:opacity-95
                disabled:opacity-80 w-[100%] font-serif text-[16px]
                hover:text-[#478C5C] responsive-login-button"
                onClick={() => setClick(!click)}
              >
                LogIn
              </Link>
            )}

            {/* */}
          </div>

          {/* ******************* */}
          {/* Coupon Results Page */}

          <li className="my-[10px]">
            <Link
              to="/couponResults"
              spy="true"
              smooth="true"
              className="my-[20px] py-[20px] border-b border-slate-800 hover:bg-800 hover:rounded
             hover:text-fuchsia-600 hover:border-fuchsia-600 responsive-content"
              onClick={() => setClick(!click)}
            >
              SKMT Coupon Results
            </Link>
          </li>

          <li className="my-[10px]">
            <Link
              to="/"
              spy="true"
              smooth="true"
              className="my-[20px] py-[20px] border-b border-slate-800 hover:bg-800 hover:rounded
             hover:text-fuchsia-600 hover:border-fuchsia-600 responsive-content"
              onClick={() => setClick(!click)}
            >
              Home
            </Link>
          </li>

          <li className="my-[10px]">
            <Link
              to="/about"
              spy="true"
              smooth="true"
              className="my-4 py-4 border-b border-slate-800 hover:bg-800 hover:rounded
              hover:text-fuchsia-600 hover:border-fuchsia-600 responsive-content"
              onClick={() => setClick(!click)}
            >
              About
            </Link>
          </li>

          <li className="my-[30px]">
            {/* */}

            <Link
              spy="true"
              smooth="true"
              onClick={() => setIsOpen((previous) => !previous)}
              className="my-4 py-4 border-b border-slate-800 hover:bg-800 hover:rounded
              hover:text-fuchsia-600 hover:border-fuchsia-600 responsive-content"
            >
              Our Gallery
            </Link>

            <div className="mt-[-24px] ml-[160px]">
              {!isOpen ? (
                <AiOutlineCaretDown className="m-1 p-1 h-8 text-[20px] mx-auto"></AiOutlineCaretDown>
              ) : (
                <AiOutlineCaretUp className="m-1 p-1 h-8 text-[20px] mx-auto"></AiOutlineCaretUp>
              )}
            </div>

            {isOpen && (
              /* */

              <div className="flex flex-col my-[35px] bg-[#E2E6D9] rounded-lg p-[10px] w-[80%] mx-auto">
                {/* */}

                <li className="">
                  <Link
                    to={"/photoGallery"}
                    spy="true"
                    smooth="true"
                    className="border-b-2 border-slate-900 hover:bg-[#DDFFE7] hover:rounded
                  hover:text-fuchsia-600 hover:border-fuchsia-600 transition cursor-pointer 
                  text-[#29A0B1] text-[20px] font-bold font-sans"
                    onClick={() => setClick(!click)}
                  >
                    Photo Gallery
                  </Link>
                </li>

                <li className="mt-[14px]">
                  <Link
                    to={"/videoGallery"}
                    spy="true"
                    smooth="true"
                    className="border-b-2 border-slate-900 hover:bg-[#DDFFE7] hover:rounded
                  hover:text-fuchsia-600 hover:border-fuchsia-600 transition cursor-pointer 
                  text-[#29A0B1] text-[20px] font-bold font-sans"
                    onClick={() => setClick(!click)}
                  >
                    Video Gallery
                  </Link>
                </li>

                {/* */}
              </div>

              /* */
            )}

            {/* */}
          </li>

          <li className="mt-[40px]">
            <Link
              to="/service"
              spy="true"
              smooth="true"
              className="my-4 py-4 border-b border-slate-800 hover:bg-800 hover:rounded
              hover:text-fuchsia-600 hover:border-fuchsia-600 responsive-content"
              onClick={() => setClick(!click)}
            >
              Our Services
            </Link>
          </li>

          <li className="my-[10px]">
            <Link
              to="/competitions"
              spy="true"
              smooth="true"
              className="my-4 py-4 border-b border-slate-800 hover:bg-800 hover:rounded
              hover:text-fuchsia-600 hover:border-fuchsia-600 responsive-content"
              onClick={() => setClick(!click)}
            >
              Our Competitions
            </Link>
          </li>

          {/* */}
        </ul>

        {/* */}
      </div>
    </>

    /* */
  );

  useEffect(() => {}, [currentUser]);

  return (
    /* */

    <Wrapper className="bg-slate-900 py-[30px]">
      <div className="h-[auto] flex justify-between z-50 text-white lg:py-5 px-20">
        {/* */}

        {/* **************************************************************************************** */}
        {/* Creating a link with the company logo when click it will take us to go to the home-page. */}

        <div className="flex flex-1 items-center">
          <NavLink to="/">
            <h1 className="font-bold text-5xl border-2 border-gray-600 bg-[#DBA40E] rounded-lg px-2 py-2">
              <span className="text-gray-100">SK</span>
              <span className="text-[#59981A]">MT</span>
            </h1>
          </NavLink>
        </div>

        <div className="lg:flex md:flex items-center justify-end font-normal hidden">
          <div className="flex-10 ">
            <ul className="flex gap-8 text-[18px] mt-3">
              {/* */}

              {/* ******************* */}
              {/* Coupon Results Page */}

              <li>
                <Link
                  to="/couponResults"
                  spy="true"
                  smooth="true"
                  className="hover:text-fuchsia-600 transition border-b-2 border-slate-900
                 hover:border-fuchsia-600 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  SKMT Coupon Results
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  spy="true"
                  smooth="true"
                  className="hover:text-fuchsia-600 transition border-b-2 border-slate-900
                 hover:border-fuchsia-600 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  spy="true"
                  smooth="true"
                  className="hover:text-fuchsia-600 transition border-b-2 border-slate-900
                 hover:border-fuchsia-600 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
              </li>

              {/* **************************************************************** */}
              {/* Creating a Dropdown menu to display the photo and video gallery. */}

              <li className="flex flex-row" spy="true" smooth="true">
                {/* */}

                <Link
                  spy="true"
                  smooth="true"
                  className="hover:text-fuchsia-600 transition border-b-2 border-slate-900
                 hover:border-fuchsia-600 cursor-pointer"
                  onClick={() => setIsOpen((previous) => !previous)}
                >
                  Our Gallery
                </Link>

                {!isOpen ? (
                  <AiOutlineCaretDown className="m-1 p-1 h-8"></AiOutlineCaretDown>
                ) : (
                  <AiOutlineCaretUp className="m-1 p-1 h-8"></AiOutlineCaretUp>
                )}

                {isOpen && (
                  /* */

                  <div className="flex flex-col p-[10px] mt-[40px] ml-[-120px] bg-[#E2E6D9] rounded-lg">
                    {/* */}

                    <Link
                      to={"/photoGallery"}
                      className="hover:text-fuchsia-600 transition border-b-2 border-slate-900
                    hover:border-fuchsia-600 cursor-pointer text-[#189EA9] font-bold font-sans"
                      onClick={() => setIsOpen((previous) => !previous)}
                    >
                      Photo Gallery
                    </Link>

                    <Link
                      to={"/videoGallery"}
                      className="hover:text-fuchsia-600 transition border-b-2 border-slate-900
                    hover:border-fuchsia-600 cursor-pointer mt-[8px] text-[#29A0B1] font-bold font-sans"
                      onClick={() => setIsOpen((previous) => !previous)}
                    >
                      Video Gallery
                    </Link>

                    {/* */}
                  </div>

                  /* */
                )}

                {/* */}
              </li>

              <li>
                <Link
                  to="/service"
                  spy="true"
                  smooth="true"
                  className="hover:text-fuchsia-600 transition border-b-2 border-slate-900
                 hover:border-fuchsia-600 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Our Services
                </Link>
              </li>

              <li>
                <Link
                  to="/competitions"
                  spy="true"
                  smooth="true"
                  className="hover:text-fuchsia-600 transition border-b-2 border-slate-900
                 hover:border-fuchsia-600 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Our Competitions
                </Link>
              </li>

              {/*************************  <!-- Dropdown menu --> ***************************/}

              {/* Creating a ternary operator, when we will get the currentUser ie. when the user is
                  logged-in then we will display his profile-pic otherwise we will display the Login text.

                  And when the user will click on his profile-pic then we will set the openProfile array 
                  of the useState() hook as true by using its setter function setOpenProfile() so that we 
                  can display the dropdown menu. 

                  And when this openProfile array becomes true we will display the dropdown menu.
              */}

              <div className="">
                {openProfile && <Dropdown />}

                {localStorage.getItem("id") ? (
                  <NavLink
                    className="hover:text-slate-600 font-semibold text-white"
                    onClick={() => setOpenProfile((previous) => !previous)}
                    ref={menuRef}
                  >
                    <img
                      src={currentUser ? currentUser.avatar : ""}
                      alt="profile"
                      className="rounded-full h-[50px] w-[50px] object-cover ml-9 mr-[-20px] mt-[-10px]"
                      ref={imgRef}
                    />
                  </NavLink>
                ) : (
                  <li>
                    <NavLink to="/login">
                      <button
                        className="bg-slate-700 text-[#eee6e8] rounded-lg uppercase hover:opacity-95
                        disabled:opacity-80 w-[100%] font-serif mt-[-5px] text-3xl
                      hover:text-[#478C5C] md:ml-8 md:py-3 md:px-4"
                      >
                        LogIn
                      </button>
                    </NavLink>
                  </li>
                )}
              </div>

              {/* */}
            </ul>
          </div>
        </div>

        {/* **************************************************************************** */}
        {/* When click will be true ie.. When user click on the <CiMenuFries /> react-icon 
            (ie.. menu icon) then we will show the contents present in the content variable. 
        */}

        <div>{click && content}</div>

        {/* ****************************************************************************************** */}
        {/* When click will be true ie.. When user click on the <CiMenuFries /> react-icon (ie.. menu icon) 
            then we will show the <FaTimes /> react-icon (ie.. close icon) otherwise we will show
            <CiMenuFries /> react-icon (ie.. menu icon).
        */}

        <button
          className="block sm:hidden transition responsive-button"
          onClick={() => setClick(!click)}
        >
          {click ? <FaTimes /> : <CiMenuFries />}
        </button>

        {/* */}
      </div>
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

    .responsive-dropdown {
      margin-left: 245px;
      margin-top: -40px;
    }

    .responsive-content {
      font-size: 3rem;
    }

    .responsive-button {
      font-size: 3rem;
    }

    .responsive-login-button {
      font-size: 2.5rem;
      padding: 10px;
      background-color: #14527c;
    }

    .responsive-gallery {
      margin: auto;
    }

    /* */
  }

  /* */
`;

export default Header;
