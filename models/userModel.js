const mongoose = require("mongoose");
const Result = require("./resultModel");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.post("remove", async function (res, next) {
  await Result.deleteMany({ user: this._id });
  next();
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
