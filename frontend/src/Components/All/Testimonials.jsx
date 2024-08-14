/* */

import React from "react";

import styled from "styled-components";

import Card from "./Card.jsx";

/* ********************************************************************** */
/* Creating an array to store all the details for the testomials section. */

const testimonials = [
  {
    id: 1,
    name: "Bitul Saikia (Student)",
    image: "/mainImages/testimonials1.jpg",
    review:
      "Hello Everyone! my name is Bitul Saikia, I am very much delighted to be a part of SKMT trust's quiz competition. They were very kind and helpful while organizing the competition.",
  },

  {
    id: 2,
    name: "Deepak Borah (Trust helper)",
    image: "/mainImages/testimonials3.jpg",
    review:
      "I have been associated with SKMT trust from quite a long time and i am very much proud of their work towards our society. Our society is getting a helping hand from SKMT trust at every cost.",
  },

  {
    id: 3,
    name: "Ananta Gogoi (Student)",
    image: "/mainImages/testimonials2.jpg",
    review:
      "Hello! My name is Ananta Gogoi. I am very happy today for winning the painting competition organized by SKMT trust. I would like to say that all the trust members were very helpful in every aspects and provided us a good environment throughout the competition. ",
  },

  {
    id: 4,
    name: "Mohendranath Doley (Professor)",
    image: "/mainImages/testimonials5.jpg",
    review:
      "I am very thankfull to the SKMT trust for providing help to my college students in organizing various sports and games. And also helping financially for the college development and renovation.",
  },

  {
    id: 5,
    name: "Bipul Mili (Local resident)",
    image: "/mainImages/testimonials4.jpg",
    review:
      "As a village resident i would like to say that SKMT trust has always help us in our need. So, on behalf of our village i am very much thankfull to SKMT trust, and we hope SKMT trust always keep helping us in every need.",
  },
];

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const Testimonials = () => {
  /* */

  var settings = {
    /* */

    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 4,
    initialSlide: 0,
    // autoplay: true,
    // autoplaySpeed: 2500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    responsive: [
      /* */

      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },

      /* */
    ],

    /* */
  };

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  return (
    /* */

    <Wrapper>
      {/* */}

      <h5 className="text-center mb-[20px] mt-[60px] text-5xl font-semibold font-sans text-[#14527C]">
        ✸ Our Testimonials ✸
      </h5>

      {/* ******************************************************* */}
      {/* Creating a slider to slide some cards for testimonials. */}

      <Slider
        {...settings}
        style={{
          marginLeft: "40px",
          marginRight: "40px",
          marginBottom: "80px",
        }}
      >
        {/* */}

        {testimonials.map((testimonials, index) => (
          <div className="col-lg-3 col-md-4 hover:no-underline" key={index}>
            <div className="border rounded-lg overflow-hidden cursor-pointer h-auto">
              {/* */}

              <Card key={index} item={testimonials} />

              {/* */}
            </div>
          </div>
        ))}

        {/* */}
      </Slider>

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

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-heading {
      margin: auto;
    }

    .responsive-paragraph {
      font-size: 1.5rem;
    }

    .grid-two-column {
      grid-template-columns: repeat(2, 1fr);
    }

    /* */
  }

  /* */
`;

export default Testimonials;
