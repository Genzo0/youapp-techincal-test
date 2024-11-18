"use client";

import { PencilLine } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface InterestProps {
  userInfo: any;
}

export default function Interest({ userInfo }: InterestProps) {
  return (
    <div className="relative min-h-32 rounded-2xl bg-[#0E191F] px-7 py-4">
      <Link href="/add-interest">
        <PencilLine className="absolute right-4 top-3 size-5" />
      </Link>
      <div className="space-y-7">
        <p className="text-sm font-bold">Interest</p>
        {userInfo.interests.length > 0 ? (
          <div className="flex flex-wrap items-start justify-start gap-3">
            {userInfo.interests.map((interest: any, idx: any) => (
              <div
                key={idx}
                className="rounded-2xl bg-white/5 px-4 py-2 text-sm font-semibold"
              >
                {interest}
              </div>
            ))}
          </div>
        ) : (
          <p className="max-w-[275px] text-sm font-medium text-white/55">
            Add in your interest to find a better match
          </p>
        )}
      </div>
    </div>
  );
}
