import Back from "@/components/Back";
import BackgroundGradient from "@/components/BackgroundGradient";
import GradientWrapper from "@/components/GradientWrapper";
import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default function Page() {
  return (
    <GradientWrapper className="w-full py-16">
      <BackgroundGradient />
      <div className="space-y-14">
        <Back href="/" />
        <RegisterForm />
        <p className="text-center text-sm">
          Have an account?{" "}
          <Link href={"/login"} className="underline">
            Login here
          </Link>
        </p>
      </div>
    </GradientWrapper>
  );
}
