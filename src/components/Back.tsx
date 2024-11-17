import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface BackProps {
  href: string;
}

export default function Back({ href }: BackProps) {
  return (
    <Link href={href} className="flex items-center">
      <ChevronLeft className="size-6" />
      <p>Back</p>
    </Link>
  );
}
