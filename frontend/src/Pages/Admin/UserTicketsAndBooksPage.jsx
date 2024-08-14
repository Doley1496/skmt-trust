/* */

import React, { useState, useEffect } from "react";

import Layout from "../../Components/All/Layout.jsx";

import styled from "styled-components";

import { useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { signOutUserSuccess } from "../../Redux/Actions/authActions.jsx";

import { setAllTickets } from "../../Redux/Actions/ticketActions.jsx";
import { setAllBooks } from "../../Redux/Actions/bookActions.jsx";

import UserTicketCard from "../../Components/All/UserTicketCard.jsx";
import UserBookCard from "../../Components/All/UserBookCard.jsx";

let SessionId = sessionStorage.getItem("id");

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function Payment() {
  /* */

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [tickets, setTickets] = useState([]);

  const [bookNumbers, setBookNumbers] = useState([]);

  const getAllTickets = async () => {
    /* */

    try {
      /* */

      if (SessionId) {
        /* */

        setLoading(true);

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

        setTickets(data);

        setLoading(false);

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

      if (SessionId) {
        /* */

        setLoading(true);

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

        setBookNumbers(data);

        setLoading(false);

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

      <Layout title={"Users-Tickets-And-Books-Page"}>
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

          <h1 className="text-4xl pt-5 text-center text-[#800000]">
            Customer Ticket Numbers are
            <br />
          </h1>

          <div className="row mt-2 mb-2 p-3 items-center">
            {/* */}

            {loading && (
              <p className="text-3xl text-slate-700 text-center w-full">
                Loading...
              </p>
            )}

            {!loading && tickets.length === 0 && (
              <h3 className="text-center text-3xl text-[#800000]">
                No Tickets Available
              </h3>
            )}

            {!loading &&
              tickets &&
              tickets.map(
                (ticket, index) => (
                  <div key={index} className="grid ">
                    {/* */}

                    <UserTicketCard ticket={ticket} ticketId={ticket._id} />

                    {/* */}
                  </div>
                )

                /* */
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

          <h1 className="text-4xl pt-5 text-center text-[#800000]">
            Customer Books Numbers are
            <br />
          </h1>

          <div className="row mt-2 mb-2 p-3 items-center">
            {/* */}

            {loading && (
              <p className="text-3xl text-slate-700 text-center w-full">
                Loading...
              </p>
            )}

            {!loading && bookNumbers.length === 0 && (
              <h3 className="text-center text-3xl text-[#800000]">
                No Books Available
              </h3>
            )}

            {!loading &&
              bookNumbers &&
              bookNumbers.map((book, index) => (
                /* */

                <div key={index} className="grid">
                  {/* */}

                  <UserBookCard book={book} bookId={book._id} />

                  {/* */}
                </div>

                /* */
              ))}

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

    display: flex;
    flex-direction: column;
    order: 1;

    /* */
  }

  /* */
`;
