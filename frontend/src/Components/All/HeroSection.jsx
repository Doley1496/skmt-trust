/* */

import styled from "styled-components";

const HeroSection = () => {
  /* */

  return (
    /* */

    <Wrapper>
      {/* */}

      <div className="row">
        {/* */}

        {/* ****************** */}
        {/* Heading and image. */}

        <div className="col-md-5">
          {/* */}

          {/* heading */}

          <div
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            <h1 className="mt-[40px] text-5xl text-[#41c769] font-serif font-bold">
              Welcome to
            </h1>

            <h1 className="text-3xl mt-5 uppercase font-sans font-bold">
              Swahid kamala miri trust
            </h1>

            <h1 className="text-3xl mt-5 pb-[10px] font-sans font-bold text-slate-800">
              About SKMT
            </h1>
          </div>

          {/* About us image. */}

          <div
            className="m-4 border rounded-lg overflow-hidden cursor-pointer"
            style={{ boxShadow: "0 0 30px rgba(0,0,0,0.5)" }}
          >
            <img
              src="newImages/kamalaStatue1.jpg"
              alt="hero-section-photo"
              className="object-cover hover:scale-105 transition-scale duration-300"
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          {/* */}
        </div>

        {/* ***************** */}
        {/* About us content. */}

        <div className="col-md-7">
          {/* */}

          <div className="ml-5 mt-5 font-bold">
            {/* */}

            <div
              className="mb-[40px]"
              style={{
                textAlign: "center",
                display: "block",
              }}
            >
              {/* */}

              <p className="text-[27px] text-[#14527C] m-4">
                ✸ Name of the Trust ✸
              </p>

              <p className="text-[18px] text-[#800000] mr-4">
                <span className="text-3xl responsive-arrow"> ➽ </span>
                <span> Swahid Kamala Miri Trust (SKMT) </span>
              </p>

              {/* */}
            </div>

            <div
              className="mb-[40px]"
              style={{
                textAlign: "center",
                display: "block",
              }}
            >
              {/* */}

              <p className="text-[27px] text-[#14527C] m-4">
                ✸ Office Address ✸
              </p>

              <p className="text-[18px] text-[#800000] mr-4">
                <span className="text-3xl responsive-arrow"> ➽ </span>
                <span>
                  Murang Okum, Veterinary Hospital Road Arengapara Golaghat
                  (Assam)
                </span>
              </p>

              {/* */}
            </div>

            <div
              className="mb-[40px]"
              style={{
                textAlign: "center",
                display: "block",
              }}
            >
              {/* */}

              <p className="text-[27px] text-[#14527C] m-4">
                ✸ Area of Activities ✸
              </p>

              <p className="text-[18px] text-[#800000] mr-4">
                <span className="text-3xl responsive-arrow"> ➽ </span>
                <span>
                  Area of Activities of the trust shall cover the whole areas of
                  Northeastern region of India
                </span>
              </p>

              {/* */}
            </div>

            <div
              className="mb-[40px]"
              style={{
                textAlign: "center",
                display: "block",
              }}
            >
              <p className="text-[27px] text-[#14527C] m-4 responsive-details1">
                ✸ Aim and Objective of the Trust ✸
              </p>
            </div>

            <div className="text-[15px] font-bold font-sans text-[#800000] ml-5 mr-5 leading-9">
              {/* */}

              <p className="responsive-aimAndObjective1 font-bold font-sans leading-10">
                (a) Publicity of Swahid Kamala Miri in wide manner.
              </p>

              <p className="responsive-aimAndObjective1 font-bold font-sans">
                (b) Annually an award will be provided to a renowned person of
                the country in the name of Swahid Kamala Miri.
              </p>

              <p className="responsive-aimAndObjective1 font-bold font-sans leading-10">
                (c) Development of Social, Economic, Educational, Cultural,
                Health and welfare of people
              </p>

              <p className="responsive-aimAndObjective1 font-bold font-sans">
                (d) Development of Games and sports and youth.
              </p>

              <p className="responsive-aimAndObjective1 font-bold font-sans">
                (e) Development of Science and Technology.
              </p>

              <p className="responsive-aimAndObjective1 font-bold font-sans">
                (f) Preservation of historic monuments.
              </p>

              <p className="responsive-aimAndObjective1 font-bold font-sans">
                (g) Rendering assistance to the people affected by natural
                calamities.
              </p>

              <p className="responsive-aimAndObjective1 font-bold font-sans">
                (h) Set up a digital museum nearby the Swahid Kamala Miri
                khetra.
              </p>

              <p className="responsive-aimAndObjective1 font-bold font-sans">
                (i) Every Year Swahid Kamala Miri Trust will published a book
                for literature development.
              </p>

              <p className="responsive-aimAndObjective1 font-bold font-sans">
                <span>
                  (j) Guidance to the unemployment youths for engaging
                  themselves in productive fields of activities such as
                  cultivation. of various type of crops, fishery, piggery,etc.
                  which shall immensely contribute towards economic health of
                  the society.
                </span>
              </p>

              <br />
            </div>

            {/* */}
          </div>

          {/* */}
        </div>

        {/* */}
      </div>

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

  padding: 4rem 0;

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-aimAndObjective1 {
      margin: 10px;
      font-weight: bold;
      font-size: 2rem;
      line-height: 1.7;
    }

    .responsive-arrow {
      font-size: 2.4rem;
    }

    /* */
  }

  /* */
`;

export default HeroSection;
