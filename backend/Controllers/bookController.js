/* */

import bookPaymentModel from "../Models/bookPaymentModel.js";

import ticketPaymentModel from "../Models/ticketPaymentModel.js";

import { errorHandler } from "../Middlewares/errorHandler.js";

/*************************************************************************************************/
/***************************    1: Reading(get) All Tickets Controller    ************************/
/*************************************************************************************************/

/* Creating a controller with name getAllBooksController which will get all the Books
   from our database.
*/

export const getAllBooksController = async (req, res, next) => {
  /* */

  try {
    /* */

    /* Finding all the Books of a particular user on basis of its id present in our database 
       by using mongoose find({}) method.
       And sorting the todo-list according to created time.
    */
    const allBooks = await bookPaymentModel
      .find({ userId: req.params.id })
      .sort({ createdAt: -1 });

    /* When the ticket database is not empty.    
       ie. When we will successfully get all the Tickets from our database for a particular 
           user's id we will send a success response message and display all the tickets.  
           Else we will display that no tickets is available for that particluar user.    
    */

    if (allBooks.length !== 0) {
      /* */

      res.status(200).json(allBooks);

      /* */
    } else {
      res.status(200).send({
        success: true,
        message: "No Book Available",
      });
    }

    /* Catching the error and displaying it. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/**************************************************************************************************/
/*******************************   2. Checking a Book.    *****************************************/
/**************************************************************************************************/

/* Creating a controller with name checkBookInDBforLocalStorageController to check an book 
   exists in the database or not. 
*/

export const checkBookInDBforLocalStorageController = async (
  req,
  res,
  next
) => {
  /* */

  try {
    /* */

    /* Destructing all the schema's from req.body. */
    const { bookNumberFromInput, ticketsOfTheBookNumber, userId } = req.body;

    const bookNo = req.body.bookNumberFromInput;

    if (bookNo < 184567) {
      return next(
        errorHandler(400, "Please choose book number between 184567 to 226233")
      );

      /*  */
    } else if (bookNo > 226233) {
      return next(
        errorHandler(400, "Please choose book number between 184567 to 226233")
      );
    }

    /* Previously if a user has already bought any tickets and again he wants to buy more
       tickets then we will not create any extra model, instead we will add the new tickets
       in his same tickets array of his model.

       Else if the login user has not bought any tickets previously and wants to buy new
       tickets then we will create a new model for him and store his tickets in his array.
    */

    const existingUserId = await bookPaymentModel.findOne({ userId });

    if (existingUserId) {
      /* */

      /* Checking the current book number is a existing book number or not in our 
         database using findOne() mongoose method with $elemMatch method on the basis of the book number
         we will received from the input field.
      */

      // const existingBook = await bookPaymentModel.findOne({
      //   "bookNumbers.books": {
      //     $elemMatch: {
      //       $elemMatch: { $in: [bookNumberFromInput] },
      //     },
      //   },
      // });

      const existingBook = await bookPaymentModel.findOne({
        "bookNumbers.books": bookNumberFromInput,
      });

      /* If the ticket number already exists in our database ie. already sold then we will return
         an error by passing the middleware function errorHandler() that we created in 
         errorHandler.js with statusCode 404 and send a error message.
      */

      if (existingBook) {
        return next(
          errorHandler(
            400,
            "You have already bought this Book Number. Please choose another book number"
          )
        );
      }

      const existingTickets = await ticketPaymentModel.find({
        "ticketNumbers.tickets": { $in: ticketsOfTheBookNumber },
      });

      if (existingTickets.length) {
        return next(
          errorHandler(
            400,
            "Some of the tickets of this Book Number are already sold to you. So, Please choose another book number or choose ticket numbers that are available for this book number."
          )
        );
      }

      /* Then we will send a response with statusCode 200 and we will send a message. */

      res.status(200).json({ message: "ALL GOOD" });

      /* */
    } else {
      /* */

      /* Checking the current book numbers is a existing book number or not in our database using 
         findOne() mongoose method on the basis of the books number we received from the input field.
      */

      const existingBook = await bookPaymentModel.findOne({
        "bookNumbers.books": bookNumberFromInput,
      });

      /* If the book number already exists in our database ie. already sold then we will return an 
         error by passing the middleware function errorHandler() that we created in errorHandler.js
         with statusCode 404 and send a error message.
      */

      if (existingBook) {
        return next(
          errorHandler(
            400,
            "This Book Number is already sold. Please choose another book number"
          )
        );
      }

      const existingTickets = await ticketPaymentModel.find({
        "ticketNumbers.tickets": { $in: ticketsOfTheBookNumber },
      });

      if (existingTickets.length) {
        return next(
          errorHandler(
            400,
            "Some of the tickets of this Book Number are already sold. So, Please choose another book number or choose ticket numbers that are available for this book number."
          )
        );
      }

      /* Then we will send a response with statusCode 200 and we will send a message. */

      res.status(200).json({ message: "ALL GOOD" });

      /* */
    }

    /* */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};
