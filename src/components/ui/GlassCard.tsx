import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  border?: boolean;
  rounded?: boolean;
}

export const GlassCard = ({
  children,
  className = "",
  border = true,
  rounded = true,
}: GlassCardProps) => {
  const baseClasses = [
    "bg-white/30 dark:bg-gray-800/30 ",
    "backdrop-blur-xs",
    border ? "border border-white/10 dark:border-gray-700/30" : "",
    rounded ? "rounded-xl" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={baseClasses}>{children}</div>;
};
