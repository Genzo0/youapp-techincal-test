import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | YouApp",
    default: "YouApp",
  },
  description:
    "Experience the combination of technology with matchmaking with Fabriquelove! Connect, socialize, and fall in love all in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#09141A] text-white`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
