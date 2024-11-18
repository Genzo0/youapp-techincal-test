import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import InterestTagInput from "./InterestTagInput";
import Back from "@/components/Back";
import { Ellipsis, PencilLine } from "lucide-react";
import BackgroundGradient from "@/components/BackgroundGradient";
import GradientWrapper from "@/components/GradientWrapper";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getProfile() {
  const cookieStore = cookies();
  const authToken = cookieStore.get("authToken")?.value;

  if (!authToken) {
    redirect("/login");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}getProfile`,
    {
      method: "GET",
      headers: {
        "x-access-token": authToken,
      },
    },
  );

  const { data } = await response.json();

  return data;
}

export default async function Page() {
  const userInfo = await getProfile();

  return (
    <GradientWrapper className="py-16">
      <BackgroundGradient />
      <div className="space-y-[73px]">
        <InterestTagInput userInfo={userInfo} />
      </div>
    </GradientWrapper>
  );
}
