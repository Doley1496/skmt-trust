/* */

import React from "react";

import styled from "styled-components";

const UserTicketCard = ({ ticket }) => {
  /* */

  /* Destructing all the tickets from ticket. */
  const { ticketNumbers } = ticket;

  /* ***************************************************************************** */
  /* *************************     return      *********************************** */
  /* ***************************************************************************** */

  return (
    /* */

    <Wrapper>
      {/* */}

      <div className="px-5 py-5 border rounded-lg font-bold font-mono text-2xl uppercase bg-slate-400 mt-5">
        {/* */}

        <div className="grid grid-four-column">
          {ticketNumbers?.map((tickets, index) => {
            return (
              <div className="flex gap-3" key={index}>
                <span className="text-[20px] gap-3 mt-2 mr-3 font-bold responsive-delete-icon responsive-tickets">
                  {index ? " , " : " "} {tickets.ticket}
                </span>
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
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .grid-five-column {
    grid-template-columns: repeat(5, 1fr);
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

export default UserTicketCard;
