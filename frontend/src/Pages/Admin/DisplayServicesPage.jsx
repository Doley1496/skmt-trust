/* */

import React, { useState, useEffect } from "react";

import Layout from "../../Components/All/Layout.jsx";

import styled from "styled-components";

import AdminMenu from "../../Components/All/AdminMenu.jsx";

import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";

import {
  allServiceFail,
  allServiceRequest,
  allServiceSuccess,
} from "../../Redux/Actions/serviceActions.jsx";

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

const DisplayServices = () => {
  /* */

  const dispatch = useDispatch();

  const { all_services } = useSelector((state) => state.services);

  const [loading, setLoading] = useState(false);

  const getAllServices = async () => {
    /* */

    try {
      /* */

      setLoading(true);

      dispatch(allServiceRequest());

      const res = await fetch(`${VITE_SERVER_URL}/api/service/getAllServices`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success === false) {
        /* */

        setLoading(false);

        toast.error(data.message);

        dispatch(allServiceFail(data.message));

        return;

        /* */
      }

      dispatch(allServiceSuccess(data));

      setLoading(false);

      /* Catching the error and displaying it to the frontend. */
    } catch (error) {
      /* */

      setLoading(false);

      toast.error("Something went wrong in getting the services");

      dispatch(allServiceFail(data.message));

      /* */
    }

    /* */
  };

  /* ************************************************************************ */
  /* **************************   useEffect() hooks  ************************ */
  /* ************************************************************************ */

  useEffect(() => {
    /* */

    getAllServices();

    /* */
  }, []);

  /* ************************************************************************ */
  /* ****************************   return   ******************************** */
  /* ************************************************************************ */

  return (
    /* */

    <Wrapper>
      {/* */}

      <Layout title={"Display-Service-Page"}>
        {/* */}

        <div className="row">
          {/* */}

          {/* Using grid to separate the contents in two parts :
              1st part contains admin's menu. 
              2nd part contains all the products.
          */}

          {/* ****************************** */}
          {/* 1st part contains admin's menu */}
          {/* Using the AdminMenu Component to display the admin-menu. */}

          <div className="col-md-3 mt-5 pl-[50px] responsive-adminPanel">
            <AdminMenu />
          </div>

          {/* ********************************** */}
          {/* 2nd part contains all the products */}

          <div className="col-md-9 mt-5">
            {/* */}

            <h1 className="text-center text-5xl text-[#800000] mt-5 mb-[50px] font-serif font-bold">
              All Services
            </h1>

            {/* */}

            <div className="row responsive">
              {/* */}

              {loading && (
                <p className="text-2xl text-slate-700 text-center w-full">
                  Loading...
                </p>
              )}

              {/* When we get the loading as false(ie. when the web-page is not refreshing) 
                  and the length of the productResults is 0. 
                  ie.. when there is no services for that filter applied or for that 
                       search-keyword then we will display No Services Found.  
              */}

              {!loading && all_services.length === 0 && (
                <p className="text-2xl text-slate-700 ">No Services Found</p>
              )}

              {all_services?.map((service) => (
                /* */

                <div
                  className="shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg
                            sm:w-[220px] ml-[90px] mt-[60px] responsive"
                >
                  {/* Based on the product id we will identify the exact product which the user wants 
                      to view.
                  */}

                  <Link
                    key={service._id}
                    to={`/dashboard/admin/update-delete-service/${service._id}`}
                    className="col-lg-4 col-md-2 col-10 mt-3 responsive"
                  >
                    {/* ***************** IMAGE **************** */}
                    {/* Displaying 1st the image of the product. */}

                    <img
                      src={service.photo[0]}
                      alt="product-cover"
                      className="h-[40px] sm:h-[170px] w-full object-cover hover:scale-105 transition-scale 
                               duration-300 rounded-lg pt-2 responsive-img bg-slate-800"
                    />

                    <div className="font-semibold p-2 flex flex-col gap-2">
                      {/* */}

                      {/* ************** NAME *************** */}
                      {/* Displaying the name of the product. */}

                      <p
                        className="text-slate-700 truncate text-md text-center text-3xl pb-3 font-serif 
                        responsive-service"
                      >
                        {service.name}
                      </p>

                      {/* ************** DESCRIPTION *************** */}
                      {/* Displaying the description of the product. */}

                      <p className="text-2xl text-gray-600 line-clamp-2 pt-4 font-mono responsive-service pb-[20px]">
                        {service.description}
                      </p>

                      {/* */}
                    </div>

                    {/* */}
                  </Link>

                  {/* */}
                </div>

                /* */
              ))}

              {/* */}
            </div>

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

    .responsive-service {
      font-size: 2.5rem;
    }

    .responsive {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: auto;
      margin-bottom: 13px;
      gap: 4rem;
    }

    .responsive-img {
      height: 30vh;
    }

    .responsive-adminPanel {
      padding-right: 40px;
    }

    /* */
  }

  /* */
`;

export default DisplayServices;
