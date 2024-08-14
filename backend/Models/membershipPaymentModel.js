/* */

import mongoose from "mongoose";

/* Creating mongoose schema. */
const membershipPaymentSchema = new mongoose.Schema(
  {
    /* */

    numberOfPayments: {
      type: Number,
    },

    userId: {
      type: String,
      required: true,
    },

    amount: [Number],

    isPaid: [Boolean],

    razorpay_order_id: [String],

    razorpay_payment_id: [String],

    razorpay_signature: [String],

    /* */
  },

  { timestamps: true } /* It will give us the created time of the new user. */
);

/* Creating mongoose model and exporting it. */
const MembershipPayments = mongoose.model(
  "MembershipPayments",
  membershipPaymentSchema
);

export default MembershipPayments;
