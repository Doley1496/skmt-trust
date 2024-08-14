/* */

import ticketPaymentModel from "../Models/ticketPaymentModel.js";

import bookPaymentModel from "../Models/bookPaymentModel.js";

import { errorHandler } from "../Middlewares/errorHandler.js";

/*************************************************************************************************/
/***************************    1: Reading(get) All Tickets Controller    ************************/
/*************************************************************************************************/

/* Creating a controller with name getAllTicketsController which will get all the Tickets
   from our database.
*/

export const getAllTicketsController = async (req, res, next) => {
  /* */

  try {
    /* */

    const allTickets = await ticketPaymentModel
      .find({ userId: req.params.id })
      .sort({ createdAt: -1 });

    if (allTickets.length !== 0) {
      /* */

      res.status(200).json(allTickets);

      /* */
    } else {
      res.status(200).send({
        success: true,
        message: "No Ticket Available",
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
/*******************************  2. Checking a Ticket.   *****************************************/
/**************************************************************************************************/

/* Creating a controller with name checkTicketInDBforLocalStorageController to check an ticket 
   exists in the database or not. 
*/

export const checkTicketInDBforLocalStorageController = async (
  req,
  res,
  next
) => {
  /* */

  try {
    /* */

    /* Destructing all the schema's from req.body. */
    const { ticketNumberFromInput, userId } = req.body;

    if (ticketNumberFromInput < 2012342) {
      return next(
        errorHandler(
          404,
          "Please choose ticket number between 2012342 to 2512345"
        )
      );

      /* */
    } else if (ticketNumberFromInput > 2512345) {
      return next(
        errorHandler(
          404,
          "Please choose ticket number between 2012342 to 2512345"
        )
      );
    }

    /* Previously if a user has already bought any tickets and again he wants to buy more
       tickets then we will not create any extra model, instead we will add the new tickets
       in his same tickets array of his model.

       Else if the login user has not bought any tickets previously and wants to buy new
       tickets then we will create a new model for him and store his tickets in his array.
    */

    const existingUserId = await ticketPaymentModel.findOne({ userId });

    if (existingUserId) {
      /* */

      const existingTicket = await ticketPaymentModel.findOne({
        "ticketNumbers.tickets": ticketNumberFromInput,
      });

      if (existingTicket) {
        return next(
          errorHandler(
            404,
            "You have already bought this Ticket Number. Please choose another ticket number"
          )
        );
      }

      const existingTicketsOfTheBookNumbers = await bookPaymentModel.findOne({
        "ticketsOfTheBookNumbers.tickets": {
          $elemMatch: {
            $elemMatch: { $in: [ticketNumberFromInput] },
          },
        },
      });

      if (existingTicketsOfTheBookNumbers) {
        return next(
          errorHandler(
            404,
            "You have already bought this Ticket Number. Please choose another ticket number"
          )
        );
      }

      res.status(200).json("ALL GOOD");

      /* */
    } else {
      /* */

      const existingTicket = await ticketPaymentModel.findOne({
        "ticketNumbers.tickets": ticketNumberFromInput,
      });

      if (existingTicket) {
        return next(
          errorHandler(
            404,
            "This Ticket Number is already sold. Please choose another ticket number"
          )
        );
      }

      const existingTicketsOfTheBookNumbers = await bookPaymentModel.findOne({
        "ticketsOfTheBookNumbers.tickets": {
          $elemMatch: {
            $elemMatch: { $in: [ticketNumberFromInput] },
          },
        },
      });

      if (existingTicketsOfTheBookNumbers) {
        return next(
          errorHandler(
            404,
            "This Ticket Number is already sold. Please choose another ticket number"
          )
        );
      }

      res.status(200).json("ALL GOOD");

      /* */
    }

    /* */
  } catch (error) {
    /* */

    next(error);
  }

  /* */
};
