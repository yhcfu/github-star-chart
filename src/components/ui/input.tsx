import * as React from "react";

import { cn } from "@/lib/utils";

import { twx } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `flex h-9 w-full rounded-md border border-input bg-transparent px-3
          py-1 text-base shadow-sm transition-colors file:border-0
          file:bg-transparent file:text-sm file:font-medium file:text-foreground
          placeholder:text-muted-foreground focus-visible:outline-none
          focus-visible:ring-1 focus-visible:ring-ring
          disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

const InputGroup = twx.div`inline-flex gap-0 relative flex-row items-center
[&>:first-child]:-mr-px [&>:first-child]:rounded-r-none
[&_input]:rounded-l-none`;

const InputAddon = twx.label`flex min-w-fit items-center rounded-md rounded-l-md
border border-input bg-gray-200 px-3 py-1 text-base md:text-sm`;

export { Input, InputGroup, InputAddon };
