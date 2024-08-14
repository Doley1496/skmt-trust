/* */

import { ticketActionTypes } from "../Constants/action-types.jsx";

/* Defining the initial state. */
const initialState = {
  tickets: [],
  all_tickets: [],
  error: null,
  loading: false,
};

/* Creating reducers for various functions. such as ticketSendStart(), ticketSendSuccess(),
   ticketSendFailure().

   ...state = means we are taking the existing state(ie.. previous state).
   
   Action holds the data that we send in the action-function ie... the action-type and the
   data send in the payload. 
   And it will return the data according to the action-type ie.. the reducer function whose
   action-type matches with the action-type of the action function.
*/

export const ticketReducer = (state = initialState, action) => {
  /* */

  switch (action.type) {
    /* */

    /* ********************************************************* */
    /* Creating reducers for storing the tickets. */
    /* ********************************************************* */

    case ticketActionTypes.TICKET_SEND_START:
      return {
        ...state,
        loading: true,
      };

    case ticketActionTypes.TICKET_SEND_SUCCESS:
      return {
        ...state,
        tickets: action.payload,
        error: null,
        loading: false,
      };

    case ticketActionTypes.TICKET_SEND_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ticketActionTypes.SET_ALL_TICKETS:
      return {
        ...state,
        all_tickets: action.payload,
      };

    default:
      return state;

    /* */
  }

  /* */
};
