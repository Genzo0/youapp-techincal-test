"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Divide, PencilLine, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import Cookies from "js-cookie";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, getZodiac } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  height: z.coerce.number().min(0, "Height must be positive"),
  weight: z.coerce.number().min(0, "Weight must be positive"),
  birthday: z.string().nonempty("Birthday is required"),
  interests: z.array(z.string()),
});

type FormData = z.infer<typeof schema>;

interface AboutProps {
  userInfo?: {
    name: string;
    birthday: string;
    height: number;
    weight: number;
    horoscope: string;
    interests: string[];
  };
}

export default function About({ userInfo }: AboutProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [date, setDate] = useState<Date | null>();
  const [formattedDate, setFormattedDate] = useState<string>();

  useEffect(() => {
    if (date) {
      setFormattedDate(format(date, "PPP"));
    }
  }, [date]);

  const router = useRouter();

  const { toast } = useToast();

  const authToken = Cookies.get("authToken");

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: userInfo || {
      name: "",
      birthday: "",
      height: 0,
      weight: 0,
      interests: [],
    },
  });

  if (!authToken) {
    router.push("/login");
    return;
  }

  const submitHandler = async (data: FormData) => {
    // Determine the API URL based on userInfo.name
    const apiUrl = userInfo?.name
      ? `${process.env.NEXT_PUBLIC_BASE_URL}updateProfile`
      : `${process.env.NEXT_PUBLIC_BASE_URL}createProfile`;

    try {
      const response = await fetch(apiUrl, {
        method: userInfo?.name ? "PUT" : "POST", // PUT for updating, POST for creating
        headers: {
          "Content-Type": "application/json",
          "x-access-token": authToken,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const result = await response.json();
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });

      window.location.reload();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="relative min-h-32 rounded-2xl bg-[#0E191F] px-7 py-4">
        {isEditing ? (
          <button
            type="submit"
            className="absolute right-4 z-50 bg-gradient-to-r from-[#94783E] via-[#D5BE88] via-30% to-[#94783E] bg-clip-text text-xs text-transparent"
          >
            Save & Update
          </button>
        ) : (
          <PencilLine
            onClick={() => setIsEditing(true)}
            className="absolute right-4 top-3 size-5"
          />
        )}
        <div className="space-y-7">
          <p className="text-sm font-bold">About</p>
          {isEditing ? (
            <div className="w-full space-y-3">
              {/* Name Input */}
              <div className="flex w-full items-center">
                <Label htmlFor="name" className="w-1/3 text-xs text-white/30">
                  Display name:
                </Label>
                <Input
                  {...register("name")}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter name"
                  className="h-9 w-2/3 border-white/20 bg-[#d9d9d9]/5 px-5 text-right text-xs focus-visible:ring-0"
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Birthday Input */}
              <div className="flex w-full items-center">
                <Label
                  htmlFor="birthday"
                  className="w-1/3 text-xs text-white/30"
                >
                  Birthday:
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className={`h-9 w-2/3 justify-end border border-white/20 bg-[#d9d9d9]/5 px-5 text-right text-xs focus-visible:ring-0 ${
                        !date ? "text-muted-foreground" : ""
                      }`}
                    >
                      {date ? format(date, "PPP") : <span>DD MM YYYY</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date || undefined}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        if (selectedDate) {
                          setValue(
                            "birthday",
                            format(selectedDate, "yyyy-MM-dd"),
                          );
                        } else {
                          setValue("birthday", "");
                        }
                      }}
                      initialFocus
                      className="border border-white/20 bg-[#0E191F] text-white"
                    />
                  </PopoverContent>
                </Popover>
                {errors.birthday && (
                  <p className="text-xs text-red-500">
                    {errors.birthday.message}
                  </p>
                )}
              </div>

              {/* Horoscope */}
              <div className="flex w-full items-center">
                <Label
                  htmlFor="horoscope"
                  className="w-1/3 text-xs text-white/30"
                >
                  Horoscope:
                </Label>
                <Input
                  type="text"
                  id="horoscope"
                  name="horoscope"
                  value={userInfo?.horoscope || "--"} // Display horoscope value or placeholder
                  placeholder="--"
                  className="h-9 w-2/3 border-white/20 bg-[#d9d9d9]/5 px-5 text-right text-xs focus-visible:ring-0"
                  readOnly
                />
              </div>

              {/* Zodiac */}
              <div className="flex w-full items-center">
                <Label htmlFor="Zodiac" className="w-1/3 text-xs text-white/30">
                  Zodiac:
                </Label>
                <Input
                  type="text"
                  id="Zodiac"
                  name="Zodiac"
                  value={
                    userInfo?.birthday
                      ? getZodiac(new Date(userInfo.birthday))
                      : "--"
                  } // Display zodiac value or placeholder
                  placeholder="--"
                  className="h-9 w-2/3 border-white/20 bg-[#d9d9d9]/5 px-5 text-right text-xs focus-visible:ring-0"
                  readOnly
                />
              </div>

              {/* Height Input */}
              <div className="flex w-full items-center">
                <Label htmlFor="height" className="w-1/3 text-xs text-white/30">
                  Height:
                </Label>
                <Input
                  {...register("height")}
                  type="number"
                  id="height"
                  name="height"
                  placeholder="Add height"
                  className="h-9 w-2/3 border-white/20 bg-[#d9d9d9]/5 px-5 text-right text-xs focus-visible:ring-0"
                />
                {errors.height && (
                  <p className="text-xs text-red-500">
                    {errors.height.message}
                  </p>
                )}
              </div>

              {/* Weight Input */}
              <div className="flex w-full items-center">
                <Label htmlFor="weight" className="w-1/3 text-xs text-white/30">
                  Weight:
                </Label>
                <Input
                  {...register("weight")}
                  type="number"
                  id="weight"
                  name="weight"
                  placeholder="Add weight"
                  className="h-9 w-2/3 border-white/20 bg-[#d9d9d9]/5 px-5 text-right text-xs focus-visible:ring-0"
                />
                {errors.weight && (
                  <p className="text-xs text-red-500">
                    {errors.weight.message}
                  </p>
                )}
              </div>
            </div>
          ) : userInfo ? (
            <div className="space-y-4 font-medium">
              <p className="text-xs">
                <span className="text-white/30">Birthday: </span>
                {userInfo.birthday}
              </p>
              <p className="text-xs">
                <span className="text-white/30">Horoscope: </span>
                {userInfo.horoscope}
              </p>
              <p className="text-xs">
                <span className="text-white/30">Horoscope: </span>
                {userInfo.birthday
                  ? getZodiac(new Date(userInfo.birthday))
                  : "--"}
              </p>
              <p className="text-xs">
                <span className="text-white/30">Height: </span>
                {userInfo.height} cm
              </p>
              <p className="text-xs">
                <span className="text-white/30">Weight: </span>
                {userInfo.weight} kg
              </p>
            </div>
          ) : (
            <p className="max-w-[275px] text-sm font-medium text-white/55">
              Add info to help others know you better
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
