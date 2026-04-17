import { cn } from "../../../lib/cn";
import ButtonLink from "../../ui/ButtonLink";

type CtaCardProps = {
  title: string;
  description: string;
  to: string;
  ctaLabel: string;
  variant?: "light" | "tint";
};

const CtaCard = ({
  title,
  description,
  to,
  ctaLabel,
  variant = "light",
}: CtaCardProps) => {
  const cardClasses = variant === "tint" ? "bg-indigo-100" : "bg-gray-100";

  return (
    <article className={cn("p-6 rounded-lg shadow-md", cardClasses)}>
      <h3 className="card-title">{title}</h3>
      <p className="mt-2 mb-4">{description}</p>
      <ButtonLink
        to={to}
        aria-label={`${ctaLabel}: ${title}`}
        variant={variant === "tint" ? "primary" : "dark"}
      >
        {ctaLabel}
      </ButtonLink>
    </article>
  );
};

export default CtaCard;
