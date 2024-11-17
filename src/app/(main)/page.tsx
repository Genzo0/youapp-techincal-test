import Back from "@/components/Back";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Ellipsis, PencilLine, Rss } from "lucide-react";
import Image from "next/image";
import About from "./About";
import Link from "next/link";
import Interest from "./Interest";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getZodiac } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getProfile();

  return {
    title: data.username,
  };
}

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
    <MaxWidthWrapper className="space-y-6 py-16">
      <div className="flex items-center justify-between">
        <Back href="/" />
        <p className="text-center text-sm font-semibold">
          @{userInfo.username}
        </p>
        <Ellipsis className="size-6" />
      </div>

      {/* Image Photo */}
      <div className="aspect-[2.08:1] relative h-[190px] overflow-hidden rounded-2xl bg-[#162329]">
        {userInfo && !userInfo.name && (
          <p className="absolute bottom-3 left-4 font-bold">
            @{userInfo.username}
          </p>
        )}
        {userInfo.name && (
          <>
            <div className="absolute bottom-3 left-4 flex flex-col space-y-3">
              <div className="space-y-0.5">
                <p className="font-bold">@{userInfo.username}</p>
              </div>
              <div className="flex gap-x-4 text-white">
                <div className="flex gap-2 rounded-full bg-white/5 px-4 py-2.5 backdrop-blur-2xl">
                  <p className="text-sm font-semibold">{userInfo.horoscope}</p>
                </div>
                <div className="flex gap-2 rounded-full bg-white/5 px-4 py-2.5 backdrop-blur-2xl">
                  <p className="text-sm font-semibold">
                    {getZodiac(new Date(userInfo.birthday))}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* About */}
      <About userInfo={userInfo} />

      {/* Interest */}
      <Interest userInfo={userInfo} />
    </MaxWidthWrapper>
  );
}
