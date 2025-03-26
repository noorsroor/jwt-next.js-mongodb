import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    await connectToDatabase();


    const user = await User.findOne({ email });
    if (!user) {
      return Response.json({ message: "Invalid email or password" }, { status: 400 });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.json({ message: "Invalid email or password" }, { status: 400 });
    }


    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });


    cookies().set("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60, // 1 day
      path: "/",
    });

    return Response.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
