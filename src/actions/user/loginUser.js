"use server";

import connectDB from "@/db/dbconnection";
import User from "@/models/user.model";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { Turret_Road } from "next/font/google";

export async function loginUser(values) {
  try {
    connectDB();

    const cookie = cookies();

    const { email, password } = values;

    if (!email || !password) {
      return {
        success: false,
        statusCode: 404, // not found
        message: "Please provide all details"
      }
    }

    const checkUserExist = await User.findOne({ email });

    if (!checkUserExist) {
      return {
        success: false,
        statusCode: 400, // bad request
        message: "user does not exist"
      }
    }

    const hashPassword = await bcrypt.compare(password, checkUserExist.password);

    if (!hashPassword) {
      return {
        success: false,
        statusCode: 400, // bad request
        message: "Invalid Credentials"
      }
    }

    const payLoadData = {
      name: checkUserExist.name,
      email: checkUserExist.email
    }

    const session_token = jwt.sign(payLoadData, process.env.JWT_SECRET_KEY, { expiresIn: "2h" });

    if (session_token) {

      // cookie.set("session", session_token, { expires: 120000, httpOnly: true, secure: true }); (https) // for production
      cookie.set("session", session_token, { expires: new Date(Date.now() + 2.592e+9), httpOnly: false, secure: true, sameSite: "none" }); // for local ( 2 hours )

      return {
        success: true,
        statusCode: 200, // bad request
        message: "Login Success",
        token: session_token
      }
    }

    else {
      return {
        success: false,
        statusCode: 500, // internal server error
        message: "Internal server error"
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
    revalidatePath("/login");
  }
}