
export async function POST() {
  // Clear cookie
  cookies().set("token", "", { maxAge: 0 });

  return Response.json({ message: "Logout successful" }, { status: 200 });
}
