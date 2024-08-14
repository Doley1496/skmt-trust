/* */

import React, { useState, useEffect } from "react";

import Layout from "../../Components/All/Layout.jsx";
import PageNavigation from "../../Components/All/PageNavigation.jsx";
import styled from "styled-components";

import { RiDeleteBin5Line } from "react-icons/ri";

import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { signOutUserSuccess } from "../../Redux/Actions/authActions.jsx";

import {
  ticketSendStart,
  ticketSendFailure,
  ticketSendSuccess,
} from "../../Redux/Actions/ticketActions.jsx";

let SessionId = localStorage.getItem("id");

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function TicketBuyingPage() {
  /* */

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState(false);

  const [error, setError] = useState("");

  const [ticketNumberFromInput, setTicketNumberFromInput] = useState("");

  const [tickets, setTickets] = useState([]);

  const addTicketToLocal = async (event) => {
    /* */

    try {
      /* */

      event.preventDefault();

      if (ticketNumberFromInput === "") {
        /* */

        /* When title or body is empty then we will display a error message. */
        toast.error("Ticket number cannot be Empty");

        /* */
      } else {
        /* */

        dispatch(ticketSendStart());

        const res = await fetch(
          `${VITE_SERVER_URL}/api/ticket/checkTicketsInDB`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ticketNumberFromInput,
              userId: SessionId,
            }),
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

            dispatch(ticketSendFailure(data.message));

            toast.error(data.message);

            setError(data.message);

            setErrorMessage(true);

            return;

            /* */
          }

          /* */
        }

        dispatch(ticketSendSuccess(data));

        // let user_tickets = new Array();

        // user_tickets = JSON.parse(localStorage.getItem("tickets"))
        //   ? JSON.parse(localStorage.getItem("tickets"))
        //   : [];

        /* Inside an array there is a function call some which tell us that same records is present
           inside it or not. If present it will return true otherwise return false.
        */

        if (
          tickets.some((value) => {
            return value == ticketNumberFromInput;
          })
        ) {
          /* */

          toast.error(
            "You have already selected this ticket number! Please choose another ticket number"
          );

          /* */
        } else {
          /* */

          setLoading(true);

          tickets.push(ticketNumberFromInput);

          localStorage.setItem("tickets", JSON.stringify(tickets));

          setTicketNumberFromInput("");

          /* Reloading the web-page. */
          window.location.reload();

          /* */
        }

        /* */
      }

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      dispatch(ticketSendFailure(error.message));

      toast.error("Something went wrong. Please try again later!");

      /* */
    }

    /* */
  };

  const deleteSingleTicketFromLocal = (indexNumber) => {
    /* */

    let filteredTickets = [...tickets];

    filteredTickets.splice(indexNumber, indexNumber + 1);

    setTickets(filteredTickets);

    window.location.reload();

    /* */
  };

  /* ******************************************************************* */
  /* *******************  useEffect() hooks  *************************** */
  /* ******************************************************************* */

  /* *********************************************************************** */
  /* Getting and Setting the tickets from the local-storage in initial-time. */

  useEffect(() => {
    /* */

    const data = JSON.parse(localStorage.getItem("tickets"));

    if (data) {
      /* */

      setTickets(data);

      /* */
    } else {
      /* */

      return [];

      /* */
    }

    /* */
  }, []);

  useEffect(() => {
    /* */

    localStorage.setItem("tickets", JSON.stringify(tickets));

    /* */
  }, [tickets]);

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  return (
    /* */

    <Wrapper>
      {/* */}

      <PageNavigation title="Coupon-Buying" />

      <Layout title={"Coupon-Buying-Page"}>
        {/* */}

        <div className="mb-[200px] fonts">
          {/* */}

          <h1 className="text-4xl m-3 p-5 text-center text-[#800000] font-bold">
            🌟 Welcome {currentUser.firstName} !!! 🌟
            <br />
          </h1>

          <img src="/mainImages/mainTicket.jpg" alt="ticket" className="mb-5" />

          <div>
            <p className="text-[23px] p-5 text-center text-[#800000] font-bold">
              Please! buy coupon numbers below
            </p>
          </div>

          <div className="text-2xl m-3 text-[#154c79] text-center font-bold font-sans responsive-heading1">
            <p className="mr-3 font-bold">
              {/* */}

              <span>Please enter the coupon numbers</span>

              <span className="font-bold text-3xl text-red-500 m-2">
                one by one
              </span>

              <span>you want to buy below and click on add coupon</span>

              <p className="mt-4 text-7xl"> ⤵ </p>

              {/* */}
            </p>
          </div>

          <p
            className="text-3xl mt-[30px] ml-[20px] font-semibold font-sans text-[#800000] 
            mb-4 mx-[10px] px-[20px] line-clamp-10"
            style={{ textAlign: "center" }}
          >
            <span className="text-4xl"> ➨ </span> Coupons numbers starts from
            2012342 to 2512345
          </p>

          {/* ******************************************************** */}
          {/* Creating an input field inside a form for ticket number. */}

          <div className="text-center flex gap-1 mb-[37px] responsive-form">
            <input
              type="number"
              name="ticket"
              id="ticket"
              placeholder="Enter Your Coupon Numbers"
              required
              className="border py-[25px] px-3 mt-4 rounded-lg w-[50%] bg-gray-700 text-white ml-[180px] 
              text-[20px] responsive-form1"
              value={ticketNumberFromInput}
              onChange={(event) => {
                setTicketNumberFromInput(event.target.value);
              }}
            />

            <div
              style={{
                textAlign: "center",
                display: "block",
              }}
            >
              <button
                className="bg-[#800000] text-[#eee6e8] rounded-lg uppercase hover:opacity-75 text-2xl
                disabled:opacity-90 font-bold h-[83px] mt-[18px] px-5 py-3 responsive-form2"
                onClick={addTicketToLocal}
              >
                {loading ? "Adding Please Wait..." : "Add Coupon"}
              </button>
            </div>

            {/* */}
          </div>

          {/* ********************************************************************************* */}
          {/* If some tickets of the book-number are sold then we will display a error message. */}

          <div
            className="text-3xl mt-4 mx-4 font-bold font-sans"
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            <p className="text-[#a13333] mb-4">{errorMessage && error}</p>
          </div>

          {tickets.length > 0 ? (
            <div
              className="mx-[10px]"
              style={{
                textAlign: "center",
                display: "block",
              }}
            >
              {/* */}

              <h3 className="text-4xl font-bold text-center my-[40px] text-slate-900 responsive-heading">
                ✷ Your Selected Coupons ✷
              </h3>

              {/* */}
            </div>
          ) : (
            ""
          )}

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
            <div
              className="px-5 py-5 border rounded-lg font-semibold text-1xl uppercase bg-slate-800
               text-gray-300 ml-4 mr-4 mt-5 mb-[35px] h-[auto] responsive-bg-table"
            >
              {/* */}

              {loading && (
                <p className="text-3xl text-gray-300 text-center w-full">
                  Loading...
                </p>
              )}

              <div className="grid grid-four-column">
                {/* */}

                {tickets.map((ticket, index) => {
                  return (
                    <div
                      className="my-6 py-6"
                      key={index}
                      style={{ textAlign: "center" }}
                    >
                      {/* */}

                      <p className="text-[27px] font-sans responsive-tickets">
                        {ticket}
                      </p>

                      <button
                        onClick={() => deleteSingleTicketFromLocal(index)}
                      >
                        <RiDeleteBin5Line
                          className="font-bold cursor-pointer hover:scale-105 transition-scale 
                          text-[24px] hover:bg-red-600 rounded-lg mx-[35px] responsive-delete-icon"
                        />
                      </button>

                      {/* */}
                    </div>
                  );
                })}

                {/* */}
              </div>

              {/* */}
            </div>
          ) : (
            ""
          )}

          {/* ******************************************************************************** */}
          {/* Creating a button to delete the entire ticket model. ie.. to delete all the tickets
              present in a particular tickets array of a particular user.
          */}

          {tickets.length > 1 ? (
            <div
              style={{
                textAlign: "center",
                display: "block",
              }}
            >
              <button
                className="mt-5 px-2 cursor-pointer uppercase mb-[20px]"
                onClick={() => setTickets([])}
              >
                <p className="text-[24px] font-bold font-sans responsive-text">
                  Delete All
                </p>

                <RiDeleteBin5Line
                  className="font-bold cursor-pointer hover:scale-95 transition-scale mx-auto
                  text-[26px] hover:bg-red-600 rounded-lg responsive-deleteAll-icon"
                />
              </button>
            </div>
          ) : (
            ""
          )}

          <Link
            to="/dashboard/user/ticketsAndBooks"
            style={{
              textAlign: "center",
              display: "block",
            }}
            className="py-[40px] px-[20px] bg-[#0d2e21] text-[#d8d0d2] rounded-lg hover:opacity-75 
            disabled:opacity-90 font-sans font-semibold text-[26px] hover:bg-[#a07422]
            w-[60%] mx-auto mt-[80px] responsive-coupons-books"
          >
            Click to see your already bought Coupons and Books
          </Link>

          {tickets.length > 0 ? (
            <Link
              to={"/ticketSummaryPage/?step=2"}
              className="py-[20px] px-4 bg-[#800000] text-[#d8d0d2] rounded-lg hover:opacity-75 
              disabled:opacity-90 font-sans font-semibold text-4xl w-[30%] mx-auto mt-[80px] 
              hover:bg-[#A91B60] responsive-button"
              style={{
                textAlign: "center",
                display: "block",
              }}
            >
              Proceed to pay
            </Link>
          ) : (
            ""
          )}

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

  .grid-four-column {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-text {
      font-size: 2.4rem;
    }

    .responsive-form {
      margin: 5px;
      display: flex;
      flex-direction: column;
    }

    .responsive-form1 {
      margin: auto;
      width: 100%;
    }

    .responsive-form2 {
      width: 60%;
      height: 50px;
      font-size: 16px;
    }

    .grid-four-column {
      grid-template-columns: 1fr 1fr 1fr;
    }

    .responsive-bg-table {
      height: auto;
      margin: 5px;
    }

    .responsive-tickets {
      font-size: 2.5rem;
      margin-left: -10px;
    }

    .responsive-delete-icon {
      font-size: 2.6rem;
      margin-left: 30px;
    }

    .responsive-deleteAll-icon {
      font-size: 3rem;
    }

    .responsive-summary {
      margin: auto;
      padding-left: 10px;
      height: 60vh;
      margin-top: 40px;
    }

    .hide {
      display: none;
    }

    .responsive-x {
      font-size: 2.4rem;
    }

    .responsive-button {
      width: 75%;
      font-size: 2.6rem;
      padding: 20px;
    }

    .responsive-coupons-books {
      font-size: 2.4rem;
      width: 100%;
      padding: 24px;
      line-height: 1.4;
    }

    /* */
  }

  /* */
`;
