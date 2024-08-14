/* */

import React, { useState, useEffect } from "react";

import { styled } from "styled-components";

import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  /* */

  const navigate = useNavigate();

  const location = useLocation();

  const [count, setCount] = useState(3);

  /* ******************************************************************* */
  /* *******************  useEffect() hooks  *************************** */
  /* ******************************************************************* */

  /* Creating an useEffect() hook to deal with the time-intervals in the initial 
     time and passing the count, navigate, location, and path as dependencies.
  */

  useEffect(() => {
    /* */

    /* With the help of setInterval() function we are decrementing the previous Value upto 0.
       ie.... --prevValue(means decrement) and we are decrementing for every 1000 miliseconds 
       (1 secs). 

       In useState there is a parameter called prevValue which holds the intial value of 
       the useState. We can pass this parameter in the useState() setter function which holds 
       the updated data of the useState. ie.. here setCount().
       setCount() holding the previous value(initial value) that is 2 and it will keep on 
       decrementing by 1 until 0 as we are decrementing the previous Value. 
       ie.... --prevValue(means decrement) and we are decrementing for every 1000 miliseconds 
       (1 secs). 
    */

    const interval = setInterval(() => {
      /* */

      setCount((prevValue) => --prevValue);

      /* */
    }, 1000);

    /* Checking the count when the value of count becomes 0 then we will redirect(navigate) the 
       user to the login page and simply return.
       To redirect(navigate) the user to its last location page we are passing an object in the 
       navigate function with name state and value as location.pathname. 
       The location.pathname will give access to the currentpath to the user when they login.
    */

    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });

    /* Clearing the time-interval stored in interval variable with the help of clearInterval() 
       function when count reaches to 0. 
    */

    return () => clearInterval(interval);

    /* */
  }, [count, navigate, location, path]);

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  /* returning the message that we will display for spinner. */

  return (
    /* */

    <Wrapper>
      {/* */}

      {/* ************************ */}
      {/* Adding Bootstrap Spinner */}

      <div
        className="d-flex flex-column justify-content-center align-items-center text-3xl"
        style={{ height: "100vh" }}
      >
        <h3 className="text-center mb-4 text-red-600 responsive-text">
          You are not Admin
        </h3>

        <h3 className="text-center text-red-800 responsive-text">
          Redirecting to Home page in {count} seconds
        </h3>

        <div className="spinner-border" role="status">
          <span className="visually-hidden responsive-text">Loading...</span>
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

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-text {
      font-size: 2.4rem;
      font-weight: bold;
    }

    /* */
  }

  /* */
`;

export default Spinner;
