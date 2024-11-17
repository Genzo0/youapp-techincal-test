import { cn } from "@/lib/utils";

interface MaxWidthWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function MaxWidthWrapper({
  children,
  className = "",
}: MaxWidthWrapperProps) {
  return <div className={cn("min-h-screen p-4", className)}>{children}</div>;
}
