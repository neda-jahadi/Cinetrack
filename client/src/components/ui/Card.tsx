import { cn } from "../../lib/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div className={cn("p-6 rounded-lg shadow-md", className)}>{children}</div>
  );
};

export default Card;
