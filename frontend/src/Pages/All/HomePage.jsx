/* */

import React, { useState } from "react";

import Layout from "../../Components/All/Layout.jsx";

import styled from "styled-components";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { NavLink, Link } from "react-router-dom";

import Testimonials from "../../Components/All/Testimonials.jsx";

import NewsAndEvents from "../../Components/All/NewsAndEvents.jsx";

/* ****************************************************** */
/* Function for next-arrow ie. to move to the next image. */

function NextArrow(props) {
  /* */

  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        background: "grey",
        border: "2px solid white",
        height: "7vh",
        width: "26px",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "5px",
        fontSize: "2rem",
      }}
      onClick={onClick}
    />
  );

  /* */
}

/* ************************************************************** */
/* Function for previous-arrow ie. to move to the previous image. */

function PrevArrow(props) {
  /* */

  const { className, style, onClick } = props;

  return (
    /* */

    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        background: "grey",
        border: "2px solid white",
        height: "7vh",
        width: "26px",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "5px",
        fontSize: "2rem",
      }}
      onClick={onClick}
    />
  );

  /* */
}

export default function HomePage() {
  /* */

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    /* */
  };

  const services = [
    /* */

    {
      id: 1,
      image: "/newImages/gaon1.jpeg",
      name: "Exploring",
      description:
        "Enjoy the exciting views of the river brahmaputra and its surroundings",
      link: "/exploration",
    },

    {
      id: 2,
      image: "/newImages/gaon17.jpeg",
      name: "Boating",
      description: "Enjoy boating in the nearby lakes of river brahmaputra",
      link: "/boating",
    },

    {
      id: 3,
      image: "/mainImages/cottage1.jpg",
      name: "Cottages",
      description: "Enjoy staying in the traditional bamboo cottages",
      link: "/cottage",
    },

    {
      id: 4,
      image: "/newImages/fish1.jpeg",
      name: "Fishing",
      description: "Catch fish in the river brahmaputra",
      link: "/fishing",
    },

    /* */
  ];

  const [loading, setLoading] = useState(false);

  /* ************************************************************************************* */
  /* ************************************************************************************* */
  /* ************************************************************************************* */
  /* ************************************************************************************* */

  /* Returning the content that we will display in the "/" route.
     because for this route we have provided component {<HomePage />}
     ie.. <Route path="/" element={<HomePage />} />
  */

  return (
    /* */

    <Wrapper>
      {/* */}

      <Layout title={"Home-Page"}>
        {/* */}

        <div className="row mb-[40px] responsive-heading-content">
          {/* */}

          {/* ********************************* */}
          {/* 1st part contains the trust logo. */}

          <div className="col-md-3">
            {/* */}

            <Link to="/" className="">
              <img
                src="/newImages/logo.png"
                alt="contactus"
                style={{
                  width: "100%",
                  height: "100%",
                  textAlign: "center",
                  display: "block",
                }}
                className="mt-[-25px]"
              />
            </Link>

            <h2
              className="text-[15px] text-[#14527C] font-bold font-sans uppercase text-center mt-[-25px]
              hover:underline cursor-pointer responsive-heading"
            >
              Swahid Kamala
              <br /> <span className="font-bold font-sans"> Miri Trust</span>
            </h2>

            {/* */}
          </div>

          {/* *********************************************** */}
          {/* 2nd part contains a description of our website. */}

          <div className="col-md-9 flex flex-col gap-6 py-[60px] pl-20 max-w-5xl responsive-whole-content">
            {/* */}

            <h1 className="text-slate-700 font-bold font-sans text-3xl lg:text-6xl responsive-heading1">
              Helping humanity for a better
              <span className="text-slate-500 pl-2"> future </span>
              <br />
            </h1>

            <div className="text-[#14527C] text-2xl font-semibold font-sans sm:text-md responsive-heading2">
              SKMT is a community trust build in the name of Swahid Kamala Miri
              the braveyard freedom fighter of north-east india for the socio
              economic development of the entire north east India. <br />
              We are serving help for a better world.
            </div>

            <Link
              to={"/"}
              className="text-2xl text-blue-800 font-bold hover:underline ml-4 responsive-heading-link"
            >
              Let's get started...
            </Link>

            {/* */}
          </div>

          {/* */}
        </div>

        {/* *************************************** */}
        {/* Creating a slider to slide some images. */}

        <Slider
          {...settings}
          style={{ marginLeft: "40px", marginRight: "40px" }}
        >
          {/* */}

          <div className="card mt-5 ">
            <img
              src="newImages/ticket2.jpg"
              alt="img"
              // style={{
              //   width: "100%",
              //   height: "500px",
              //   backgroundRepeat: "no-repeat",
              // }}
              className="rounded-lg w-[100%] h-[80vh] responsive-sliding-image"
            />
          </div>

          <div className="card mt-5 ">
            <img
              src="mainImages/tanilandNews.jfif"
              alt="img"
              className="rounded-lg w-[100%] h-[80vh] responsive-sliding-image"
            />
          </div>

          <div className="card mt-5 ">
            <img
              src="others/gaon15.jpeg"
              alt="img"
              className="rounded-lg w-[100%] h-[80vh] responsive-sliding-image"
            />
          </div>

          <div className="card mt-5">
            <img
              src="newImages/gaon1.jpeg"
              alt="img"
              className="rounded-lg w-[100%] h-[80vh] responsive-sliding-image"
            />
          </div>

          <div className="card mt-5">
            <img
              src="newImages/gaon6.jpeg"
              alt="img"
              className="rounded-lg w-[100%] h-[80vh] responsive-sliding-image"
            />
          </div>

          <div className="card mt-5">
            <img
              src="newImages/gaon11.jpeg"
              alt="img"
              className="rounded-lg w-[100%] h-[80vh] responsive-sliding-image"
            />
          </div>

          <div className="card mt-5">
            <img
              src="/newImages/fish19.jpeg"
              alt="img"
              className="rounded-lg w-[100%] h-[80vh] responsive-sliding-image"
            />
          </div>

          <div className="card mt-5">
            <img
              src="/newImages/mishingfood3.jpg"
              alt="img"
              className="rounded-lg w-[100%] h-[80vh] responsive-sliding-image"
            />
          </div>

          {/* */}
        </Slider>

        {/*  ABOUT : */}

        <section className="my-5">
          {/* */}

          <div className="py-5">
            <h2 className="text-center underline text-4xl text-[#437c90] font-sans font-bold">
              About Swahid kamala Miri
            </h2>
          </div>

          <div className="container-fluid">
            <div className="row">
              {/* */}

              <div className="col-lg-4 col-md-5 col-12 mb-3">
                <img
                  src="mainImages/kamalaMiri.jpg"
                  className="rounded-2xl "
                  style={{ height: "90%", width: "70%", marginLeft: "60px " }}
                />
              </div>

              <div className="col-lg-6 col-md-4 col-12">
                <p
                  className="py-3 mt-5 mx-4 text-[#14527C] font-semibold font-sans leading-[25px] line-clamp-7
                   text-[15px] responsive-paragraph"
                >
                  Swahid Kamala Miri (Kamal Loying) was a legendary unsung hero
                  of the freedom movement of India. He was one and only person
                  from Mising community of Assam who sacrificed his life in the
                  freedom struggle of India. Besides a freedom fighter of Indian
                  freedom movement he was a political leader, social reformer
                  and a man of raw soil. As a political leader he boldly
                  participated in the Indian National Congress and formed first
                  political organisation of Mising Community i.e. MIRI CONGRESS
                  in the year 1937 A. D ............
                </p>

                <Link
                  to="/kamalaMiri"
                  className="btn btn-success rounded-lg mt-3 px-5 py-3 mx-5 font-semibold font-sans text-[15px]
                  hover:bg-red-900"
                >
                  Read More
                </Link>

                {/* */}
              </div>

              {/* */}
            </div>
          </div>

          {/* */}
        </section>

        {/* Beautiful moments captured : */}

        <section>
          {/* */}

          <h3
            className="text-[40px] mb-[30px] mt-[60px] font-bold font-serif text-center 
            responsive-moments-captured"
          >
            Beautiful Moments Captured
          </h3>

          {/* ********************** */}
          {/* Videos of Dusutimukh : */}

          <div className="flex flex-row gap-4 mx-4 my-[40px] justify-center responsive-video">
            <video
              src="videos/Dusutimukh1.mp4"
              width="600"
              height="300"
              controls="controls"
              autoplay="true"
              className="rounded-lg"
            />

            <video
              src="videos/Dusutimukh2.mp4"
              width="600"
              height="300"
              controls="controls"
              autoplay="true"
              className="rounded-lg"
            />
          </div>

          {/* ********************** */}
          {/* Images of Dusutimukh : */}

          <div className="container-fluid">
            <div className="row ml-[20px] responsive-moments-captured1">
              {/* */}

              <div className="col-lg-6 col-md-4 col-12 mb-3">
                <img
                  src="newImages/flower.webp"
                  className="rounded-2xl ml-[30px] responsive-image"
                  style={{ height: "99%", width: "90%" }}
                />
              </div>

              <div className="col-lg-6 col-md-4 col-12">
                {/* */}

                <div className="">
                  <div className="col-lg-10 col-md-4 col-12">
                    <img
                      src="newImages/sunsetfishing.jpg"
                      className="rounded-2xl ml-[10px] responsive-image"
                      style={{ height: "60%", width: "100%" }}
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-lg-5 col-md-4 col-12 mb-3 mt-3">
                    <img
                      src="others/tea1.jpg"
                      className="rounded-2xl ml-[10px] responsive-image"
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>

                  <div className="col-lg-5 col-md-4 col-12 mb-3 mt-3">
                    <img
                      src="others/kamalaMiri1.jpg"
                      className="rounded-2xl ml-[10px] responsive-image"
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-5 col-md-4 col-12 mb-3 mt-3">
                    <img
                      src="newImages/gaon111.jpeg"
                      className="rounded-2xl ml-[10px] responsive-image"
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>

                  <div className="col-lg-5 col-md-4 col-12 mb-3 mt-3">
                    <img
                      src="newImages/assam2.jpg"
                      className="rounded-2xl ml-[10px] responsive-image"
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>
                </div>

                {/* */}
              </div>

              {/* */}
            </div>
          </div>

          {/* */}
        </section>

        <NewsAndEvents />

        {/* Services : */}

        <section>
          {/* */}

          <div className="mb-[30px] mt-[60px]">
            <h5 className="text-center text-5xl font-semibold font-sans text-[#14527C]">
              ✸ Our Services ✸
            </h5>
          </div>

          <div className="profile-area">
            <div className="container">
              {/* */}

              <div className="row responsive">
                {/* */}

                {/* When we get the loading as true(ie. when the web-page is refreshing)  
                  then we will display Loading...  
              */}

                {loading && (
                  <p className="text-xl text-slate-700 text-center w-full">
                    Loading...
                  </p>
                )}

                {/* Dynamically Accessing the above products array using map function and passing
                    all its data's in the product parameter.
                */}

                {services?.map((service) => (
                  /* */

                  <NavLink
                    key={service.id}
                    to={service.link}
                    className="col-lg-3 col-md-4 mb-4 hover:no-underline"
                  >
                    <div
                      className="border rounded-2xl overflow-hidden cursor-pointer h-[300px]"
                      style={{ boxShadow: "0 0 30px rgba(0,0,0,0.5)" }}
                    >
                      {/* */}

                      {/* ***************** IMAGE **************** */}
                      {/* Displaying 1st the image of the service. */}

                      <div className="">
                        <img
                          src={service.image}
                          alt="service-cover"
                          style={{ width: "100%", height: "200px" }}
                          className="sm:h-[170px] w-full object-cover hover:scale-105 transition-scale 
                          duration-300 rounded-lg pt-2 responsive-img "
                        />
                      </div>

                      {/* **************  NAME AND DESCRIPTION  ************* */}
                      {/* Displaying the name and description of the service. */}

                      <div className="mt-3 px-3">
                        {/* */}

                        {/* ************** NAME *************** */}
                        {/* Displaying the name of the service. */}

                        <h4 className="text-center text-[20px] text-[#800000] font-serif pb-3">
                          {service.name}
                        </h4>

                        {/* ************** DESCRIPTION *************** */}
                        {/* Displaying the description of the service. */}

                        <p className="line-clamp-2 font-mono font-semibold text-[15px]">
                          {service.description}
                        </p>

                        {/* */}
                      </div>

                      {/* */}
                    </div>
                  </NavLink>

                  /* */
                ))}

                {/* */}
              </div>

              {/* */}
            </div>
          </div>

          {/* */}
        </section>

        <Testimonials />

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

    .responsive-heading-content {
      margin-bottom: -20px;
    }

    .responsive-whole-content {
      padding-left: 0px;
      padding-top: 25px;
    }

    .responsive-heading {
      font-size: 2.2rem;
    }

    .responsive-heading1 {
      font-size: 1.7rem;
      text-align: center;
      display: block;
    }

    .responsive-heading2 {
      margin-left: 14px;
      margin-right: 14px;
      text-align: center;
      display: block;
    }

    .responsive-heading-link {
      text-align: center;
      display: block;
    }

    .responsive-paragraph {
      font-size: 1.7rem;
    }

    .responsive-image {
      margin: auto;
    }

    .responsive-readMore {
      padding-left: 100px;
    }

    .responsive-heading1 {
      font-size: 1.9rem;
      line-height: 1.5;
    }

    .responsive-moments-captured {
      margin-top: 40px;
      font-size: 2.7rem;
    }

    .responsive-moments-captured1 {
      margin: auto;
    }

    .responsive-sliding-image {
      height: 25vh;
    }

    .responsive-video {
      display: grid;
    }

    /* */
  }

  /* */
`;
