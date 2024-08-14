/* */

import ticketPaymentModel from "../Models/ticketPaymentModel.js";

import bookPaymentModel from "../Models/bookPaymentModel.js";

import membershipPaymentModel from "../Models/membershipPaymentModel.js";

import Razorpay from "razorpay";

import crypto from "crypto";

/**************************************************************************/
/*****************  1: Creating Controller for getting apiKey  ************/
/**************************************************************************/

/* Creating a controller with name getRazorpayKeyIdController which will send us the
   apiKey to the frontend.
*/

export const getRazorpayKeyIdController = async (req, res, next) => {
  /* */

  try {
    /* */

    return res
      .status(200)
      .json({ razorpayApiKey: process.env.RAZORPAY_API_KEY });

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/*********************************************************************/
/*****************  2: Creating Controller for checkout   ************/
/*********************************************************************/

/* Creating a controller with name RazorpayCheckoutController which will do the
   checkout of the payment.
*/

export const RazorpayCreateOrderController = async (req, res, next) => {
  /* */

  try {
    /* */

    const { amount } = req.body;

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_SECRET,
    });

    const options = {
      amount: Number(amount * 100),
      currency: "INR",
      // receipt: crypto.randomBytes(10).toString("hex"),
    };

    const order = await instance.orders.create(options);

    if (order) {
      res.status(200).json({
        success: true,
        order,
      });

      /* */
    } else {
      /* */

      return res.send({ status: 400, message: "Server Error" });

      /* */
    }

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/************************************************************** */
/*  3: Creating Controller for payment verification of tickets. */
/************************************************************** */

export const RazorpayPaymentVerificationForTicketController = async (
  req,
  res,
  next
) => {
  /* */

  try {
    /* */

    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      numberOfPayments,
      amount,
      userId,
      ticketNumbers,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      /* */

      const existingUserId = await ticketPaymentModel.findOne({ userId });

      if (existingUserId) {
        /* */

        const newTicketOrder = await ticketPaymentModel.findOneAndUpdate(
          {
            userId,
          },

          {
            // $addToSet = save non-duplicate elements only
            // $push = save all elements

            $addToSet: {
              ticketNumbers: [{ tickets: ticketNumbers }],
              razorpay_payment_id: razorpay_payment_id,
              razorpay_order_id: razorpay_order_id,
              razorpay_signature: razorpay_signature,
            },

            $push: {
              amount: amount,
              isPaid: true,
            },

            $set: {
              numberOfPayments: numberOfPayments,
            },
          }

          /* */
        );

        if (newTicketOrder) {
          /* */

          res.status(200).json({
            success: "true",
            newTicketOrder,
            amount: amount,
            ticketNumbers: ticketNumbers,
            razorpay_payment_id: razorpay_payment_id,
            razorpay_order_id: razorpay_order_id,
            isPaid: true,
          });

          /* */
        }

        /* */
      } else {
        /* */

        const newTicketOrder = await ticketPaymentModel.create({
          numberOfPayments: numberOfPayments,
          userId: userId,
          ticketNumbers: [{ tickets: ticketNumbers }],
          amount: amount,
          isPaid: true,
          razorpay_payment_id: razorpay_payment_id,
          razorpay_order_id: razorpay_order_id,
          razorpay_signature: razorpay_signature,
        });

        if (newTicketOrder) {
          /* */

          res.status(200).json({
            success: "true",
            newTicketOrder,
            amount: amount,
            ticketNumbers: ticketNumbers,
            razorpay_payment_id: razorpay_payment_id,
            razorpay_order_id: razorpay_order_id,
            isPaid: true,
          });

          /* */
        }

        // res.redirect(
        //   `http://localhost:5173/paymentSuccess?reference=${razorpay_payment_id}`
        // );

        /* */
      }

      /* */
    } else {
      /* */

      res.redirect("http://localhost:5173/paymentFail");

      /* */
    }

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/************************************************************ */
/*  4: Creating Controller for payment verification of books. */
/************************************************************ */

export const RazorpayPaymentVerificationForBookController = async (
  req,
  res,
  next
) => {
  /* */

  try {
    /* */

    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      numberOfPayments,
      amount,
      userId,
      bookNumbers,
      ticketsOfTheBookNumbers,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      /* */

      const existingUserId = await bookPaymentModel.findOne({ userId });

      if (existingUserId) {
        /* */

        const newBookOrder = await bookPaymentModel.findOneAndUpdate(
          {
            userId,
          },

          {
            // $addToSet = save non-duplicate elements only
            // $push = save all elements

            $addToSet: {
              bookNumbers: [{ books: bookNumbers }],

              ticketsOfTheBookNumbers: [{ tickets: ticketsOfTheBookNumbers }],

              razorpay_payment_id: razorpay_payment_id,
              razorpay_order_id: razorpay_order_id,
              razorpay_signature: razorpay_signature,
            },

            $push: {
              amount: amount,
              isPaid: true,
            },

            $set: {
              numberOfPayments: numberOfPayments,
            },

            /* */
          }
        );

        if (newBookOrder) {
          /* */

          res.status(200).json({
            success: "true",
            newBookOrder,
            amount: amount,
            bookNumbers: bookNumbers,
            razorpay_payment_id: razorpay_payment_id,
            razorpay_order_id: razorpay_order_id,
            isPaid: true,
          });

          /* */
        }

        /* */
      } else {
        /* */

        const newBookOrder = await bookPaymentModel.create({
          numberOfPayments: numberOfPayments,
          userId: userId,

          bookNumbers: [{ books: bookNumbers }],

          ticketsOfTheBookNumbers: [{ tickets: ticketsOfTheBookNumbers }],

          amount: amount,
          isPaid: true,
          razorpay_payment_id: razorpay_payment_id,
          razorpay_order_id: razorpay_order_id,
          razorpay_signature: razorpay_signature,
        });

        if (newBookOrder) {
          /* */

          res.status(200).json({
            success: "true",
            newBookOrder,
            amount: amount,
            bookNumbers: bookNumbers,
            razorpay_payment_id: razorpay_payment_id,
            razorpay_order_id: razorpay_order_id,
            isPaid: true,
          });

          /* */
        }

        /* */
      }

      /* */
    } else {
      /* */

      res.redirect("http://localhost:5173/paymentFail");

      /* */
    }

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/***************************************************************** */
/*  5: Creating Controller for payment verification of membership. */
/***************************************************************** */

export const RazorpayPaymentVerificationForMembershipController = async (
  req,
  res,
  next
) => {
  /* */

  try {
    /* */

    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      numberOfPayments,
      amount,
      userId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      /* */

      const existingUserId = await membershipPaymentModel.findOne({ userId });

      if (existingUserId) {
        /* */

        const newMembershipOrder =
          await membershipPaymentModel.findOneAndUpdate(
            {
              userId,
            },

            {
              // $addToSet = save non-duplicate elements only
              // $push = save all elements

              $addToSet: {
                razorpay_payment_id: razorpay_payment_id,
                razorpay_order_id: razorpay_order_id,
                razorpay_signature: razorpay_signature,
              },

              $push: {
                amount: amount,
                isPaid: true,
              },

              $set: {
                numberOfPayments: numberOfPayments,
              },

              /* */
            }
          );

        if (newMembershipOrder) {
          /* */

          res.status(200).json({
            success: "true",
            newMembershipOrder,
            amount: amount,
            razorpay_payment_id: razorpay_payment_id,
            razorpay_order_id: razorpay_order_id,
            isPaid: true,
          });

          /* */
        }

        /* */
      } else {
        /* */

        const newMembershipOrder = await membershipPaymentModel.create({
          numberOfPayments: numberOfPayments,
          userId: userId,
          amount: amount,
          isPaid: true,
          razorpay_payment_id: razorpay_payment_id,
          razorpay_order_id: razorpay_order_id,
          razorpay_signature: razorpay_signature,
        });

        if (newMembershipOrder) {
          /* */

          res.status(200).json({
            success: "true",
            newMembershipOrder,
            amount: amount,
            razorpay_payment_id: razorpay_payment_id,
            razorpay_order_id: razorpay_order_id,
            isPaid: true,
          });

          /* */
        }

        /* */
      }

      /* */
    } else {
      /* */

      res.redirect("http://localhost:5173/paymentFail");

      /* */
    }

    /* Catching the error and passing to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/********************************************************** */
/*  6.  Getting membership-user payment details Controller. */
/********************************************************** */

export const getMembershipPaymentDetailsController = async (req, res, next) => {
  /* */

  try {
    /* */

    const paymentDetails = await membershipPaymentModel
      .find({ userId: req.params.id })
      .sort({ createdAt: -1 });

    if (paymentDetails.length !== 0) {
      /* */

      res.status(200).json(paymentDetails);

      /* */
    } else {
      /* */

      res.status(400).json("No Payment Details Found");

      /* */
    }

    /* Catching the error and passing to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/********************************************************** */
/*  7.  Getting ticket payment details Controller. */
/********************************************************** */

export const getTicketPaymentDetailsController = async (req, res, next) => {
  /* */

  try {
    /* */

    const paymentDetails = await ticketPaymentModel
      .find({ userId: req.params.id })
      .sort({ createdAt: -1 });

    if (paymentDetails.length !== 0) {
      /* */

      res.status(200).json(paymentDetails);

      /* */
    } else {
      /* */

      res.status(400).json("No Payment Details Found");

      /* */
    }

    /* Catching the error and passing to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/********************************************************** */
/*  8.  Getting book payment details Controller. */
/********************************************************** */

export const getBookPaymentDetailsController = async (req, res, next) => {
  /* */

  try {
    /* */

    const paymentDetails = await bookPaymentModel
      .find({ userId: req.params.id })
      .sort({ createdAt: -1 });

    if (paymentDetails.length !== 0) {
      /* */

      res.status(200).json(paymentDetails);

      /* */
    } else {
      /* */

      res.status(400).json("No Payment Details Found");

      /* */
    }

    /* Catching the error and passing to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};
