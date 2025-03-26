import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET;

export function verifyToken() {
  try {
    const token = cookies().get("token")?.value;
    if (!token) return null;

    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
