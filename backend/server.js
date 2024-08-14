/* */

/* server.js is a nodeJs file therefore instead of import we will use require method */

import express from "express";

import cors from "cors";

import morgan from "morgan";

import cookieParser from "cookie-parser";

/* Importing the mongoDB database url and calling it. */
import connectionUrl from "./Config/db.js";
connectionUrl();

/* Importing and configuring the dotenv. */
import dotenv from "dotenv";
dotenv.config();

/* Getting the routes from the Routes folder. */

import authRoute from "./Routes/authRoute.js";
import userRoute from "./Routes/userRoute.js";
import ticketRoute from "./Routes/ticketRoute.js";
import bookRoute from "./Routes/bookRoute.js";
import serviceRoute from "./Routes/serviceRoute.js";
import paymentRoute from "./Routes/paymentRoute.js";
import addressRoute from "./Routes/addressRoute.js";
import verificationRoute from "./Routes/verificationRoute.js";

/* app configuration */
const app = express();

/* Middlewares */

/* Using express() to initialize the cors() function to send request from frontend to backend and we are
   1. passing a origin.
      ie. We will allow the user only from this origin to send request to the server(backend) from the frontend.
          and to allow from all origin instead of an url we can use * .  ie. origin : "*"
   2. passing credentials as true because we need to set the Access-Control-Allow-Credentials in the Response 
      Headers as true to pass(allow) the cookies to the browser.
*/

const corsOptions = {
  // origin: "http://localhost:5173",

  origin: (origin, callback) => {
    // check if the origin is allowed

    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:4173",
      "https://skmt-trust.org",
      "https://www.skmt-trust.org",
      "http://skmt-trust.org",
      "http://www.skmt-trust.org",
    ];

    const isAllowed = allowedOrigins.includes(origin);
    callback(null, isAllowed ? origin : false);
  },

  method: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// );

app.use(cors(corsOptions));

/* Using express() to initialize the cookieParser() function in-order to get any data from the cookie. */
app.use(cookieParser());

/* Using express() to initialize the json() function in-order to convert codes to json format. */
app.use(express.json());

app.use(morgan("dev"));

/* Creating different Semi-Routes(API endpoints)  */

/* Using express() to initialize the custom routes:

   After "/api/v1" route the routes created in authRoutes will be added to the
   following route. Similarly for other routes as well.
*/

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/ticket", ticketRoute);
app.use("/api/book", bookRoute);
app.use("/api/service", serviceRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/address", addressRoute);
app.use("/api/verification", verificationRoute);

/* Sending a response message to the home route */
app.get("/", (req, res) => {
  res.send({
    message: "Welcome to SKMT App",
  });
});

/**************************************************************************/
/**************************************************************************/

/* Connnecting port dynamically at 8080. */
const PORT = process.env.PORT || 9000;

app.listen(PORT, function () {
  console.log(`Server is running in ${process.env.PRO_MODE} at port ${PORT}`);
});

/* Handling the error. */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error.";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
