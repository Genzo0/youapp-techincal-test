import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import InterestTagInput from "./InterestTagInput";
import Back from "@/components/Back";
import { Ellipsis, PencilLine } from "lucide-react";
import BackgroundGradient from "@/components/BackgroundGradient";
import GradientWrapper from "@/components/GradientWrapper";

export default function Page() {
  return (
    <GradientWrapper className="py-16">
      <BackgroundGradient />
      <div className="space-y-[73px]">
        <div className="flex items-center justify-between">
          <Back href="/" />
          <p className="absolute right-4 z-50 bg-gradient-to-r from-[#ABFFFD] via-[#4599DB] via-80% to-[#ABFFFD] bg-clip-text text-sm text-transparent">
            Save
          </p>
        </div>
        <div className="w-full space-y-8">
          <div className="space-y-3 px-2.5">
            <p className="bg-gradient-to-r from-[#94783E] via-[#D5BE88] via-10% to-[#94783E] to-100% bg-clip-text text-sm font-bold text-transparent">
              Tell everyone about yourself
            </p>
            <p className="text-xl font-bold">What interest you?</p>
          </div>
          <InterestTagInput />
        </div>
      </div>
    </GradientWrapper>
  );
}
