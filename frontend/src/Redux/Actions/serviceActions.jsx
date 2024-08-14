/* */

import { serviceActionTypes } from "./../Constants/action-types.jsx";

/* **************************************** */
/* Functions for getting all the services.  */
/* **************************************** */

export const allServiceRequest = () => {
  /* */

  return {
    type: serviceActionTypes.ALL_SERVICES_REQUEST,
  };

  /* */
};

export const allServiceSuccess = (allServices) => {
  /* */

  return {
    type: serviceActionTypes.ALL_SERVICES_SUCCESS,
    payload: allServices,
  };

  /* */
};

export const allServiceFail = (errorMessage) => {
  /* */

  return {
    type: serviceActionTypes.ALL_SERVICES_FAIL,
    payload: errorMessage,
  };

  /* */
};
