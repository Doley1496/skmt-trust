/* */

import express from "express";

const router = express.Router();

import {
  SendVerificationEmailController,
  VerifyEmailController,
  SendOTPForLoginController,
  VerifyOTPForLoginController,
  SendOTPInVerificationPageController,
  VerifyOTPInVerificationPageController,
  SendOTPInProfileController,
  VerifyOTPInProfileController,
} from "../Controllers/verificationController.js";

/**************************************************8 */

router.post("/send-email", SendVerificationEmailController);

router.get("/verify-email/:userId/:token/:email", VerifyEmailController);

router.post(
  "/send-otp-in-verification-page",
  SendOTPInVerificationPageController
);

router.post(
  "/verify-otp-in-verification-page",
  VerifyOTPInVerificationPageController
);

router.post("/send-otp-in-profile-page", SendOTPInProfileController);

router.post("/verify-otp-in-profile-page", VerifyOTPInProfileController);

router.post("/send-otp-for-login", SendOTPForLoginController);

router.post("/verify-otp-for-login", VerifyOTPForLoginController);

export default router;
