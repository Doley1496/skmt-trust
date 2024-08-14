/* */

import express from "express";

const router = express.Router();

import {
  testController,
  RegisterController,
  LoginController,
  GoogleOauthController,
  LogOutController,
  SendLinkController,
  ResetPasswordController,
} from "../Controllers/authController.js";

router.get("/test", testController);

router.post("/register", RegisterController);

router.post("/login", LoginController);

router.post("/google", GoogleOauthController);

router.get("/logOut", LogOutController);

router.post("/send-link", SendLinkController);

router.post("/reset-password/:id/:token", ResetPasswordController);

export default router;
