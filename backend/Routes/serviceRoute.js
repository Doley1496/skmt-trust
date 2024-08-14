/* */

import express from "express";

const router = express.Router();

import { verifyJwtToken, isAdmin } from "../Middlewares/verifyUser.js";

import {
  CreateServiceController,
  GetAllServicesController,
  GetSingleServiceController,
  UpdateServiceController,
  DeleteServiceController,
} from "../Controllers/serviceController.js";

router.post(
  "/create-service",
  verifyJwtToken,
  isAdmin,
  CreateServiceController
);

router.get("/getAllServices", GetAllServicesController);

router.get("/getSingleService/:serviceId", GetSingleServiceController);

router.put(
  "/update-service/:serviceId",
  verifyJwtToken,
  isAdmin,
  UpdateServiceController
);

router.delete(
  "/delete-service/:serviceId",
  verifyJwtToken,
  isAdmin,
  DeleteServiceController
);

export default router;
