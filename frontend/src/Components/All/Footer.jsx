/* */

import React, { useState } from "react";

import styled from "styled-components";

import { Link, NavLink, useNavigate } from "react-router-dom";

import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

import { toast } from "react-toastify";

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Footer = () => {
  /* */

  const navigate = useNavigate();

  const [Inputs, setInputs] = useState({
    email: "",
  });

  const change = (event) => {
    /* */

    setInputs({ ...Inputs, [event.target.id]: event.target.value });

    /* */
  };

  const handleEmailSubscription = async (event) => {
    /* */

    try {
      /* */

      event.preventDefault();

      const res = await fetch(`${VITE_SERVER_URL}/api/user/emailSubscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Inputs),
        credentials: "include",
      });

      const data = await res.json();

      if (data.success === false) {
        /* */

        toast.error(data.message);

        return;
      }

      navigate("/emailSubscription");

      setInputs({
        email: "",
      });

      toast.success("You email is submitted successfully!");

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      toast.error("Something went wrong. Please try again later!");

      /* */
    }

    /* */
  };

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  return (
    /* */

    <Wrapper>
      {/* */}

      {/* ************** */}
      {/* Footer section */}

      <footer className="mt-5">
        {/* */}

        {/* ***************************** */}
        {/*    Footer Header section.     */}

        <div className="grid grid-four-column">
          {/* */}

          {/* ************** */}
          {/* About section. */}

          <div className="footer-about mt-[-80px]">
            {/* */}

            <Link to="/" className="">
              <img
                src="/newImages/logo.png"
                alt="logo"
                style={{ width: "40%" }}
                className="text-center ml-[100px] responsive-logo"
              />
            </Link>

            <p className="mt-3 font-bold font-sans text-[#bb4b4b] text-3xl ml-3">
              Helping humanity for a better world
            </p>

            {/* */}
          </div>

          {/* ************************ */}
          {/* Email subscribe section. */}

          {/* */}

          <div>
            <h3 className="text-[#bb4b4b] text-3xl mb-5 font-bold font-sans">
              Subscribe to get important updates
            </h3>

            <form onSubmit={handleEmailSubscription}>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="YOUR E-MAIL ID"
                required
                className="text-[17px] p-3 py-[7px] font-bold font-sans pt-3 rounded-lg"
                value={Inputs.email}
                onChange={change}
              />

              <button
                type="submit"
                className=" bg-indigo-500 text-white rounded-lg font-bold uppercase p-3 pb-[6px] 
                  ml-[-10px] text-[18px]"
              >
                Subscribe
              </button>

              {/* <button
                  type="submit"
                  className=" ml-[-39px] pt-[-20px] text-gray-700 font-bold uppercase pb-3 text-[27px]"
                >
                  <RiSendPlaneFill />
                </button> */}
            </form>
          </div>

          {/* */}

          {/* ************ */}
          {/* Social Icons */}

          <div className="footer-social">
            {/* */}

            <h3 className="text-[#bb4b4b] text-3xl font-bold font-serif mb-5 mr-7">
              Follow Us On
            </h3>

            <div className="footer-social--icons">
              {/* */}

              <div>
                <Link to="https://www.facebook.com/profile.php?id=61559604628336&mibextid=ZbWKwL">
                  <FaFacebook className="icons responsive-icons" />
                </Link>
              </div>

              <div>
                <Link to="https://www.instagram.com/skmttrust?utm_source=qr&igsh=cjN1dXlmNDNwZjR6">
                  <FaInstagram className="icons responsive-icons" />
                </Link>
              </div>

              <div>
                <Link to="https://www.youtube.com">
                  <FaYoutube className="icons responsive-icons" />
                </Link>
              </div>

              {/* */}
            </div>

            {/* */}
          </div>

          {/* ****************** */}
          {/* Contact us section */}

          <div className="">
            {/* */}

            <h3 className="text-[#bb4b4b] mb-3 text-4xl font-bold font-serif">
              Call Us
            </h3>

            <div className="text-gray-300 text-[16px] font-bold font-sans">
              <p> +91 70863-67457</p>
              <p> +91 94011-87976</p>
              <p> +91 94016-63622</p>
            </div>

            {/* */}
          </div>

          {/* */}
        </div>

        {/* ***************************** */}
        {/*    Footer Bottom section.     */}

        <hr className="mb-5 mt-5 text-[#D8CEE6]" />

        <div className="grid grid-two-column">
          {/* */}

          <div className="text-2xl text-[#D8CEE6] font-bold font-sans m-3 responsive-copyright">
            {/* */}

            <span className=""> Copyright </span>

            <span className="text-[21px] m-2 font-bold responsive-copyright1">
              {" "}
              ©{" "}
            </span>

            <span>{new Date().getFullYear()} SKMT All Rights Reserved </span>

            {/* */}
          </div>

          {/******************************************************************* */}
          {/* Creating a link to go to the PRIVACY POLICY page,  TERMS & CONDITIONS 
                page and CONTACT page and FAQ page.
            */}

          <div className="mt-3 justify-between mx-auto">
            {/* */}

            <NavLink
              to="/terms"
              className="text-[#D8CEE6] text-[18px] font-sans mr-5 responsive-link"
            >
              TERMS & CONDITIONS
            </NavLink>

            <NavLink
              to="/policy"
              className="text-[#D8CEE6] text-[18px] font-sans mr-5 responsive-link"
            >
              PRIVACY POLICY
            </NavLink>

            <NavLink
              to="/faq"
              className="text-[#D8CEE6] text-[18px] font-sans mr-5 responsive-link"
            >
              FAQ's
            </NavLink>

            <NavLink
              to="/contact"
              className="text-[#D8CEE6] text-[18px] font-sans mr-5 responsive-link"
            >
              CONTACT US
            </NavLink>

            {/* */}
          </div>

          {/* */}
        </div>

        {/* ************************* */}
        {/* Developer details section */}

        <div
          className="pt-[40px]"
          style={{ textAlign: "center", display: "block" }}
        >
          <h3 className="text-gray-300 text-center text-2xl font-sans font-bold mt-10 responsive-text">
            ✸ Design And Developed By Doley Tech (9101134037) ✸
          </h3>
        </div>

        {/* */}
      </footer>

      {/* */}
    </Wrapper>

    /* */
  );

  /* */
};

/* **************************************************************************************** */
/* Using media-queries of styled of styled-components we are providing responsiveness for 
   mobile size and storing in a variable Wrapper. This Wrapper will be use to wrap the whole 
   elements we want to return.
*/
/* **************************************************************************************** */

const Wrapper = styled.section`
  /* */

  .grid-two-column {
    grid-template-columns: repeat(2, 1fr);
    margin: 15px;
  }

  .grid-four-column {
    grid-template-columns: 1fr 1.2fr 0.5fr 0.8fr;
    text-align: center;
  }

  footer {
    padding: 14rem 0 9rem 0;

    background-color: ${({ theme }) => theme.colors.footer_bg};

    .footer-social--icons {
      display: flex;
      gap: 2rem;

      div {
        padding: 0.5rem;
        border-radius: 50%;
        border: 2px solid ${({ theme }) => theme.colors.white};
        hover: opacity-75;

        .icons {
          color: ${({ theme }) => theme.colors.white};
          font-size: 2rem;
          position: relative;
          cursor: pointer;
        }
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-logo {
      margin: auto;
    }

    .grid-two-column {
      display: flex;
      flex-direction: column;
      align-items: center;
      display: "block";
    }

    .grid-four-column {
      margin-left: 3px;
      margin-right: 3px;
      padding: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    footer {
      padding: 9rem 0 9rem 0;
    }

    .responsive-copyright {
      font-size: 1.9rem;
    }

    .responsive-copyright1 {
      font-size: 2rem;
    }

    footer {
      padding: 14rem 0 9rem 0;

      background-color: ${({ theme }) => theme.colors.footer_bg};

      .footer-social--icons {
        display: flex;
        gap: 2rem;

        div {
          padding: 0.5rem;
          border-radius: 50%;
          border: 2px solid ${({ theme }) => theme.colors.white};
          hover: opacity-75;

          .icons {
            color: ${({ theme }) => theme.colors.white};
            font-size: 3rem;
            position: relative;
            cursor: pointer;
          }
        }
      }
    }

    .responsive-star {
      font-size: 3rem;
      margin: auto;
    }

    .responsive-star1 {
      font-size: 3rem;
      margin: auto;
    }

    .responsive-text {
      font-size: 1.9rem;
      margin-bottom: 30px;
      margin-left: 4px;
      margin-right: 4px;
    }

    .responsive-link {
      display: flex;
      align-items: center;
      display: "block";
    }

    .responsive-call {
      align-items: center;
      display: "block";
    }

    /* */
  }

  /* */
`;

export default Footer;
