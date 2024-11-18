import { cookies } from "next/headers";

export async function checkAuth() {
  const cookieStore = cookies();
  const authToken = cookieStore.get("authToken")?.value;

  if (!authToken) {
    return false;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}getProfile`,
      {
        method: "GET",
        headers: {
          "x-access-token": authToken,
        },
      },
    );

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error checking auth:", error);
    return false;
  }
}
