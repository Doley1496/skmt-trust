/* */

import React from "react";

import styled from "styled-components";

const UserBookCard = ({ book }) => {
  /* */

  /* Destructing all the bookNumbers from book. */
  const { bookNumbers } = book;

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  return (
    /* */

    <Wrapper>
      {/* */}

      <div className="px-5 py-5 border rounded-lg font-bold font-mono text-2xl uppercase bg-slate-400 mt-5">
        {/* */}

        <div className="grid grid-four-column">
          {bookNumbers?.map((book, index) => {
            return (
              <div className="" key={index}>
                <span className="text-[20px] mt-2 mr-2">{book.book}</span>
              </div>
            );
          })}
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

  .grid {
    flex-direction: row;
    justify-items: center;
    align-items: center;
    width: 100%;
  }

  .grid-four-column {
    grid-template-columns: 1fr 1.2fr 0.5fr 0.8fr;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    display: flex;
    flex-direction: column;
    order: 1;

    /* */
  }

  /* */
`;

export default UserBookCard;
