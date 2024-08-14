/* */

import React, { useState } from "react";

import Layout from "../../Components/All/Layout.jsx";
import PageNavigation from "../../Components/All/PageNavigation.jsx";
import styled from "styled-components";

import { Link } from "react-router-dom";

const FishingPage = () => {
  /* */

  const Images = [
    /* */

    {
      id: 1,
      image: "/newImages/fish5.jpg",
    },

    {
      id: 2,
      image: "/newImages/fishingNew3.webp",
    },

    {
      id: 5,
      image: "/newImages/gaon14.jpeg",
    },

    /* */
  ];

  /* Creating a useState() hook to store the photo in the mainPhoto array that we will destructure
     send from the singleProductPage as props and passing the 1st photo as its initial value because 
     we will display the 1st photo initially.
  */
  const [mainPhoto, setMainPhoto] = useState("/newImages/fish5.jpg");

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
          <PageNavigation title={"Fishing"} />
        </div>

        <div className="container">
          {/* */}

          <div className="mt-[20px] newGrid grid-two-column">
            {/* */}

            {/* *************************** */}
            {/* All Images of the service.  */}

            <div className="flex justify-center items-center responsive-side-images">
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

              <h2 className="text-5xl my-4 font-serif">✶ Fishing ✶</h2>

              {/* *********************************** */}
              {/* Displaying the service description. */}

              <p className="text-[#d84c63] font-semibold text-[24px] mt-5 mb-4 responsive-heading">
                Enjoy fishing in the river brahmaputra and its nearby lakes
              </p>

              <h2 className="text-[#978286] font-semibold text-[24px] mb-5 responsive-heading">
                Fishing in the Brahmaputra River: A Nature Lover's Paradise
              </h2>

              <div className="text-[#dd4a65] font-semibold text-2xl mb-5">
                {/* */}

                <p className="responsive-text">
                  <span className="text-[#424651] text-[20px]">
                    About the property
                  </span>
                  : - We provide fishing facilities in the river brahmaputra and
                  its nearby lakes situated besides our eco camp. Our fishing
                  areas cover's wide variety of different species of fishes. You
                  can also cook live food with the fish you caught. We will
                  provide all the necessary items needed for you. Our staff will
                  manage your requirements at all cost.
                  <br />
                </p>

                <p className="mt-3 responsive-text">
                  <span className="text-[#424651] text-[20px]">Location :</span>
                  - Our fishing areas are located in Dusutimukh Golaghat which
                  is quite famous for its blessed beauty and amazing tourism
                  with its flora and fanna..
                  <br />
                </p>

                <p className="mt-3 responsive-text">
                  <span className="text-[#424651] text-[20px]">
                    Property Facilities:
                  </span>
                  - We ensures varying requirements of our guests and are
                  fulfilled as ample conveniences are offered which includes
                  Wi-Fi, power backup, car rental service, laundry, parking,
                  travel assistance and many more.
                  <br />
                </p>

                <p className="mt-3 responsive-text">
                  <span className="text-[#424651] text-[20px]">
                    Fishing Area Details:
                  </span>
                  - Our fishing area holds wide range of different species of
                  fishes from small fishes to large one's. Some common fishes
                  present in our camp site are Catla, Rau, Bahu, Chitol, Borali,
                  Ari, Golden fish, Hal, Hol and much more. Our fishing sites
                  also has small umbrella tents, nets, drinking water facilities
                  etc.
                </p>

                <p className="mt-3">
                  <span className="text-[#424651] text-[20px]">
                    How to reach the property?
                  </span>

                  <ol className="mt-3 responsive-text">
                    <span>- The property is at a distance of</span>
                    <li className="mt-2">1. 45 km from Jorhat Airport.</li>

                    <li>2. 40 km from Jorhat Railway Station.</li>

                    <li>3. 35 km from Golaghat Railway Station.</li>
                  </ol>
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
    }

    .grid-four-column {
      grid-template-rows: 1fr;
      grid-template-columns: repeat(4, 1fr);
    }

    .grid-two-column {
      grid-template-columns: repeat(1, 1fr);
    }

    .responsive-text {
      font-size: 1.8rem;
      font-weight: bold;
      line-height: 1.4;
    }

    .responsive-heading {
      font-size: 2.2rem;
      line-height: 1.4;
      margin: auto;
    }

    /* */
  }

  /* */
`;

export default FishingPage;
