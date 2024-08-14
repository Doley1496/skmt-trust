/* */

import React from "react";

import Layout from "../../Components/All/Layout.jsx";

import styled from "styled-components";

export default function DusutimukhPage() {
  /* */

  return (
    /* */

    <Wrapper className="fonts">
      {/* */}

      <Layout title={"Home-Page"}>
        {/* */}

        <section className="my-5">
          {/* */}

          {/* Heading Image : */}

          <div className="">
            <img
              src="newImages/gaon11.jpeg"
              className="rounded-2xl ml-[30px] responsive-image1"
              style={{
                height: "90%",
                width: "95%",
              }}
            />
          </div>

          <div className="my-4">
            <img
              src="mainImages/dusutimukhBill.jpg"
              className="rounded-2xl ml-[30px] responsive-image1"
              style={{
                height: "90%",
                width: "95%",
              }}
            />
          </div>

          {/* Trust Objectives : */}

          <div className="container-fluid mt-5">
            <div className="row">
              {/* */}

              <div className="col-lg-4 col-md-4 col-12 mb-3">
                <img
                  src="mainImages/dusutimukhBill2.jpg"
                  className="rounded-2xl ml-[30px] mt-[90px] responsive-image"
                  style={{ height: "90%", width: "90%" }}
                />
              </div>

              <div className="col-lg-7 col-md-4 col-12 mt-[70px]">
                {/* */}

                <div className="py-5">
                  <h2 className="text-center text-5xl text-[#437c90] font-sans font-bold">
                    About Borbeel(Dusutimukh) Eco-tourism
                  </h2>
                </div>

                <p
                  className="py-3 mt-5 mr-7 text-[#14527C] font-bold font-sans leading-10 
                   text-[18px] responsive-paragraph"
                >
                  On 15th August, 2013 we the SKMT trust has decided to build a
                  eco camp besides the Brahmaputra river and so form a proposal
                  to set up the eco tourism development board. The initiative
                  would help in the development of the local community and also
                  contribute in the tourism sector of Assam. It will do
                  immensely in protecting the wildlife, creating awareness about
                  it, encouraging eco-tourism, forest safaris. and also prevent
                  damage to eco-system in the name of tourism. Considering that
                  multitude of tourists visiting India and the domestic tourists
                  do visit destinations that fall in the categories of Eco
                  tourism and nature based tourism; it is pertinent that studies
                  in the sector will add value and bring about positive growth
                  and development if approached from a 360° angle. Assam has
                  always been a forefront of many aspects of tourism promotion
                  and off late there has been a qualitative churn and an
                  intensive focus on Eco-tourism and so is Dusutimukh. The
                  creation of the Borbeel(Dusutimukh) Eco-tourism Development
                  Board in 2013 has provided a fillip to bring in a new
                  structure, a policy, create guidelines and frameworks,
                  awareness and education, and provide opportunities for
                  training and capacity building amongst the stakeholders,
                  besides standards and certification.
                </p>

                {/* */}
              </div>

              <div
                className="py-3 mt-5 text-[#14527C] font-bold font-sans leading-10
                text-[16px] responsive-paragraph ml-[80px]"
              >
                <h3 className="text-4xl mx-3 my-5 responsive-heading leading-10">
                  The objectives of the Borbeel(Dusutimukh) Eco-tourism board
                  would primarily be:
                </h3>

                <p className="responsive-paragraph1">
                  <span>
                    1. To create awareness regarding the conservation of forests
                    and wildlife amongst the people in general and children and
                    youth, in particular.
                  </span>
                </p>

                <p className="responsive-paragraph1">
                  <span>
                    2. To encourage and promote tourism activities in the
                    country in general and the State of Assam, in particular.
                  </span>
                </p>

                <p className="responsive-paragraph1">
                  <span>
                    3. To encourage local community involvement in eco-tourism
                    and provide greater employment opportunities and economic
                    benefits to the local people.
                  </span>
                </p>

                <p className="responsive-paragraph1">
                  <span>
                    4. To assist in formulation of policies, laws and guidelines
                    for organized development of eco-tourism activities in the
                    state.
                  </span>
                </p>

                <p className="responsive-paragraph1">
                  <span>
                    5. To conduct research and impact-studies in eco-tourism
                    areas.
                  </span>
                </p>

                <p className="responsive-paragraph1">
                  <span>
                    6. To promote eco-tourism as a front line non consumptive
                    activity of Forest Department.
                  </span>
                </p>

                <p className="responsive-paragraph1">
                  <span>
                    7. To develop good practices to be followed by eco-tourism
                    operators.
                  </span>
                </p>

                <p className="responsive-paragraph1">
                  <span>
                    8. To standardize and operate certification of eco-tourism
                    operators.
                  </span>
                </p>

                <p className="responsive-paragraph1">
                  9. To train and certify nature guides.
                </p>

                <p className="responsive-paragraph1">
                  <span>
                    10. To produce literature and electronic media material
                    required for nature education and eco-tourism promotion.
                  </span>
                </p>

                <p className="responsive-paragraph1">
                  <span>
                    11. To facilitate linkages between public and private
                    operators in the cause of conservation of wildlife.
                  </span>
                </p>

                <p className="mr-[100px] responsive-paragraph1">
                  <span>
                    12. To coordinate and liaise with national international
                    bodies, experts and funding agencies and receive
                    contribution and funds from Government of India, State
                    Government, National and International funding agencies etc.
                  </span>
                </p>

                <p className="responsive-paragraph1">
                  <span>
                    13. To encourage local community involvement in eco-tourism.
                  </span>
                </p>

                <p className="responsive-paragraph1">
                  <span>
                    14. To maintain and facilitate eco-tourism activities inside
                    the parks and forest areas.
                  </span>
                </p>

                <p className="responsive-paragraph1">
                  <span>
                    15. To develop trekking trails and operate wildlife safaris
                    in the "Protected Areas".
                  </span>
                </p>

                <p className="responsive-paragraph1">
                  <span>
                    16. To encourage public-private partnerships (PPP) in the
                    area of eco-tourism, wherever the law permits.
                  </span>
                </p>

                {/* */}
              </div>

              {/* */}
            </div>
          </div>

          {/* */}
        </section>

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

    .responsive-image {
      margin-left: 20px;
    }

    .responsive-image1 {
      margin-left: 10px;
    }

    .responsive-heading {
      margin: auto;
      font-size: 2.3rem;
    }

    .responsive-heading1 {
      font-size: 1.6rem;
    }

    .responsive-paragraph {
      font-size: 1.8rem;
      margin-left: 10px;
      margin-right: 10px;
      line-height: 2;
    }

    .responsive-paragraph1 {
      font-size: 1.7rem;
      margin-right: 16px;
      line-height: 2;
    }

    .responsive-objective-text {
      margin-left: 16px;
    }

    .responsive-objective-text1 {
      margin-left: 21px;
    }

    .responsive-objective-text2 {
      margin-left: 0px;
    }

    /* */
  }

  /* */
`;
