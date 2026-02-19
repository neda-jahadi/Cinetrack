import * as React from "react";
import { cn } from "../../lib/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", invalid = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        aria-invalid={invalid || undefined}
        className={cn(
          "w-full rounded border px-3 py-2 text-sm transition",
          "focus:outline-none focus:ring-2 focus:ring-brand",
          "disabled:cursor-not-allowed disabled:opacity-60",
          invalid && "border-danger focus:ring-danger",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
