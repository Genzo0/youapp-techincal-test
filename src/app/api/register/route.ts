import { NextResponse } from "next/server";

interface LoginRequestBody {
  email: string;
  username: string;
  password: string;
}

export async function POST(req: Request) {
  const body: LoginRequestBody = await req.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const { message } = await response.json();

  if (message !== "User has been created successfully") {
    return NextResponse.json({ message: message }, { status: 400 });
  }

  const res = NextResponse.json({ message: "User created!" });

  return res;
}
