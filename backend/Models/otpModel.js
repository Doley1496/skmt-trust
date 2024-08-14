/* */

import mongoose from "mongoose";

/* Creating mongoose schema. */
const otpSchema = new mongoose.Schema(
  {
    /* */

    phoneNumber: {
      type: String,
      required: true,
    },

    otp: {
      type: String,
      required: true,
    },

    otpExpiration: {
      /* */

      type: Date, // 2024-05-30 and current time

      // current date and time will be stored in default when otp will be set in the database
      default: Date.now,

      // We will get the time in miliseconds
      get: (otpExpiration) => otpExpiration.getTime(),

      // We will set(store) in date format in miliseconds
      set: (otpExpiration) => new Date(otpExpiration),

      /* */
    },

    /* */
  },

  { timestamps: true } /* It will give us the created time of the new user. */
);

/* Creating mongoose model and exporting it. */
const OTP = mongoose.model("OTP", otpSchema);

export default OTP;
