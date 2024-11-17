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
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Back from "@/components/Back";

const FormSchema = z.object({
  topics: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    }),
  ),
});

interface InterestTagInputProps {
  userInfo: any;
}

export default function InterestTagInput({ userInfo }: InterestTagInputProps) {
  const tempInterest = userInfo?.interests.map((interest: any, _: any) => ({
    id: _,
    text: interest,
  }));

  const router = useRouter();

  const [tags, setTags] = React.useState<Tag[]>(tempInterest || []);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const authToken = Cookies.get("authToken");

  const { toast } = useToast();

  if (!authToken) {
    router.push("/login");
    return;
  }

  const handleClick = async () => {
    const interests = tags.map((tag) => tag.text);
    const name = userInfo.name;
    const birthday = userInfo.birthday;
    const height = userInfo.height;
    const weight = userInfo.weight;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}updateProfile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": authToken,
        },
        body: JSON.stringify({ interests, name, birthday, height, weight }),
      },
    );

    if (response.ok) {
      const result = await response.json();
      toast({
        title: "Interest added",
        description: "Your interest has been added successfully",
      });
      window.location.reload();
    } else {
      toast({
        title: "Error",
        description: "An error occurred. Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Back href="/" />
        <p
          onClick={handleClick}
          className="absolute right-4 z-50 bg-gradient-to-r from-[#ABFFFD] via-[#4599DB] via-80% to-[#ABFFFD] bg-clip-text text-sm text-transparent"
        >
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
        <TagInput
          tags={tags}
          setTags={(newTags) => {
            setTags(newTags);
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
      </div>
    </>
  );
}
