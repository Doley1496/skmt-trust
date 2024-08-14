/* */

import React, { useState } from "react";

import styled from "styled-components";

import { useCollapse } from "react-collapsed";

export default function Card({ item }) {
  /* */

  /* Pasting the default react-collapsed useState() and useCollapse(). */
  const [expand, setExpand] = useState(false);

  const { getCollapseProps, getToggleProps } = useCollapse({ expand });

  /* Using the prop(item) we are creating card for different objects of the data array. */

  return (
    /* */

    <Wrapper>
      <div className="w-4/4 m-auto mr-5 ml-5">
        {/* */}

        <div
          className="bg-white h-auto text-slate-700 font-semibold rounded-xl cursor-pointer
           card-testimonials m-6 "
        >
          {/* */}

          <div className="h-46 rounded-t-xl bg-indigo-500 flex justify-center items-center">
            <img src={item.image} alt="" className="h-44 w-40 rounded-full " />
          </div>

          <div className="flex flex-col justify-center items-center p-3">
            {/* */}

            <p className="text-[17px] font-bold font-serif text-[#800000] m-2">
              {item.name}
            </p>

            {!expand ? (
              <p className="text-center text-[17px] font-sans font-semibold line-clamp-3">
                {item.review.slice(0, 80)}...
              </p>
            ) : (
              ""
            )}

            <p
              {...getCollapseProps()}
              className="text-center text-[15px] font-sans font-semibold"
            >
              {item.review}
            </p>

            <button
              className="bg-indigo-500 text-white px-6 py-3 rounded-xl mt-7 mb-[70px] font-bold font-sans text-2xl"
              {...getToggleProps({
                onClick: () => setExpand((prevExpand) => !prevExpand),
              })}
            >
              {expand ? "Read Less" : "Read More..."}
            </button>

            {/* */}
          </div>

          {/* */}
        </div>

        {/* */}
      </div>
    </Wrapper>

    /* */
  );
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

    .responsive-heading {
      margin: auto;
    }

    .responsive-paragraph {
      font-size: 1.5rem;
    }

    .grid-two-column {
      grid-template-columns: repeat(2, 1fr);
    }

    .grid {
      display: grid;
      gap: 0.6rem;
    }

    /* */
  }

  /* */
`;
