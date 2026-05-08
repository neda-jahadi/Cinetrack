import { Link, type LinkProps } from "react-router-dom";
import { cn } from "../../lib/cn";

type ButtonLinkVariant = "primary" | "secondary" | "dark" | "nude";

type ButtonLinkProps = LinkProps & {
  variant?: ButtonLinkVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const base =
  "inline-flex items-center justify-center rounded-md font-bold transition " +
  "focus:shadow-outline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-700";

const variants: Record<ButtonLinkVariant, string> = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700",
  secondary: "bg-indigo-200 text-indigo-900 hover:bg-indigo-300",
  dark: "bg-black text-white hover:bg-gray-700",
  nude: "bg-transparent text-indigo-600 hover:text-indigo-700",
};

const sizes = {
  sm: "px-3 py-2 text-md",
  md: "px-6 py-4 text-md",
  lg: "py-6 px-8 text-lg",
};

export default function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
