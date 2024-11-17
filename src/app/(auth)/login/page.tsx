import Back from "@/components/Back";
import BackgroundGradient from "@/components/BackgroundGradient";
import GradientWrapper from "@/components/GradientWrapper";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import LoginForm from "./LoginForm";

export default function Page() {
  return (
    <GradientWrapper className="w-full py-16">
      <BackgroundGradient />
      <div className="space-y-14">
        <Back href="/" />
        <LoginForm />
        <p className="text-center text-sm">
          No account?{" "}
          <Link href={"/register"} className="underline">
            Register here
          </Link>
        </p>
      </div>
    </GradientWrapper>
  );
}
