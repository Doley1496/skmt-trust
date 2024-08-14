/* */

import React, { useState } from "react";

import Layout from "../../Components/All/Layout.jsx";
import PageNavigation from "../../Components/All/PageNavigation.jsx";
import styled from "styled-components";

import { Link } from "react-router-dom";

const CottagePage = () => {
  /* */

  const Images = [
    /* */

    {
      id: 1,
      image: "/mainImages/cottage1.jpg",
    },

    {
      id: 2,
      image: "/mainImages/mishingThali.jpg",
    },

    {
      id: 3,
      image: "/newImages/cottage4.jpg",
    },

    {
      id: 4,
      image: "/mainImages/cottage2.jpg",
    },

    /* */
  ];

  /* Creating a useState() hook to store the photo in the mainPhoto array that we will destructure
     send from the singleProductPage as props and passing the 1st photo as its initial value because 
     we will display the 1st photo initially.
  */
  const [mainPhoto, setMainPhoto] = useState("/newImages/cottage4.jpg");

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
          <PageNavigation title={"Cottage"} />
        </div>

        <div className="container">
          {/* */}

          <div className="mt-[20px] newGrid grid-two-column">
            {/* */}

            {/* *************************** */}
            {/* All Images of the service.  */}

            <div className="flex mt-[-400px] justify-center items-center responsive-side-images">
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

              <h2 className="text-5xl my-4 font-serif">✶ Cottages ✶</h2>

              {/* *********************************** */}
              {/* Displaying the service description. */}

              <p className="text-[#d84c63] font-semibold text-[24px] mt-5 mb-4 responsive-heading">
                Enjoy staying in our beautiful cottages.
              </p>

              <h2 className="text-[#978286] font-semibold text-[24px] mb-5 responsive-heading">
                Staying in the Dusutimukh eco camp: A Nature Lover's Paradise
              </h2>

              <div className="text-[#dd4a65] font-semibold text-2xl mb-5">
                {/* */}

                <p className="responsive-text">
                  <span className="text-[#424651] text-[20px]">
                    About the property
                  </span>
                  : - Our cottages are a well worth property that proffers a
                  customized accommodation at an affordable rate. All our
                  cottages are build using bamboo and all natural materials. You
                  will experience a beautiful environment with natural beauties
                  of mother earth and can enjoy healthy local tribal foods and
                  also can enjoy traditional programs. You can The warm and
                  supportive staff ensures any and every whim is met at the
                  earliest. <br />
                </p>

                <p className="mt-3 responsive-text">
                  <span className="text-[#424651] text-[20px]">Location :</span>
                  - Our cottages are located in Dusutimukh Golaghat which is
                  quite famous for its blessed beauty and amazing tourism.
                  <br />
                </p>

                <p className="mt-3 responsive-text">
                  <span className="text-[#424651] text-[20px]">
                    Property Facilities:
                  </span>
                  - The cottages ensures varying requirements of guests are
                  fulfilled as ample conveniences are offered which includes
                  Wi-Fi, power backup, car rental service, laundry, parking,
                  travel assistance and many more.
                  <br />
                </p>

                <p className="mt-3 responsive-text">
                  <span className="text-[#424651] text-[20px]">
                    Room Details:
                  </span>
                  - The homestay houses simple and sober rooms that offer a
                  homely ambiance to guests. - They are tastefully decorated and
                  fitted with requisite amenities. - They are equipped with
                  television, coffee maker, spotless linen and telephone along
                  with other essentials. - The rooms have attached bathrooms
                  with essential toiletries and hot & cold running water.
                </p>

                <p className="mt-3 responsive-text">
                  <span className="text-[#424651] text-[20px]">
                    How to reach the property?
                  </span>

                  <ol className="mt-3">
                    {/* */}

                    <span>- The property is at a distance of</span>

                    <li className="mt-2">1. 45 km from Jorhat Airport.</li>

                    <li>2. 40 km from Jorhat Railway Station.</li>

                    <li>3. 35 km from Golaghat Railway Station.</li>

                    {/* */}
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
    grid-template-rows: repeat(4, 1fr);
  }

  .grid {
    flex-direction: row;
    justify-items: center;
    align-items: center;
    width: 100%;
    height: 35%;
    gap: 1rem;
    order: 1;

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

export default CottagePage;
