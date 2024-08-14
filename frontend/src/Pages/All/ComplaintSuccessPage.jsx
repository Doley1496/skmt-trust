/* */

import React from "react";

import Layout from "../../Components/All/Layout.jsx";

import PageNavigation from "../../Components/All/PageNavigation.jsx";

import { Link } from "react-router-dom";

export default function ComplaintSuccess() {
  /* */

  return (
    /* */

    <Layout title={"Complaint-Success Page"}>
      {/* */}

      <PageNavigation title="Complaint Success" />

      <div>
        {/* */}

        <img
          src="/newImages/tick.webp"
          alt=""
          className="h-[80px] w-[80px] justify-center align-middle text-center mx-auto mt-5"
        />

        <h1 className="text-center text-3xl p-5 text-green-600 ">
          Your Complaint has been submitted !
        </h1>

        <p className="text-center text-2xl mb-[50px]">
          We will reply you very soon !
        </p>

        <div
          className="flex justify-center p-3 gap-3 bg-slate-700 text-white border 
                   rounded-lg  hover:opacity-250 mb-60 uppercase w-40 mx-auto"
        >
          <Link to="/">Go Back</Link>
        </div>

        {/* */}
      </div>

      {/* */}
    </Layout>

    /* */
  );

  /* */
}
