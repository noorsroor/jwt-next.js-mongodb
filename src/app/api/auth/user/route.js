import { verifyToken } from "../../../../../middleware";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  const decoded = verifyToken();
  if (!decoded) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const user = await User.findById(decoded.id).select("-password");

  return Response.json(user, { status: 200 });
}
