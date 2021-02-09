import mongoose from "mongoose";

import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
      required: [true, "Please add user name"],
    },
    email: {
      type: "String",
      required: [true, "Please add user email"],
      unique: true,
    },
    password: {
      type: "String",
      required: [true, "Please add user password"],
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

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("user", userSchema);

export default User;
