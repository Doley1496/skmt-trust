/* */

import React, { useState } from "react";

import Layout from "../../Components/All/Layout.jsx";

import styled from "styled-components";

import PageNavigation from "../../Components/All/PageNavigation.jsx";

import { photos } from "../../Array/photos.js";

export default function PhotoGalleryPage() {
  /* */

  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState(24);

  const showMoreItems = () => {
    /* */

    setLoading(true);

    setVisible((previousValue) => previousValue + 24);

    setLoading(false);

    /* */
  };

  return (
    /* */

    <Wrapper>
      {/* */}

      <div className="mb-5 mt-[-100px] responsive-pagination">
        <PageNavigation title="Gallery" />
      </div>

      <Layout title={"Gallery-Page"}>
        {/* */}

        {/* ********************************** */}
        {/* Heading of the photo gallery page. */}

        <div className="mb-[70px]">
          <h5 className="text-center underline text-6xl font-serif font-bold text-[#3d594f]">
            ❁ Our Photo Gallery ❁
          </h5>
        </div>

        {/* ************************** */}
        {/* Displaying all the images. */}

        <div className="container">
          {/* */}

          <div className="row">
            {/* */}

            {loading && (
              <p className="text-xl text-slate-700 text-center w-full">
                Loading...
              </p>
            )}

            {/* Dynamically Accessing the above photos array using map function and passing
                all its data's in the photos parameter.
            */}

            {photos.slice(0, visible).map((photos) => (
              /* */

              <div className="col-lg-3 col-md-4 mb-4 hover:no-underline">
                <div
                  className="border rounded-lg overflow-hidden cursor-pointer h-[260px] "
                  style={{ boxShadow: "0 0 30px rgba(0,0,0,0.5)" }}
                >
                  <img
                    src={photos}
                    alt="photo"
                    style={{ width: "100%", height: "100%" }}
                    className="object-cover hover:scale-105 transition-scale duration-300"
                  />

                  {/* */}
                </div>
              </div>

              /* */
            ))}

            {/* */}
          </div>

          {/* */}
        </div>

        {/* ************************************** */}
        {/* Creating a button to show more photos. */}

        <div className="mt-[70px]">
          {photos.length > visible ? (
            <div
              style={{
                textAlign: "center",
                display: "block",
              }}
            >
              <button
                className="text-[27px] text-center uppercase bg-slate-400 text-[#800000] px-4 py-4
                rounded-lg font-semibold font-sans hover:opacity-75 mt-5 w-[30%] hover:bg-[#080B39]
                hover:text-gray-100 responsive-button"
                onClick={showMoreItems}
              >
                {loading ? "Loading please wait...." : "See More Photos"}
              </button>
            </div>
          ) : (
            <div>
              <p className="text-center text-3xl mt-4 font-bold text-[#800000] responsive-no-photos">
                No more photos available
              </p>
            </div>
          )}
        </div>

        {/* */}
      </Layout>

      {/* */}
    </Wrapper>

    /* */
  );
}

/* **************************************************************************************** */
/* Using media-queries of styled of styled-components we are providing responsiveness for 
   mobile size and storing in a variable Wrapper. This Wrapper will be use to wrap the whole 
   elements we want to return.
*/
/* **************************************************************************************** */

const Wrapper = styled.section`
  /* */

  padding: 9rem 0;

  /* */

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-pagination {
      margin-top: -70px;
    }

    .responsive-no-photos {
      font-size: 3rem;
      font-weight: bold;
      padding-top: 20px;
      margin-top: 30px;
    }

    .responsive-button {
      width: 60%;
      font-size: 2.6rem;
    }

    /* */
  }

  /* */
`;
