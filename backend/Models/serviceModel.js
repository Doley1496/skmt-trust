/* */

import mongoose from "mongoose";

/* Creating mongoose schema. */
const serviceSchema = new mongoose.Schema(
  {
    /* */

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    photo: {
      type: Array,
      required: true,
    },

    /* */
  },

  { timestamps: true } /* It will give us the created time of the new user. */
);

/* Creating mongoose model and exporting it. */
const Service = mongoose.model("Service", serviceSchema);

export default Service;
