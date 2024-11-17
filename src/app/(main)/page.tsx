import Back from "@/components/Back";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Ellipsis, PencilLine, Rss } from "lucide-react";
import Image from "next/image";
import About from "./About";
import Link from "next/link";
import Interest from "./Interest";

export default function Page() {
  const userInfo = {
    username: "johndoe",
    gender: "Male",
    zodiac: "Virgo",
    horoscope: "Pig",
    age: "28",
  };
  return (
    <MaxWidthWrapper className="space-y-6 py-16">
      <div className="flex items-center justify-between">
        <Back href="/" />
        <p className="text-center text-sm font-semibold">@johndoe</p>
        <Ellipsis className="size-6" />
      </div>

      {/* Image Photo */}
      <div className="aspect-[2.08:1] relative h-[190px] overflow-hidden rounded-2xl bg-[#162329]">
        <PencilLine className="absolute right-4 top-3 size-5" />
        {userInfo && !userInfo.gender && (
          <p className="absolute bottom-3 left-4 font-bold">@johndoe</p>
        )}
        {userInfo.gender && (
          <>
            <Image
              src="/dummy.jpg"
              alt=""
              width={1000}
              height={1000}
              className="aspect-[2.08:1] object-cover"
            />
            <div className="absolute bottom-3 left-4 flex flex-col space-y-3">
              <div>
                <p className="text-xs font-medium">{userInfo.gender}</p>
              </div>
              <div className="flex gap-x-4 text-white">
                <div className="flex gap-2 rounded-full bg-white/5 px-4 py-2.5 backdrop-blur-2xl">
                  <Rss className="size-5" />
                  <p className="text-sm font-semibold">{userInfo.zodiac}</p>
                </div>
                <div className="flex gap-2 rounded-full bg-white/5 px-4 py-2.5 backdrop-blur-2xl">
                  <Rss className="size-5" />
                  <p className="text-sm font-semibold">{userInfo.zodiac}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* About */}
      <About />

      {/* Interest */}
      <Interest />
    </MaxWidthWrapper>
  );
}
