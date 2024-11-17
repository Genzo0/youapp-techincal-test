"use client";

import LoadingButton from "@/components/LoadingButton";
import { PasswordInput } from "@/components/PasswordInput";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  return (
    <div className="space-y-6">
      <h1 className="px-5 text-2xl font-bold">Login</h1>
      <div className="space-y-4">
        <Input
          className="h-12 w-full rounded-lg border-none bg-white/5 text-sm focus-visible:ring-0"
          placeholder="Enter Email"
        />
        <PasswordInput
          className="h-12 w-full rounded-lg border-none bg-white/5 text-sm focus-visible:ring-0"
          placeholder="Enter Password"
        />
      </div>
      <div className="relative">
        <div className="-z[1] absolute -inset-1 top-2 rounded-lg bg-gradient-to-r from-[#62CDCB] to-[#4599DB] opacity-75 blur"></div>
        <LoadingButton
          loading={false}
          className="relative h-12 w-full rounded-lg bg-gradient-to-r from-[#62CDCB] to-[#4599DB] font-semibold text-white"
        >
          Login
        </LoadingButton>
      </div>
    </div>
  );
}
