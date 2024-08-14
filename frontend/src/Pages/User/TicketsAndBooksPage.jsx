/* */

import React, { useState, useEffect } from "react";

import Layout from "../../Components/All/Layout.jsx";

import PageNavigation from "../../Components/All/PageNavigation.jsx";

import styled from "styled-components";

import { useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { signOutUserSuccess } from "../../Redux/Actions/authActions.jsx";

import { setAllTickets } from "../../Redux/Actions/ticketActions.jsx";
import { setAllBooks } from "../../Redux/Actions/bookActions.jsx";

let SessionId = localStorage.getItem("id");

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function TicketsAndBooks() {
  /* */

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [tickets, setTickets] = useState([]);

  const [bookNumbers, setBookNumbers] = useState([]);

  const getAllTickets = async () => {
    /* */

    try {
      /* */

      setLoading(true);

      if (SessionId) {
        /* */

        const res = await fetch(
          `${VITE_SERVER_URL}/api/ticket/get-allTickets/${SessionId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

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

        setTickets(data);

        dispatch(setAllTickets(data));

        /* */
      }

      /* Catching the error and displaying it. */
    } catch (error) {
      /* */

      toast.error("Something went wrong. Please try again later!");

      setLoading(false);

      /* */
    }

    /* */
  };

  const getAllBooks = async () => {
    /* */

    try {
      /* */

      setLoading(true);

      if (SessionId) {
        /* */

        const res = await fetch(
          `${VITE_SERVER_URL}/api/book/get-allBooks/${SessionId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

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

        setBookNumbers(data);

        dispatch(setAllBooks(data));

        /* */
      }

      /* Catching the error and displaying it. */
    } catch (error) {
      /* */

      toast.error("Something went wrong. Please try again later!");

      setLoading(false);

      /* */
    }

    /* */
  };

  /* ******************************************************************* */
  /* *******************  useEffect() hooks  *************************** */
  /* ******************************************************************* */

  useEffect(() => {
    /* */

    getAllTickets();

    getAllBooks();

    /* */
  }, []);

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  return (
    /* */

    <Wrapper>
      {/* */}

      <PageNavigation title="Tickets-Books" />

      <Layout title={"Tickets-And-Books-Page"}>
        {/* */}

        <div className="mb-[200px] fonts">
          {/* */}

          {/* *********************************************************************************/}
          {/* Dynamically accessing the above tickets array of the useState() using map function 
              and passing all its data's in the ticket parameter and index's in index parameter.
              And using the TicketCard component to display the card we created 
              in TicketCards.js.
        
              ie. After successfully adding the contents in the tickets array we will display the 
                  Ticket-Card. And passing the ticket, ticket-id, index numbers and ticket-index
                  to the child component ie. TicketCard component so that we can make the ticket
                  card with those details and display it here.
          */}

          {tickets.length > 0 ? (
            <h1 className="text-4xl font-bold font-sans pt-5 mt-[40px] text-center text-[#800000] mx-5">
              ✹ Your individual coupon numbers are ✹
              <br />
            </h1>
          ) : (
            <h3 className="text-4xl text-center font-bold font-sans pt-5 text-[#800000] mx-4">
              ✹ You have not bought any coupons ✹
            </h3>
          )}

          <div
            className="px-5 py-5 border rounded-lg font-semibold text-1xl uppercase 
             mr-5 mt-5 mb-5 ml-5 h-[auto] w-[auto]"
          >
            {/* */}

            {loading && (
              <p className="text-3xl text-slate-700 text-center w-full">
                Loading...
              </p>
            )}

            {tickets.length > 0 ? (
              <div className="grid-four-column w-[auto] mx-auto bg-[#02364A] px-5 py-5 rounded-lg">
                {/* */}

                {tickets?.map((ticket, index) => {
                  return (
                    <div className="grid " key={index}>
                      {ticket.ticketNumbers.map((ticket, index) => {
                        return (
                          <p
                            className="text-[20px] mt-4 font-sans font-semibold text-[#d2dddf] 
                            responsive-tickets"
                            style={{ textAlign: "center" }}
                            key={index}
                          >
                            {" ✦ " + ticket.tickets.join(", ")}
                          </p>
                        );
                      })}
                    </div>
                  );
                })}

                {/* */}
              </div>
            ) : (
              <h3 className="text-center font-bold font-sans text-3xl text-[#800000]">
                No coupons available
              </h3>
            )}

            {/* */}
          </div>

          {/* ***************************************************************************** */}
          {/* Dynamically accessing the above bookNumbers array of the useState() using map 
              function and passing all its data's in the book parameter and index's in index 
              parameter. And using the Book component to display the card we created 
              in BookCard.jsx
        
              ie. After successfully adding the contents in the bookNumbers array we will display 
              the Book-Card. And passing the book, book-id, index numbers and book-index
              to the child component ie. BookCard component so that we can make the book-card
              with those details and display it here.
          */}

          {bookNumbers.length > 0 ? (
            <div className="">
              <h1 className="text-4xl font-bold font-sans pt-5 text-center text-[#800000] mx-4">
                ✹ Your book numbers along with the coupon numbers are ✹
              </h1>
            </div>
          ) : (
            <h3 className="text-center font-bold font-sans pt-5 text-4xl text-[#800000] mx-4">
              ✹ You have not bought any books ✹
            </h3>
          )}

          <div className="border font-semibold uppercase mt-[40px] h-[auto] w-[auto]">
            {/* */}

            {loading && (
              <p className="text-3xl text-slate-700 text-center w-full">
                Loading...
              </p>
            )}

            {bookNumbers.length > 0 ? (
              bookNumbers?.map((books, index) => {
                return (
                  /* */

                  <div
                    className="mt-4 bg-[#02364A] px-5 py-5 rounded-lg responsive-bg"
                    key={index}
                  >
                    {/* */}

                    {/* ************ */}
                    {/* Book Numbers */}

                    <p className="">
                      {/* */}

                      {bookNumbers.length > 0 ? (
                        <span>
                          <span
                            className="mt-4 font-sans font-semibold text-[20px] text-[#d2dddf] 
                            responsive-heading"
                          >
                            Book numbers
                          </span>

                          <span className="text-[20px] mx-3 text-[#d2dddf] responsive-arrow">
                            ➽
                          </span>
                        </span>
                      ) : (
                        ""
                      )}

                      {books.bookNumbers.map((bookNumbers, index) => {
                        return (
                          <span className="mt-4 mb-8">
                            <span
                              className="text-[23px] font-sans font-semibold text-[#d2dddf]
                              responsive-tickets1"
                              key={index}
                            >
                              {"  " + bookNumbers.books.join("  ")}
                            </span>
                          </span>
                        );
                      })}

                      {/* */}
                    </p>

                    {/* **************************************** */}
                    {/* Coupon numbers of the above book numbers */}

                    <p className="mt-[40px]">
                      {/* */}

                      {bookNumbers.length > 0 ? (
                        <div className="mb-[10px]">
                          <span
                            className="mt-4 font-sans font-semibold text-[20px] text-[#d2dddf] 
                            responsive-heading"
                          >
                            Coupon numbers of the above book numbers
                          </span>

                          <span className="text-[20px] mx-3 text-[#d2dddf] responsive-arrow">
                            ➽
                          </span>
                        </div>
                      ) : (
                        ""
                      )}

                      <div
                        className="leading-[50px] py-[30px] responsive-ticket3"
                        style={{
                          textAlign: "center",
                          display: "block",
                        }}
                      >
                        {books.ticketsOfTheBookNumbers.map(
                          (ticketNumbers, index) => {
                            return (
                              <span
                                className="text-[24px] font-sans font-semibold text-[#d2dddf] grid
                                mx-auto px-auto line-clamp-20 responsive-tickets2"
                                key={index}
                              >
                                {ticketNumbers.tickets.join("  ")}
                              </span>
                            );
                          }
                        )}
                      </div>

                      {/* */}
                    </p>

                    {/* */}
                  </div>

                  /* */
                );
              })
            ) : (
              <h3 className="text-center font-bold font-sans text-3xl text-[#800000]">
                No books available
              </h3>
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
}

/* **************************************************************************************** */
/* Using media-queries of styled of styled-components we are providing responsiveness for 
   mobile size and storing in a variable Wrapper. This Wrapper will be use to wrap the whole 
   elements we want to return.
*/
/* **************************************************************************************** */

const Wrapper = styled.section`
  /* */

  .grid {
    flex-direction: row;
    justify-items: center;
    align-items: center;
    width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-bg {
      padding-left: 0px;
      padding-right: 0px;
      margin-left: 0px;
      margin-right: 0px;
    }

    .responsive-tickets {
      font-size: 17px;
      margin-left: -14px;
    }

    .responsive-tickets1 {
      font-size: 1.9rem;
      line-height: 1.9;
      color: #d2dddf;
      font-family: monospace;
    }

    .responsive-tickets2 {
      font-size: 0.7rem;
      color: #d2dddf;
      font-weight: bold;
      padding: auto;
      margin: auto;
      line-height: 3.6;
    }

    .responsive-ticket3 {
      line-height: 3;
    }

    .responsive-heading {
      font-size: 1.8rem;
    }

    .responsive-arrow {
      font-size: 1.8rem;
      margin-top: 30px;
    }

    /* */
  }

  /* */
`;
