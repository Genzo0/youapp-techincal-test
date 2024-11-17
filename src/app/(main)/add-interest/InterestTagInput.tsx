"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tag, TagInput } from "emblor";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  topics: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    }),
  ),
});

export default function Hero() {
  const tags = [
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
  ];
  const [exampleTags, setExampleTags] = useState<Tag[]>(tags);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  return (
    <TagInput
      tags={exampleTags}
      setTags={(newTags) => {
        setExampleTags(newTags);
      }}
      placeholder="Add a Tags"
      styleClasses={{
        inlineTagsContainer: "bg-[#D9D9D90F] border-none gap-1 py-2 px-4",
        tag: {
          body: "bg-[#FFFFFF1A] border-none text-white text-xs font-semibold rounded-lg",
        },
        input: "border border-none w-1/2 ",
      }}
      activeTagIndex={activeTagIndex}
      setActiveTagIndex={setActiveTagIndex}
    />
  );
}
