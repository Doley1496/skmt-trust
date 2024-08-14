/* */

import express from "express";

const router = express.Router();

import { verifyJwtToken } from "../Middlewares/verifyUser.js";

import {
  getAllBooksController,
  checkBookInDBforLocalStorageController,
} from "../Controllers/bookController.js";

router.post(
  "/checkBooksInDB",
  verifyJwtToken,
  checkBookInDBforLocalStorageController
);

router.get("/get-allBooks/:id", verifyJwtToken, getAllBooksController);

export default router;
