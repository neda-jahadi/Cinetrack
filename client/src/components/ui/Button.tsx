import { cn } from "../../lib/cn";

type ButtonVariant = "primary" | "secondary" | "dark";

type ButtonProps = {
  type: string;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const base =
  "inline-flex items-center justify-center rounded-md font-medium transition " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-700";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700",
  secondary: "bg-indigo-100 text-indigo-900 hover:bg-indigo-200",
  dark: "bg-black text-white hover:bg-gray-700",
};

const sizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "py-4 px-6 text-sm",
};

export default function Button({
  type = "button",
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, type, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
