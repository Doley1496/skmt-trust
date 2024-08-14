/* */

import React, { useState, useEffect } from "react";

import Layout from "../../Components/All/Layout.jsx";

import styled from "styled-components";

import Pagination from "react-js-pagination";

import { Link, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { signOutUserSuccess } from "../../Redux/Actions/authActions.jsx";

import { getAllUsers } from "../../Redux/Actions/authActions.jsx";

import AdminMenu from "../../Components/All/AdminMenu.jsx";

import SearchBox from "../../Components/All/SearchBox.jsx";

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Users = () => {
  /* */

  const dispatch = useDispatch();

  const params = useParams();

  /* From url we are getting the slug using urlParams() hook of react-router-dom. */
  const keyword = params.slug;

  const { currentUser } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);

  const { usersCount, resultPerPage } = useSelector((state) => state.user);

  const [allUsers, setAllUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  /* Creating a function to set the current-page-number. */
  const setCurrentPageNumber = (event) => {
    setCurrentPage(event);
  };

  const getAllUserDetails = async () => {
    /* */

    try {
      /* */

      setLoading(true);

      const res = await fetch(`${VITE_SERVER_URL}/api/user/getAllUsers`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success === false) {
        /* */

        if (data.statusCode === 401) {
          /* */

          setLoading(false);

          dispatch(signOutUserSuccess());

          localStorage.clear();

          alert(
            "Your cookie is mismatched or expired. You are signing out of our account!"
          );

          toast.success("Successfully Logged Out");

          return;

          /* */
        } else {
          /* */

          toast.error(data.message);

          setLoading(false);

          return;

          /* */
        }

        /* */
      }

      setLoading(false);

      setAllUsers(data);

      /* Catching the error and displaying it to the frontend. */
    } catch (error) {
      /* */

      setLoading(false);

      toast.error("Something went wrong. Please try again later!");

      /* */
    }

    /* */
  };

  /* ******************************************************************* */
  /* *******************  useEffect() hooks  *************************** */
  /* ******************************************************************* */

  useEffect(() => {
    /* */

    getAllUserDetails();

    /* */
  }, []);

  useEffect(() => {
    /* */

    dispatch(getAllUsers(keyword, currentPage));

    /* */
  }, [dispatch, keyword, currentPage]);

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  return (
    /* */

    <Wrapper>
      {/* */}

      <Layout title={"Users-Page"}>
        {/* */}

        <div className="m-3 p-3">
          {/* */}

          {/* Using grid to separate the contents in two parts :
              1st part contains admin's menu and 
              2nd part contains all the users.
          */}

          <div className="row">
            {/* */}

            {/* 1st part contains admin's menu */}

            <div className="col-md-3 responsive-adminPanel">
              <AdminMenu />
            </div>

            {/* 2nd part contains all the Users */}

            <div className="col-md-9">
              {/* */}

              <h1 className="text-center text-5xl text-[#800000] mt-5 mb-[30px] font-serif font-bold">
                All Users
              </h1>

              <SearchBox />

              <div className="row">
                {/* */}

                {allUsers.map((allUsers) => (
                  /* */

                  <div
                    className="bg-gray-500 shadow-md hover:shadow-lg transition-shadow overflow-hidden 
                        pb-3 rounded-xl sm:w-[300px] sm:h-[250px] ml-[90px] mt-[60px] h-auto w-auto responsive-card"
                  >
                    {/* */}

                    <div className="font-semibold p-2 flex flex-col gap-1 col-lg-3 col-md-2 col-10">
                      {/* */}

                      {/* ***************** IMAGE **************** */}
                      {/* Displaying 1st the image of the user's. */}

                      <img
                        src={allUsers.avatar || currentUser.avatar}
                        alt="user"
                        className="hover:scale-105 h-24 w-24 object-cover cursor-pointer transition-scale 
                                 ml-[100px] rounded-full duration-300 mb-2"
                      />

                      {/* ************** ID *************** */}
                      {/* Displaying the ID of the user's. */}

                      <p className="text-black font-mono text-[20px]">
                        {allUsers._id}
                      </p>

                      {/* ************** NAME *************** */}
                      {/* Displaying the name of the user's. */}

                      <p className="text-black font-mono text-[20px]">
                        {allUsers.firstName + "" + allUsers.lastName}
                      </p>

                      {/* ************** EMAIL *************** */}
                      {/* Displaying the email of the user's. */}

                      <p className="text-black font-mono text-[20px]">
                        {allUsers.email}
                      </p>

                      {/* ************** TICKETS *************** */}
                      {/* Displaying the tickets of the user's. */}

                      <p className="text-black font-mono text-[20px]">
                        {allUsers.tickets}
                      </p>

                      {/* */}
                    </div>

                    <Link
                      to="ticket/userTicket"
                      className="text-[18px] font-serif font-bold ml-[70px] text-[#752f2f] mb-[20px] pb-5"
                    >
                      Customer Tickets
                    </Link>

                    {/* */}
                  </div>

                  /* */
                ))}

                {/* */}
              </div>

              {/* */}
            </div>

            {/* ******************************************************************* */}
            {/* In 3rd part we will show pagination ie.. to move to the next-page or to 
                the previous-page and we will show this pagination when result-per-page 
                is smaller then the count (ie.. total number of filtered-products). 
            */}

            {resultPerPage < usersCount && (
              <div className="pagination responsive-pagination">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={usersCount}
                  onChange={setCurrentPageNumber}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            )}

            {/* */}
          </div>

          {/* */}
        </div>

        {/* */}
      </Layout>

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

    .responsive-card {
      margin: auto;
      align-items: center;
      margin-bottom: 10px;
      margin-top: 10px;
      height: auto;
      width: auto;
    }

    .responsive-adminPanel {
      margin-left: 7px;
    }

    .responsive-pagination {
      margin: auto;
    }

    /* */
  }

  /* */
`;

export default Users;
