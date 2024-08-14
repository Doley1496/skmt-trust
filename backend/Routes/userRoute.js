/* */

import express from "express";

const router = express.Router();

import { verifyJwtToken, isAdmin } from "../Middlewares/verifyUser.js";

import {
  updateUserProfileController,
  deleteUserProfileController,
  getAllUsersDetailsController,
  GetSingleUserDetailsController,
  GetAllFilteredUsersController,
  adminAuthenticationController,
  createEmailSubscriptionController,
  ComplainMessageController,
  getMembershipUserController,
  GetSingleUserDetailsUsingIDController,
} from "../Controllers/userController.js";

router.get(
  "/admin-auth",
  verifyJwtToken,
  isAdmin,
  adminAuthenticationController
);

router.post("/update-profile/:id", verifyJwtToken, updateUserProfileController);

router.delete(
  "/delete-profile/:id",
  verifyJwtToken,
  deleteUserProfileController
);

router.get("/getAllUsers", verifyJwtToken, getAllUsersDetailsController);

router.get("/getSingleUser/:email", GetSingleUserDetailsController);

router.get(
  "/getSingleUserUsingId/:userId",
  GetSingleUserDetailsUsingIDController
);

router.get("/getAllFilteredUsers", GetAllFilteredUsersController);

router.post("/emailSubscription", createEmailSubscriptionController);

router.post("/contact", ComplainMessageController);

router.get(
  "/get-membershipUser/:id",
  verifyJwtToken,
  getMembershipUserController
);

export default router;
