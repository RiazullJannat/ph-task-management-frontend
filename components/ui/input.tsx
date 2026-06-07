"use client";

import { cn } from "@/lib/utils";

export function Input({
  className,
  type,
  icon,
  ...props
}: React.ComponentProps<"input"> & {
  icon?: React.ReactNode;
  borderRadius?: string;
  sku?: string;
}) {
  return (
    <div className="relative w-full">
      {icon && (
        <span className="absolute top-2 left-2 text-white/60 w-4 h-4">
          {icon}
        </span>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "text-[#9a9aa6] placeholder-[#8a8a96] text-base font-light outline-none effect flex items-center gap-3 px-4 py-2   bg-white/10 backdrop-blur-3xl rounded-[12px] focus-within:border-white/30 focus-within:shadow-md transition-[box-shadow,border-color] w-full",
          className,
        )}
        {...props}
      />
    </div>
  );
}
