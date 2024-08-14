/* */

import express from "express";

const router = express.Router();

import { verifyJwtToken } from "../Middlewares/verifyUser.js";

import {
  getRazorpayKeyIdController,
  RazorpayCreateOrderController,
  RazorpayPaymentVerificationForTicketController,
  RazorpayPaymentVerificationForBookController,
  RazorpayPaymentVerificationForMembershipController,
  getMembershipPaymentDetailsController,
  getTicketPaymentDetailsController,
  getBookPaymentDetailsController,
} from "../Controllers/paymentController.js";

router.post("/create-order", RazorpayCreateOrderController);

router.get("/getRazorpayKeyId", getRazorpayKeyIdController);

router.post(
  "/paymentVerification",
  RazorpayPaymentVerificationForTicketController
);

router.post(
  "/ticketPaymentVerification",
  verifyJwtToken,
  RazorpayPaymentVerificationForTicketController
);

router.post(
  "/bookPaymentVerification",
  verifyJwtToken,
  RazorpayPaymentVerificationForBookController
);

router.post(
  "/membershipPaymentVerification",
  verifyJwtToken,
  RazorpayPaymentVerificationForMembershipController
);

router.get(
  "/get-membership-payment-details/:id",
  verifyJwtToken,
  getMembershipPaymentDetailsController
);

router.get(
  "/get-ticket-payment-details/:id",
  verifyJwtToken,
  getTicketPaymentDetailsController
);

router.get(
  "/get-book-payment-details/:id",
  verifyJwtToken,
  getBookPaymentDetailsController
);

export default router;
