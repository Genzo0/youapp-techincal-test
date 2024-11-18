"use client";

import LoadingButton from "@/components/LoadingButton";
import { PasswordInput } from "@/components/PasswordInput";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  username: z.string(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      if (!response.ok) {
        toast({
          title: "Login failed",
          description: res.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Login successful",
        description: "You have been logged in",
      });

      router.push("/");
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h1 className="px-5 text-2xl font-bold">Login</h1>

        <div className="space-y-4">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="h-12 w-full rounded-lg border-none bg-white/5 text-sm focus-visible:ring-0"
                    placeholder="Enter Email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                    className="h-12 w-full rounded-lg border-none bg-white/5 text-sm focus-visible:ring-0"
                    placeholder="Enter Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="relative">
          <div className="absolute -inset-1 top-2 -z-[1] rounded-lg bg-gradient-to-r from-[#62CDCB] to-[#4599DB] opacity-75 blur"></div>
          <LoadingButton
            type="submit"
            loading={form.formState.isSubmitting}
            className="relative h-12 w-full rounded-lg bg-gradient-to-r from-[#62CDCB] to-[#4599DB] font-semibold text-white"
          >
            Login
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
