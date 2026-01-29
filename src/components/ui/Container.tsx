import { cn } from "../../lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide" | "full";
};

const sizes = {
  narrow: "max-w-3xl",
  default: "max-w-7xl",
  wide: "max-w-screen-2xl",
  full: "max-w-none",
} as const;

const Container = ({
  children,
  className = "",
  size = "default",
}: ContainerProps) => {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizes[size],
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Container;
