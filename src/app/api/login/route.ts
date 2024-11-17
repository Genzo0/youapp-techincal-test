import { NextResponse } from "next/server";

interface LoginRequestBody {
  email: string;
  username: string;
  password: string;
}

export async function POST(req: Request) {
  const body: LoginRequestBody = await req.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const { message, access_token } = await response.json();

  if (message !== "User has been logged in successfully") {
    return NextResponse.json({ message: message }, { status: 400 });
  }

  const res = NextResponse.json({ message: "Login successful" });
  res.cookies.set("authToken", access_token, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0.25 * 60 * 60,
  });

  return res;
}
