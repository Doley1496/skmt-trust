/* */

import { bookActionTypes } from "../Constants/action-types.jsx";

/* Defining the initial state. */
const initialState = {
  books: [],
  all_books: [],
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

export const bookReducer = (state = initialState, action) => {
  /* */

  switch (action.type) {
    /* */

    /* ********************************************************* */
    /* Creating reducers for storing book numbers. */
    /* ********************************************************* */

    case bookActionTypes.BOOK_SEND_START:
      return {
        ...state,
        loading: true,
      };

    case bookActionTypes.BOOK_SEND_SUCCESS:
      return {
        ...state,
        books: action.payload,
        error: null,
        loading: false,
      };

    case bookActionTypes.BOOK_SEND_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case bookActionTypes.SET_ALL_BOOKS:
      return {
        ...state,
        all_books: action.payload,
      };

    default:
      return state;

    /* */
  }

  /* */
};
