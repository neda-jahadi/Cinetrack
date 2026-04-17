import { Link, type LinkProps } from "react-router-dom";
import { cn } from "../../lib/cn";

type ButtonLinkVariant = "primary" | "secondary" | "dark";

type ButtonLinkProps = LinkProps & {
  variant?: ButtonLinkVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const base =
  "inline-flex items-center justify-center rounded-md font-medium transition " +
  "focus:shadow-outline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-700";

const variants: Record<ButtonLinkVariant, string> = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-700",
  secondary: "bg-indigo-200 text-indigo-900 hover:bg-indigo-300",
  dark: "bg-black text-white hover:bg-gray-700",
};

const sizes = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "py-4 px-6 text-sm",
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
