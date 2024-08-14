/* */

import React, { useState, useEffect } from "react";

import Layout from "../../Components/All/Layout.jsx";
import PageNavigation from "../../Components/All/PageNavigation.jsx";
import styled from "styled-components";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import { signOutUserSuccess } from "../../Redux/Actions/authActions.jsx";

import { RiDeleteBin5Line } from "react-icons/ri";

import {
  bookSendStart,
  bookSendSuccess,
  bookSendFailure,
} from "../../Redux/Actions/bookActions.jsx";

let SessionId = localStorage.getItem("id");

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function BookBuying() {
  /* */

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState(false);

  const [error, setError] = useState("");

  const [bookNumberFromInput, setBookNumberFromInput] = useState("");

  const [allTicketNumbersInLocal, setAllTicketNumbersInLocal] = useState([]);

  const [allBookNumbersInLocal, setAllBookNumbersInLocal] = useState([]);

  const [dividedBooks, setDividedBooks] = useState([]);

  const [allTickets, setAllTickets] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [ticketsOfTheBookNumber, setTicketsOfTheBookNumber] = useState([]);

  const refreshPage = () => {
    /* */

    /* Reloading the web-page after 5 seconds. */

    setTimeout(function () {
      location.reload();
    }, 10000);

    /* */
  };

  const allTicket = () => {
    /* */

    for (let i = 2012342; i < 2512346; i++) {
      allTickets.push(i);
    }

    /* */
  };

  const allBook = () => {
    /* */

    for (let i = 184567; i < 226234; i++) {
      allBooks.push(i);
    }

    /* */
  };

  const ticketsChecking = () => {
    /* */

    var start = -1;

    var indexToMultiply = -1;

    for (let i = 0; i < allBooks.length; i++) {
      /* */

      if (allBooks[i] == bookNumberFromInput) {
        indexToMultiply = i;
      }

      /* */
    }

    if (indexToMultiply === 0) {
      start = 0;
    } else {
      start = 12 * indexToMultiply;
    }

    for (let j = start; j < 12 + start; j++) {
      /* */

      ticketsOfTheBookNumber.push(allTickets[j]);

      /* */
    }

    /* */
  };

  const addBookToLocal = async (event) => {
    /* */

    try {
      /* */

      event.preventDefault();

      if (bookNumberFromInput === "") {
        /* */

        /* When title or body is empty then we will display a error message. */
        toast.error("Book number cannot be empty");

        /* */
      } else {
        /* */

        ticketsChecking();

        dispatch(bookSendStart());

        const res = await fetch(
          `${VITE_SERVER_URL}/api/book/checkBooksInDB`,

          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              bookNumberFromInput,
              ticketsOfTheBookNumber,
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

            dispatch(bookSendFailure(data.message));

            toast.error(data.message);

            refreshPage();

            setError(data.message);

            setErrorMessage(true);

            setLoading(false);

            return;

            /* */
          }

          /* */
        }

        dispatch(bookSendSuccess(data));

        /* Inside an array there is a function call some which tell us that same records is present 
           inside it or not. If present it will return true otherwise return false.
        */

        if (
          allBookNumbersInLocal.some((value) => {
            return value == bookNumberFromInput;
          })
        ) {
          /* */

          toast.error(
            "You have already selected this book number! Please choose another book number"
          );

          return;

          /* */
        } else {
          /* */

          setLoading(true);

          allBookNumbersInLocal.push(bookNumberFromInput);

          var start = -1;

          var indexToMultiply = -1;

          for (let i = 0; i < allBooks.length; i++) {
            /* */

            if (allBooks[i] == bookNumberFromInput) {
              indexToMultiply = i;
            }

            /* */
          }

          if (indexToMultiply == 0) {
            start = indexToMultiply;
          } else {
            start = 12 * indexToMultiply;
          }

          for (let j = start; j < 12 + start; j++) {
            /* */

            allTicketNumbersInLocal.push(allTickets[j]);

            /* */
          }

          /* Spliting the array in a partition of 12 numbers. */

          var divideSize = 12;

          var dBooks = [];

          for (let i = 0; i < allTicketNumbersInLocal.length; i += divideSize) {
            /* */

            var result = allTicketNumbersInLocal.slice(i, i + divideSize);

            dBooks.push(result);

            /* */
          }

          localStorage.setItem(
            "allTicketNumbers",
            JSON.stringify(allTicketNumbersInLocal)
          );

          localStorage.setItem(
            "allBookNumbers",
            JSON.stringify(allBookNumbersInLocal)
          );

          localStorage.setItem("dividedBooks", JSON.stringify(dBooks));

          setBookNumberFromInput("");

          /* Reloading the web-page. */
          window.location.reload();

          /* */
        }

        /* */
      }

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      dispatch(bookSendFailure(error.message));

      toast.error("Something went wrong. Please try again");

      /* */
    }

    /* */
  };

  const clearLocalStrage = () => {
    /* */

    setAllTicketNumbersInLocal([]);

    setAllBookNumbersInLocal([]);

    setDividedBooks([]);

    /* Reloading the web-page. */
    window.location.reload();

    /* */
  };

  const deleteSingleBookFromLocal = (indexNumber) => {
    /* */

    /* ******************************************************* */
    /* Removing single book number from allBookNumbersInLocal. */

    let filteredBookNumbers = [...allBookNumbersInLocal];

    filteredBookNumbers.splice(indexNumber, indexNumber + 1);

    setAllBookNumbersInLocal(filteredBookNumbers);

    /* ************************************************************************ */
    /* Removing all the tickets of a particular book from setAllTicketsInLocal. */

    let filteredTickets = [...allTicketNumbersInLocal];

    let start = 12 * indexNumber;

    let end = 12 * indexNumber + 12;

    filteredTickets.splice(start, end);

    setAllTicketNumbersInLocal(filteredTickets);

    /* **************************************************************** */
    /* Removing all the tickets of a particular book from dividedBooks. */

    let filteredDividedBooks = [...dividedBooks];

    filteredDividedBooks.splice(indexNumber, indexNumber + 1);

    setDividedBooks(filteredDividedBooks);

    /* Reloading the web-page. */
    window.location.reload();

    /* */
  };

  /* ************************************************************************************** */
  /* ******************************** useEffect() hooks *********************************** */
  /* ************************************************************************************** */

  /* *************************************************************************************** */
  /* Getting the divided-books, all-book-numbers and all-tickets-numbers from the local-storage
     in initial-time. 
  */

  useEffect(() => {
    /* */

    const data = JSON.parse(localStorage.getItem("dividedBooks"));

    if (data) {
      /* */

      setDividedBooks(data);

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

    const data = JSON.parse(localStorage.getItem("allBookNumbers"));

    if (data) {
      /* */

      setAllBookNumbersInLocal(data);

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

    const data = JSON.parse(localStorage.getItem("allTicketNumbers"));

    if (data) {
      /* */

      setAllTicketNumbersInLocal(data);

      /* */
    } else {
      /* */

      return [];

      /* */
    }

    /* */
  }, []);

  /* ************************************************************************************** */
  /* Setting the divided-books, all-book-numbers and all-tickets-numbers in the local-storage
     in initial-time. 
  */

  useEffect(() => {
    /* */

    localStorage.setItem("dividedBooks", JSON.stringify(dividedBooks));

    /* */
  }, [dividedBooks]);

  useEffect(() => {
    /* */

    localStorage.setItem(
      "allBookNumbers",
      JSON.stringify(allBookNumbersInLocal)
    );

    /* */
  }, [allBookNumbersInLocal]);

  useEffect(() => {
    /* */

    localStorage.setItem(
      "allTicketNumbers",
      JSON.stringify(allTicketNumbersInLocal)
    );

    /* */
  }, [allTicketNumbersInLocal]);

  /* ********************************************************************************* */
  /* Getting the valid numbers by calling the validNumbers() function in initial-time. */

  useEffect(() => {
    /* */

    allTicket();

    allBook();

    /* */
  }, []);

  /* ******************************************************************************** */
  /* *******************************    return   ************************************ */
  /* ******************************************************************************** */

  return (
    /* */

    <Wrapper>
      {/* */}

      <Layout title={"Book-buying page"}>
        <div className="mb-[200px] fonts">
          {/* */}

          <PageNavigation title="Book-Buying" />

          <h1 className="text-4xl m-3 p-5 text-center text-[#800000] font-bold">
            🌟 Welcome {currentUser.firstName} !!! 🌟
            <br />
          </h1>

          <img src="/mainImages/mainTicket.jpg" alt="ticket" className="mb-5" />

          <div>
            <p className="text-[23px] p-5 text-center text-[#800000] font-bold">
              Please! buy book numbers below
            </p>
          </div>

          <div className="text-2xl m-3 text-[#154c79] text-center font-bold font-sans responsive-heading1">
            <p className="mr-3 font-bold">
              {/* */}

              <span> Please enter the book numbers </span>

              <span className="font-bold text-3xl text-red-500 m-2">
                one by one
              </span>

              <span> you want to buy below and click on add book </span>

              <p className="mt-4 text-7xl"> ⤵ </p>

              {/* */}
            </p>
          </div>

          <p
            className="text-3xl mt-[30px] ml-[20px] font-semibold font-sans text-[#800000] 
            mb-4 mx-[20px] px-[20px]"
            style={{ textAlign: "center" }}
          >
            <span className="text-4xl"> ➨ </span> Book numbers starts from
            184567 to 226233
          </p>

          {/* ****************************************************** */}
          {/* Creating an input field inside a form for book number. */}

          <div className="text-center flex gap-1 responsive-form">
            <input
              type="number"
              name="book"
              id="book"
              placeholder="Enter Your Book Numbers"
              required
              className="border py-[25px] px-3 mt-4 rounded-lg w-[50%] bg-gray-700 text-white ml-[180px] 
              text-[20px] responsive-form1"
              value={bookNumberFromInput}
              onChange={(event) => {
                setBookNumberFromInput(event.target.value);
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
                onClick={addBookToLocal}
              >
                {loading ? "Adding Please Wait..." : "Add Book"}
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

          {allBookNumbersInLocal.length > 0 ? (
            <div
              className="mx-[10px]"
              style={{
                textAlign: "center",
                display: "block",
              }}
            >
              <h3 className="text-3xl font-bold mb-4 my-[40px]">
                {/* */}

                <p className="mb-4"> ✶ Your Selected Book Numbers ✶ </p>

                {allBookNumbersInLocal?.map((book, index) => {
                  return (
                    <span className="gap-3 pr-4" key={index}>
                      {/* */}

                      {"✦" + book + " "}

                      {/* */}
                    </span>
                  );
                })}

                {/* */}
              </h3>

              <h3 className="text-3xl m-3 leading-10 font-bold mb-4 mt-[40px]">
                ✶ The Coupon numbers for the selected book numbers are shown
                below ✶
              </h3>

              {/* */}
            </div>
          ) : (
            ""
          )}

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

          {dividedBooks.length > 0 ? (
            <div
              className="px-5 py-5 border rounded-lg font-semibold text-1xl uppercase bg-slate-800
               text-gray-300 ml-4 mr-4 mt-5 mb-[35px] responsive-bg-table"
            >
              {/* */}

              {loading && (
                <p className="text-3xl text-gray-300 text-center w-full">
                  Loading...
                </p>
              )}

              <div className="grid grid-four-column">
                {/* */}

                {dividedBooks?.map((book, index) => {
                  return (
                    <div
                      className="grid gap-3 mt-4 mb-6"
                      key={index}
                      style={{ textAlign: "center" }}
                    >
                      {/* */}

                      <p className="text-[25px] mt-2 font-mono responsive-tickets">
                        {book.join(" ")}
                      </p>

                      <button
                        className="flex px-2 py-1 cursor-pointer uppercase font-sans"
                        onClick={() => deleteSingleBookFromLocal(index)}
                      >
                        <p className="mr-3 text-3xl responsive-numbering">
                          ({index + 1})
                        </p>

                        <RiDeleteBin5Line
                          className="font-bold cursor-pointer hover:scale-105 transition-scale mr-2
                          text-[30px] responsive-delete-icon"
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

          {/* *********************************************************************** */}
          {/* Creating a button to delete the entire books. ie.. to delete all the books
              present in a particular local-storage of a particular user.
          */}

          {dividedBooks.length > 1 ? (
            <div
              style={{
                textAlign: "center",
                display: "block",
              }}
            >
              <button
                className="mt-5 px-2 cursor-pointer uppercase mb-[20px]"
                onClick={() => clearLocalStrage()}
              >
                <p className="text-[24px] mr-2 font-bold font-sans responsive-text">
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

          {dividedBooks.length > 0 ? (
            <Link
              to={"/bookSummaryPage/?step=2"}
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

    .responsive-tickets {
      font-size: 2.4rem;
    }

    .responsive-bg-table {
      height: auto;
      margin: 5px;
    }

    .responsive-delete-icon {
      font-size: 2.5rem;
    }

    .responsive-deleteAll-icon {
      font-size: 3rem;
    }

    .responsive-numbering {
      font-size: 2rem;
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
