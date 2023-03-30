const { model, Schema } = require("mongoose");

const registerSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // save the time register
);

module.exports = model("user", registerSchema);
