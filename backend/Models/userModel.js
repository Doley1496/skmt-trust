/* */

import mongoose from "mongoose";

/* Creating mongoose schema. */
const userSchema = new mongoose.Schema(
  {
    /* */

    firstName: {
      type: String,
      default: "",
    },

    lastName: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      unique: true,
      default: "",
    },

    password: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    phoneNumber: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
    },

    role: {
      type: Number,
      default: 0,
    },

    phoneVerified: {
      type: Boolean,
      default: false,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    /* Creating relationship between two models ie. ticketPaymentModel and userModel with the help
       of the mongoose model name.
    */
    tickets: [
      {
        type: mongoose.Types.ObjectId,
        ref: "TicketPayments",
      },
    ],

    /* Creating relationship between two models ie. booksModels and userModels with the help
       of the mongoose model name.
    */
    books: [
      {
        type: mongoose.Types.ObjectId,
        ref: "BookPayments",
      },
    ],

    terms: {
      type: Boolean,
      default: false,
    },

    /* */
  },

  { timestamps: true } /* It will give us the created time of the new user. */
);

/* Creating mongoose model and exporting it. */
const User = mongoose.model("User", userSchema);

export default User;
