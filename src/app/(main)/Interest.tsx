"use client";

import { PencilLine } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Interest() {
  const [interests, setInterests] = useState([
    {
      id: "1038286576",
      text: "Music",
    },
    {
      id: "2145338036",
      text: "Basketball",
    },
    {
      id: "2903212970",
      text: "Fitness",
    },
    {
      id: "2903212972",
      text: "Gymming",
    },
    {
      id: "290321220",
      text: "Fitness",
    },
    {
      id: "103821286576",
      text: "Music",
    },
    {
      id: "103828612576",
      text: "Music",
    },
  ]);
  return (
    <div className="relative min-h-32 rounded-2xl bg-[#0E191F] px-7 py-4">
      <Link href="/add-interest">
        <PencilLine className="absolute right-4 top-3 size-5" />
      </Link>
      <div className="space-y-7">
        <p className="text-sm font-bold">Interest</p>
        {interests.length > 0 ? (
          <div className="flex flex-wrap items-start justify-start gap-3">
            {interests.map((interest) => (
              <div
                key={interest.id}
                className="rounded-2xl bg-white/5 px-4 py-2 text-sm font-semibold"
              >
                {interest.text}
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
