import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "operator" },
    gender: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", userSchema);

export default User;
