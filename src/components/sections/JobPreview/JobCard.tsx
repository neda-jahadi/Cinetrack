import { Link } from "react-router-dom";
import ButtonLink from "../../../components/ui/ButtonLink";
import { cn } from "../../../lib/cn";
import type { Job } from "../../../types";

type JobCardProps = {
  job: Job;
  className?: string;
  variant?: "light" | "tint";
};

const JobCard = ({ job, className, variant = "tint" }: JobCardProps) => {
  const cardClasses = variant === "tint" ? "bg-white" : "bg-gray-50";
  const detailsPath = `/jobs/${job.id}`;
  return (
    <article
      className={cn(
        "rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5",
        cardClasses,
        className,
      )}
    >
      <p className="text-sm font-medium text-gray-600">{job.type}</p>
      <h3 className="mt-2 text-xl font-bold text-gray-900">
        <Link
          to={detailsPath}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring.indigo-600 focus-visible:ring-offset-2 rounden-sm "
        >
          {job.title}
        </Link>
      </h3>

      <p className="mb-3 text-gray-700">{job.description}</p>

      <p className="text-indigo-500 mb-2">{job.salary}</p>
      <p className="text-orange-700 mt-5 mb-3 border-t border-gray-100">
        <i className="fa-solid fa-location-dot text-lg"></i>
        {job.location}
      </p>

      <div className="flex flex-col lg:flex-row justify-between mb-4">
        <ButtonLink
          to={detailsPath}
          aria-label={`Read More about: ${job.title}`}
          variant={variant === "tint" ? "primary" : "dark"}
        >
          Read more
        </ButtonLink>
      </div>
    </article>
  );
};

export default JobCard;
