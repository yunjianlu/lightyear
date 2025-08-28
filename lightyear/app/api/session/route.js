// app/api/session/route.js

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  if (!token) {
    return Response.json({ name: "", email: "" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return Response.json({
      name: decoded.firstName || "",
      email: decoded.email || "",
    });
  } catch (error) {
    return Response.json({ name: "", email: "" });
  }
}

export async function POST(req) {
  const data = await req.json();
  const cookieStore = await cookies();

  cookieStore.set(
    "purchasedProducts",
    encodeURIComponent(JSON.stringify(data.purchasedProducts || [])),
    { path: "/", httpOnly: true }
  );
  cookieStore.set("name", data.name || "", { path: "/", httpOnly: true });
  cookieStore.set("email", data.email || "", { path: "/", httpOnly: true });
  cookieStore.set("address1", data.address1 || "", {
    path: "/",
    httpOnly: true,
  });
  cookieStore.set("address2", data.address2 || "", {
    path: "/",
    httpOnly: true,
  });
  cookieStore.set("city", data.city || "", { path: "/", httpOnly: true });
  cookieStore.set("state", data.state || "", { path: "/", httpOnly: true });
  cookieStore.set("zipCode", data.zipCode || "", { path: "/", httpOnly: true });

  return Response.json({ success: true });
}
