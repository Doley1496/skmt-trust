/* */

import userModel from "../Models/userModel.js";

import { errorHandler } from "./errorHandler.js";

import JWT from "jsonwebtoken";

/* *************************** */
/*  1: Creating verifyToken.   */
/* *************************** */

export const verifyJwtToken = (req, res, next) => {
  /* */

  // const authHeader = req.headers.authorization || req.headers.Authorization;

  // if (!authHeader?.startsWith("Bearer ")) {
  //   return next(errorHandler(401, "Unauthorised User"));
  // }

  const cookies = req.headers.cookie;

  if (!cookies) {
    return next(
      errorHandler(
        401,
        "You have deleted your cookie. Please logout and login again"
      )
    );
  }

  const token = cookies.split("=")[1];

  JWT.verify(
    token, // String(token)
    process.env.ACCESS_TOKEN_JWT_SECRET,
    async (error, decodedData) => {
      /* */

      if (error) {
        res.clearCookie("accessToken", {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
        });

        return next(errorHandler(403, "Forbidden : Cookie Mis-Matched"));
      }

      req.user = decodedData;

      next();

      /* */
    }
  );

  /* */
};

/* *************************** */
/*  2: Creating isAdmin   */
/* *************************** */

export const isAdmin = async (req, res, next) => {
  /* */

  try {
    /* */

    const user = await userModel.findById(req.user.id);

    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized User",
      });

      /* */
    } else {
      /* */

      /* When the user is admin we will call next() function so that further execution continues. */
      next();

      /* */
    }

    /* Catching the error and displaying it. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};
