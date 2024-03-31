import connectDB from "@/db/dbconnection";
import User from "@/models/user.model";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        await connectDB();

        const { email, password } = credentials;

        const userExist = await User.findOne({ email });

        if (!userExist) {
          throw new Error("User does not exist");
        }

        const matchPassword = await bcrypt.compare(password, userExist.password);

        if (!matchPassword || userExist.email !== email) {
          throw new Error("Invalid Credentials");
        }
        return userExist;
      }
    })
  ],
  session: {
    strategy: "jwt",
    expires: 7200000
  },
  theme: {
    colorScheme: "light",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }