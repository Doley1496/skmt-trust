/* */

import { ticketActionTypes } from "./../Constants/action-types.jsx";

/* *************************************************************************************** */
/* Functions for sending tickets */
/* *************************************************************************************** */

export const ticketSendStart = () => {
  /* */

  return {
    type: ticketActionTypes.TICKET_SEND_START,
  };

  /* */
};

export const ticketSendSuccess = (tickets) => {
  /* */

  return {
    type: ticketActionTypes.TICKET_SEND_SUCCESS,
    payload: tickets,
  };

  /* */
};

export const ticketSendFailure = (errorMessage) => {
  /* */

  return {
    type: ticketActionTypes.TICKET_SEND_FAILURE,
    payload: errorMessage,
  };

  /* */
};

/* Getting all the tickets send inside the setAllTickets() function and setting(providing)
   it to the payload.
*/

export const setAllTickets = (tickets) => {
  return {
    type: ticketActionTypes.SET_ALL_TICKETS,
    payload: tickets,
  };
};
