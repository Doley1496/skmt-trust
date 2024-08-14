/* */

import { bookActionTypes } from "./../Constants/action-types.jsx";

/* *********************************** */
/* Functions for sending book numbers. */
/* *********************************** */

export const bookSendStart = () => {
  /* */

  return {
    type: bookActionTypes.BOOK_SEND_START,
  };

  /* */
};

export const bookSendSuccess = (bookNumber) => {
  /* */

  return {
    type: bookActionTypes.BOOK_SEND_SUCCESS,
    payload: bookNumber,
  };

  /* */
};

export const bookSendFailure = (errorMessage) => {
  /* */

  return {
    type: bookActionTypes.BOOK_SEND_FAILURE,
    payload: errorMessage,
  };

  /* */
};

/* Setting all the books send inside the setAllBooks() function and setting(providing)
   it to the payload.
*/

export const setAllBooks = (bookNumber) => {
  return {
    type: bookActionTypes.SET_ALL_BOOKS,
    payload: bookNumber,
  };
};
