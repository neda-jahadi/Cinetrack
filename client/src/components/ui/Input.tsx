import * as React from "react";
import { cn } from "../../lib/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
  variant?: "default" | "ghost";
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      invalid = false,
      variant = "default",
      ...props
    },
    ref,
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        aria-invalid={invalid || undefined}
        className={cn(
          "w-full rounded border border-input bg-background py-3 text-sm transition input",
          "focus:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-60",

          invalid && "border-danger focus:ring-danger",
          variant === "default" &&
            "border-input border focus:ring-2 focus:ring-brand px-3",
          variant === "ghost" && "border-0 bg-transparent focus:ring-0 px-0",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
