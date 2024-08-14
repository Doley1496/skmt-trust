/* */

import React, { useState, useEffect } from "react";

import Layout from "../../Components/Layout.jsx";

import PageNavigation from "../../Components/PageNavigation.jsx";

import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  allServiceFail,
  allServiceRequest,
  allServiceSuccess,
} from "../../Redux/Actions/serviceActions.jsx";

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function () {
  /* */

  const dispatch = useDispatch();

  const { all_services, loading } = useSelector((state) => state.services);

  const [allServices, setAllServices] = useState([]);

  const getAllServices = async () => {
    /* */

    try {
      /* */

      dispatch(allServiceRequest());

      const res = await fetch(`${VITE_SERVER_URL}/api/service/getAllServices`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success === false) {
        /* */

        dispatch(allServiceFail(data.message));

        return;

        /* */
      }

      setAllServices(data);

      dispatch(allServiceSuccess(data));

      /* Catching the error and displaying it to the frontend. */
    } catch (error) {
      /* */

      dispatch(allServiceFail(data.message));

      /* */
    }

    /* */
  };

  /* ******************************************************************* */
  /* *******************  useEffect() hooks  *************************** */
  /* ******************************************************************* */

  useEffect(() => {
    /* */

    getAllServices();

    /* */
  }, []);

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  return (
    /* */

    <Layout title={"Service-Page"}>
      {/* */}

      <PageNavigation title="Service" />

      <section className="my-5 fonts">
        {/* */}

        <div className="py-5">
          <h5 className="text-center underline text-5xl font-semibold font-sans text-[#14527C]">
            Our Servises
          </h5>
        </div>

        <div className="profile-area">
          <div className="container">
            {/* */}

            <div className="row responsive">
              {/* */}

              {/* When we get the loading as true(ie. when the web-page is refreshing)  
                  then we will display Loading...  
              */}

              {loading && (
                <p className="text-xl text-slate-700 text-center w-full">
                  Loading...
                </p>
              )}

              {/* When we get the loading as false(ie. when the web-page is not refreshing) 
                  and the length of the productResults is 0. 
                  ie.. when there is no products for that filter applied or for that 
                     search-keyword then we will display No Products Found.  
              */}

              {!loading && all_services.length === 0 && (
                <p className="text-xl text-slate-700 ">No Services Found</p>
              )}

              {/* Dynamically Accessing the above products array using map function and passing
                  all its data's in the product parameter.
              */}

              {allServices?.map((service) => (
                /* */

                /* Creating a link on the card when we click on the service(card) it will take us to the 
                   following route {`/singleService/${service.id}`} where the user can see the service
                   in more details. 
                   We are passing the id of the service based on this id we can identify the exact 
                   service which the user wants to view.
                */

                <NavLink
                  key={service._id}
                  to={`/singleService/${service._id}`}
                  className="col-lg-3 col-md-4 mb-4 hover:no-underline"
                >
                  {/* */}

                  <div
                    className="border rounded-2xl overflow-hidden cursor-pointer h-[300px]"
                    style={{ boxShadow: "0 0 30px rgba(0,0,0,0.5)" }}
                  >
                    {/* */}

                    {/* ***************** IMAGE **************** */}
                    {/* Displaying 1st the image of the service. */}

                    <div className="">
                      <img
                        src={service.photo[0]}
                        alt="service-cover"
                        style={{ width: "100%", height: "200px" }}
                        className="sm:h-[170px] w-full object-cover hover:scale-105 transition-scale 
                                 duration-300 rounded-lg pt-2 responsive-img "
                      />
                    </div>

                    {/* **************  NAME AND DESCRIPTION  ************* */}
                    {/* Displaying the name and description of the service. */}

                    <div className="mt-3 px-3">
                      {/* */}

                      {/* ************** NAME *************** */}
                      {/* Displaying the name of the service. */}

                      <h4 className="text-center text-[20px] text-[#800000] font-serif pb-3">
                        {service.name}
                      </h4>

                      {/* ************** DESCRIPTION *************** */}
                      {/* Displaying the description of the service. */}

                      <p className="line-clamp-2 font-mono font-semibold text-[15px]">
                        {service.description}
                      </p>

                      {/* */}
                    </div>

                    {/* */}
                  </div>

                  {/* */}
                </NavLink>

                /* */
              ))}

              {/* */}
            </div>

            {/* */}
          </div>
        </div>

        {/* */}
      </section>

      {/* */}
    </Layout>

    /* */
  );

  /* */
}
