import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: [true, "Please provide user email id"],
    unique: true
  },

  phone: {
    type: String,
    required: [true, "Please provide user phone number"],
    unique: true
  },

  address: {
    type: String
  },
  password: {
    type: String,
    required: true
  }

}, { timestamps: true });

mongoose.models = {};
const User = mongoose.model("User", userSchema);
export default User;