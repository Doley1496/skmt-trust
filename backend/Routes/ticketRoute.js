/* */

import express from "express";

const router = express.Router();

import {
  getAllTicketsController,
  checkTicketInDBforLocalStorageController,
} from "../Controllers/ticketController.js";

import { verifyJwtToken } from "../Middlewares/verifyUser.js";

router.post(
  "/checkTicketsInDB",
  verifyJwtToken,
  checkTicketInDBforLocalStorageController
);

router.get("/get-allTickets/:id", verifyJwtToken, getAllTicketsController);

export default router;
