/* */

import React, { useState } from "react";

import styled from "styled-components";

import { useNavigate } from "react-router-dom";

export default function SearchBox() {
  /* */

  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  /* Creating a function searchProductsHandler() to search products according to the
     search-keyword search by the user in the search field.
  */
  const searchUsersHandler = (event) => {
    /* */

    event.preventDefault();

    /* If we get the search-keyword from the admin then we will navigate the admin to the
       `/dashboard/admin/users/${keyword}` route.
       
       Else we will navigate to the "/dashboard/admin/users" route.

       Using trim() method to avoid extra space bteween search keyword.  
    
    */

    if (keyword.trim()) {
      /* */

      navigate(`/dashboard/admin/users/${keyword}`);

      /* */
    } else {
      /* */

      navigate("/dashboard/admin/users");

      /* */
    }

    /* */
  };

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  /* Returning the content ie.. the search-box that we will display in the header  
     ie.. we will import this component in the Header and use it there.
  */

  return (
    /* */

    <Wrapper>
      {/* */}

      {/* ****************************************************************************** */}
      {/* Creating a form to search the products according to the search-keyword provided by 
          the user in the search-box of the header section.
          ie... when the user will click(submit) this form then this form will be submitted
          and we will get all the results related to the search input from our database 
          and display in the web-page. 
      */}

      <form
        onSubmit={searchUsersHandler}
        className="gap-5 text-3xl items-center flex align-center pb-6 mt-5 mr-3 ml-[40px] mb-5"
      >
        {/* */}

        <input
          type="text"
          placeholder="Search user's name here...."
          className="rounded-lg text-center py-[12px]
          w-[80%] text-4xl px-3 text-black bg-gray-300 font-bold font-sans responsive-searchBox "
          onChange={(event) => {
            setKeyword(event.target.value);
          }}
        />

        <input
          type="submit"
          value="search"
          className=" bg-[#800000] text-white font-bold uppercase ml-[-34px] py-[13px] 
              px-[14px] text-[17px] rounded-lg hover:opacity-70 responsive-searchBox1"
        />

        {/* */}
      </form>

      {/* */}
    </Wrapper>

    /* */
  );

  /* */
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

    .responsive-searchBox {
      display: flex;
      flex-direction: column;
      margin-left: -40px;
      width: 120%;
      font-size: 2.3rem;
    }

    .responsive-searchBox1 {
      margin-right: -10px;
    }

    /* */
  }

  /* */
`;
