"use server";

import connectDB from "@/db/dbconnection";
import User from "@/models/user.model";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";

export async function addUser(values) {
  try {
    connectDB();
    const { name, email, phone, address, password } = values;

    if (!name || !email || !phone) {
      return {
        success: false,
        statusCode: 404, // not found
        message: "Please provide all details"
      }
    }

    const checkUserExist = await User.findOne({ email });

    if (checkUserExist) {
      return {
        success: false,
        statusCode: 400, // bad request
        message: "user already exist"
      }
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = await User({ name, email, phone, address, password: hashPassword });
    const result = await newUser.save();

    if (result) {
      return {
        success: true,
        statusCode: 201, // bad request
        message: "Successully registered"
      }
    }
    else {
      return {
        success: false,
        statusCode: 500, // internal server error
        message: "Internal server error",
      }
    }


  } catch (error) {
    return {
      success: false,
      statusCode: 500, // internal server error
      message: "Internal server error",
      error: error.message
    }
  }
  finally {
    revalidatePath("/signup")
  }
}