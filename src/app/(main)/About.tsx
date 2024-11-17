"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Divide, PencilLine, Plus } from "lucide-react";
import { useState } from "react";

import { format } from "date-fns";

import { Calendar as CalendarIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export default function About() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState(1);

  return (
    <div className="relative min-h-32 rounded-2xl bg-[#0E191F] px-7 py-4">
      {isEditing ? (
        <p
          onClick={() => setIsEditing(false)}
          className="absolute right-4 z-50 bg-gradient-to-r from-[#94783E] via-[#D5BE88] via-30% to-[#94783E] bg-clip-text text-xs text-transparent"
        >
          Save & Update
        </p>
      ) : (
        <PencilLine
          onClick={() => setIsEditing(true)}
          className="absolute right-4 top-3 size-5"
        />
      )}
      <div className="space-y-7">
        <p className="text-sm font-bold">About</p>
        {isEditing ? (
          <>
            <div className="flex items-center gap-4">
              <input
                type="file"
                id="profile_image"
                className="hidden"
                name="profile_image"
              />

              <label
                htmlFor="profile_image"
                className="flex cursor-pointer items-center gap-4"
              >
                <div className="flex size-[57px] items-center justify-center rounded-2xl bg-white/5">
                  <Plus className="size-8 font-light" />
                </div>
                <p className="text-xs font-medium">Add Image</p>
              </label>
            </div>
            <InputForm />
          </>
        ) : userInfo ? (
          <div className="space-y-4 font-medium">
            <p className="text-xs">
              <span className="text-white/30">Birthday: </span>28 / 08 / 1995
              (Age 28)
            </p>
            <p className="text-xs">
              <span className="text-white/30">Horoscope: </span>Virgo
            </p>
            <p className="text-xs">
              <span className="text-white/30">Zodiac: </span>Pig
            </p>
            <p className="text-xs">
              <span className="text-white/30">Height: </span>175 cm
            </p>
            <p className="text-xs">
              <span className="text-white/30">Weight: </span>69 kg
            </p>
          </div>
        ) : (
          <p className="max-w-[275px] text-sm font-medium text-white/55">
            Add in your your to help others know you better
          </p>
        )}
      </div>
    </div>
  );
}

function InputForm() {
  const [date, setDate] = useState<Date>();

  return (
    <div className="w-full space-y-3">
      <div className="flex w-full items-center">
        <Label htmlFor="display_name" className="w-1/3 text-xs text-white/30">
          Display name:
        </Label>
        <Input
          type="text"
          id="display_name"
          name="display_name"
          placeholder="Enter name"
          className="h-9 w-2/3 border-white/20 bg-[#d9d9d9]/5 px-5 text-right text-xs focus-visible:ring-0"
        />
      </div>

      <div className="flex w-full items-center">
        <Label htmlFor="gender" className="w-1/3 text-xs text-white/30">
          Gender:
        </Label>
        <Select>
          <SelectTrigger className="h-9 w-2/3 border-white/20 bg-[#d9d9d9]/5 px-5 text-right text-xs focus-visible:ring-0">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex w-full items-center">
        <Label htmlFor="birthday" className="w-1/3 text-xs text-white/30">
          Birthday:
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className={cn(
                "h-9 w-2/3 justify-end border border-white/20 bg-[#d9d9d9]/5 px-5 text-right text-xs focus-visible:ring-0",
                !date && "text-muted-foreground",
              )}
            >
              {date ? format(date, "PPP") : <span>DD MM YYYY</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="border border-white/20 bg-[#0E191F] text-white"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex w-full items-center">
        <Label htmlFor="horoscope" className="w-1/3 text-xs text-white/30">
          Horoscope:
        </Label>
        <Input
          type="text"
          id="horoscope"
          name="horoscope"
          placeholder="--"
          className="h-9 w-2/3 border-white/20 bg-[#d9d9d9]/5 px-5 text-right text-xs focus-visible:ring-0"
        />
      </div>

      <div className="flex w-full items-center">
        <Label htmlFor="Zodiac" className="w-1/3 text-xs text-white/30">
          Zodiac:
        </Label>
        <Input
          type="text"
          id="Zodiac"
          name="Zodiac"
          placeholder="--"
          className="h-9 w-2/3 border-white/20 bg-[#d9d9d9]/5 px-5 text-right text-xs focus-visible:ring-0"
        />
      </div>

      <div className="flex w-full items-center">
        <Label htmlFor="height" className="w-1/3 text-xs text-white/30">
          Height:
        </Label>
        <Input
          type="text"
          id="height"
          name="height"
          placeholder="Add height"
          className="h-9 w-2/3 border-white/20 bg-[#d9d9d9]/5 px-5 text-right text-xs focus-visible:ring-0"
        />
      </div>

      <div className="flex w-full items-center">
        <Label htmlFor="weight" className="w-1/3 text-xs text-white/30">
          Weight:
        </Label>
        <Input
          type="text"
          id="weight"
          name="weight"
          placeholder="Add weight"
          className="h-9 w-2/3 border-white/20 bg-[#d9d9d9]/5 px-5 text-right text-xs focus-visible:ring-0"
        />
      </div>
    </div>
  );
}
