/* */

import React, { useState } from "react";

import Layout from "../../Components/All/Layout.jsx";
import PageNavigation from "../../Components/All/PageNavigation.jsx";
import styled from "styled-components";

import { Link } from "react-router-dom";

const ExploringPage = () => {
  /* */

  const Images = [
    /* */

    {
      id: 1,
      image: "/newImages/brahmaputra1.jpg",
    },

    {
      id: 2,
      image: "/newImages/brahmaputra2.jpg",
    },

    {
      id: 3,
      image: "/newImages/brahmaputra3.jpg",
    },

    {
      id: 4,
      image: "/newImages/brahmaputra4.jpg",
    },

    /* */
  ];

  /* Creating a useState() hook to store the photo in the mainPhoto array that we will destructure
     send from the singleProductPage as props and passing the 1st photo as its initial value because 
     we will display the 1st photo initially.
  */
  const [mainPhoto, setMainPhoto] = useState("/newImages/brahmaputra2.jpg");

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  return (
    /* */

    <Wrapper>
      {/* */}

      <Layout title={"Single-Service-Page"}>
        {/* */}

        <div className="responsive-pagination">
          <PageNavigation title={"Exploration"} />
        </div>

        <div className="container">
          {/* */}

          <div className="mt-[20px] newGrid grid-two-column">
            {/* */}

            {/* *************************** */}
            {/* All Images of the service.  */}

            <div className="flex mt-[-700px] justify-center items-center responsive-side-images">
              {/* */}

              {/* We will create two columns:

                In the 1st columns we will keep all the images vertically one after the other.
                In the 2nd column we will display that image the user click from the images of 
                the 1st column.

              */}

              {/* 1st column: Displaying all the images present in the image props. */}

              <div className="grid grid-four-column">
                {/* */}

                {Images.map((photo, index) => {
                  /* */

                  return (
                    /* */

                    <figure key={index}>
                      <img
                        src={photo.image}
                        alt="photo"
                        className="responsive-image"
                        onClick={() => setMainPhoto(photo.image)}
                      />
                    </figure>

                    /* */
                  );

                  /* */
                })}

                {/* */}
              </div>

              {/* 2nd column: Displaying the click image */}

              <div className="main-screen">
                <img src={mainPhoto} alt="photo" />
              </div>

              {/* */}
            </div>

            {/* ************************ */}
            {/* Data of all the service. */}

            <div className="mt-5">
              {/* */}

              {/* **************************** */}
              {/* Displaying the service name. */}

              <h2 className="text-5xl my-6 font-serif">✶ Exploration ✶</h2>

              {/* *********************************** */}
              {/* Displaying the service description. */}

              <h2 className="text-[#d84c63] font-semibold text-[24px] mt-5 mb-5 responsive-heading">
                Enjoy the exciting views of the river brahmaputra and its
                surroundings
              </h2>

              <h2 className="text-[#978286] font-semibold text-[24px] mb-5 responsive-heading">
                Exploring the Brahmaputra River Valley: A Nature Lover's
                Paradise
              </h2>

              <p className="text-[#978286] font-semibold text-2xl mb-5 mx-3 responsive-paragraph">
                A journey through the captivating Brahmaputra River Valley is
                nothing short of a voyage to a verdant oasis nestled in the
                heart of the Indian subcontinent. As one of Asia's most
                significant rivers, the Brahmaputra weaves its way across the
                landscapes of Tibet, India, and Bangladesh. This 2,900 km long
                lifeline supports a myriad of ecosystems, providing sanctuary to
                a vibrant array of flora and fauna. For the discerning traveler,
                the Brahmaputra River Valley is a destination that promises the
                allure of unparalleled biodiversity and unforgettable
                experiences.
              </p>

              <div>
                {/* */}

                <h1 className="text-3xl font-serif m-3 p-3 text-[#72435C] responsive-heading">
                  A tapestry of ecosystems
                </h1>

                <p className="text-[16px] font-semibold leading-10 text-[#424651] font-sans mx-3 responsive-paragraph">
                  The allure of the Brahmaputra River Valley lies in its diverse
                  ecosystems, ranging from the icy heights of the Himalayas to
                  the lush forests and sprawling grasslands in the Indian states
                  of Arunachal Pradesh and Assam. Each ecosystem in the valley
                  is a treasure trove of unique life forms, making it a
                  must-visit destination for nature enthusiasts and
                  eco-tourists.
                </p>

                {/* */}
              </div>

              <div>
                {/* */}

                <h1 className="text-3xl font-serif m-3 p-3 text-[#72435C] responsive-heading">
                  A symphony of life
                </h1>

                <p className="text-[16px] font-semibold leading-10 text-[#424651] font-sans mx-3 responsive-paragraph">
                  The Brahmaputra River Valley is a living theatre where an
                  impressive collection of wildlife takes center stage. Many
                  species found here are exclusive to the region, offering
                  travelers a once-in-a-lifetime opportunity to witness these
                  remarkable creatures in their natural habitat: The One-Horned
                  Rhinoceros: Be awestruck by the Indian Rhinoceros, a majestic
                  creature that calls the grasslands of Assam home. The
                  Kaziranga National Park is a sanctuary for these endangered
                  animals, boasting the world's highest density of one-horned
                  rhinos. Bengal Tigers: Experience the thrill of spotting the
                  elusive Bengal tiger in the dense forests of the valley. Manas
                  National Park and Kaziranga National Park offer rare
                  opportunities to catch a glimpse of these magnificent big cats
                  in their natural environment. Hoolock Gibbons: Witness the
                  only ape species native to India, the hoolock gibbon, as they
                  swing through the tropical forests of the valley. With their
                  distinct calls and incredible agility, these creatures promise
                  a unique and unforgettable encounter. Gangetic River Dolphins:
                  Marvel at the endangered Gangetic river dolphin, one of the
                  few freshwater dolphin species in the world. A cruise along
                  the Brahmaputra River offers a chance to observe these
                  enigmatic creatures navigating the murky waters using
                  echolocation.
                </p>

                {/* */}
              </div>

              <div className="mt-5">
                {/* */}

                <p className="text-[#f54c6b] font-bold font-sans leading-10 text-[21px] responsive-text">
                  We provide all this facilities from Borbeel(Dusutimukh)
                  Eco-tourism camp
                </p>

                <Link
                  to="/dusutimukh"
                  className="btn btn-success rounded-lg mt-4 px-4 py-4 font-semibold font-sans text-[18px] 
                  text-center hover:bg-[#f54c6b]"
                >
                  Read More About Borbeel Eco-tourism
                </Link>

                {/* */}
              </div>

              {/* */}
            </div>

            {/* */}
          </div>

          {/* */}
        </div>

        {/* */}
      </Layout>

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

  .responsive-side-images {
    display: grid;
    grid-template-columns: 0.4fr 1fr;
    gap: 1rem;
  }

  .newGrid {
    display: grid;
    gap: 2rem;
  }

  .grid-two-column {
    grid-template-columns: repeat(2, 1fr);
  }

  .grid-four-column {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }

  .grid {
    flex-direction: row;
    justify-items: center;
    align-items: center;
    width: 100%;
    gap: 1rem;

    img {
      max-width: 100%;
      max-height: 100%;
      background-size: cover;
      object-fit: contain;
      cursor: pointer;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }

  .main-screen {
    display: grid;
    place-items: center;
    order: 1;

    img {
      max-width: 100%;
      height: auto;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    padding: 0 2.4rem;

    .responsive-pagination {
      margin-left: -20px;
      margin-right: -20px;
    }

    .responsive-side-images {
      display: flex;
      flex-direction: column;
      margin-top: 0px;
    }

    .responsive-paragraph {
      font-size: 1.7rem;
      line-height: 1.4;
    }

    .responsive-heading {
      font-size: 2.2rem;
      line-height: 1.4;
      margin: auto;
    }

    .grid-four-column {
      grid-template-rows: 1fr;
      grid-template-columns: repeat(4, 1fr);
    }

    .grid-two-column {
      grid-template-columns: repeat(1, 1fr);
    }

    /* */
  }

  /* */
`;

export default ExploringPage;
