/* */

import { serviceActionTypes } from "../Constants/action-types";

const initialState = {
  /* */

  loading: false,
  error: null,
  all_services: [],

  /* */
};

export const serviceReducer = (state = initialState, action) => {
  /* */

  switch (action.type) {
    /* */

    /* *********************************************** */
    /* Creating reducers for setting all the services. */
    /* *********************************************** */

    case serviceActionTypes.ALL_SERVICES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case serviceActionTypes.ALL_SERVICES_SUCCESS:
      return {
        ...state /* taking the existing state */,
        all_services: action.payload,
        error: null,
        loading: false,
      };

    case serviceActionTypes.ALL_SERVICES_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    /* **************************************************************** */
    /* If we does not get any type then we will return the whole state. */
    /* **************************************************************** */

    default:
      return state;

    /* */
  }

  /* */
};
