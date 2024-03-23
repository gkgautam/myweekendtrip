import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("Please provide MongoDB URI");
    }
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error("Database Error: ", error);
  }
}

export default connectDB;