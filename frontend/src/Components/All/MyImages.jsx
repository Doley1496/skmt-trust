/* */

import React, { useState } from "react";

import styled from "styled-components";

const MyImages = ({ photo }) => {
  /* */

  const [mainPhoto, setMainPhoto] = useState(photo[0]);

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  return (
    /* */

    <Wrapper>
      {/* */}

      {/* We will create two columns:

          In the 1st columns we will keep all the images vertically one after the other.
          In the 2nd column we will display that image the user click from the images of the 1st column.

      */}

      {/* ***************************************************************** */}
      {/* 1st column: Displaying all the images present in the image props. */}

      <div className="grid grid-four-column">
        {/* */}

        {photo.map((photo, index) => {
          /* */

          return (
            /* */

            <figure key={index}>
              <img
                src={photo}
                alt="photo"
                className="responsive-image"
                onClick={() => setMainPhoto(photo)}
              />
            </figure>

            /* */
          );

          /* */
        })}

        {/* */}
      </div>

      {/* ************************************** */}
      {/* 2nd column: Displaying the click image */}

      <div className="main-screen">
        <img src={mainPhoto} alt="photo" />
      </div>

      {/* */}
    </Wrapper>
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

  display: grid;
  grid-template-columns: 0.4fr 1fr;
  gap: 1rem;

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

  .grid-four-column {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    display: flex;
    flex-direction: column;
    order: 1;

    .grid-four-column {
      grid-template-rows: 1fr;
      grid-template-columns: repeat(4, 1fr);
    }

    /* */
  }

  /* */
`;

export default MyImages;
