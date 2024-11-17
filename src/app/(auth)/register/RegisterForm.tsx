"use client";

import LoadingButton from "@/components/LoadingButton";
import { PasswordInput } from "@/components/PasswordInput";
import { Input } from "@/components/ui/input";

export default function RegisterForm() {
  return (
    <div className="space-y-6">
      <h1 className="px-5 text-2xl font-bold">Register</h1>
      <div className="space-y-4">
        <Input
          className="h-12 w-full rounded-lg border-none bg-white/5 text-sm focus-visible:ring-0"
          placeholder="Enter Email"
        />
        <Input
          className="h-12 w-full rounded-lg border-none bg-white/5 text-sm focus-visible:ring-0"
          placeholder="Create username"
        />
        <PasswordInput
          className="h-12 w-full rounded-lg border-none bg-white/5 text-sm focus-visible:ring-0"
          placeholder="Create Password"
        />
        <PasswordInput
          className="h-12 w-full rounded-lg border-none bg-white/5 text-sm focus-visible:ring-0"
          placeholder="Confirm Password"
        />
      </div>
      <div className="relative">
        <div className="-z[1] absolute -inset-1 top-2 rounded-lg bg-gradient-to-r from-[#62CDCB] to-[#4599DB] opacity-75 blur"></div>
        <LoadingButton
          loading={false}
          className="relative h-12 w-full rounded-lg bg-gradient-to-r from-[#62CDCB] to-[#4599DB] font-semibold text-white"
        >
          Register
        </LoadingButton>
      </div>
    </div>
  );
}
