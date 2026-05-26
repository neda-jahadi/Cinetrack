import { Link } from "react-router-dom";
import { cn } from "../../../lib/cn";
import { useId } from "react";
import { FaMapMarker } from "react-icons/fa";
import type { SingleJob } from "@/types/jobTypes";
import { JOB_TYPES_LABELS, WORK_MODE_LABELS } from "@/constants/job";

type JobCardProps = {
  job: SingleJob;
  className?: string;
  variant?: "light" | "tint";
};

const JobCard = ({ job, className, variant = "tint" }: JobCardProps) => {
  const cardClasses = variant === "tint" ? "bg-white" : "bg-gray-50";
  const detailsPath = `/jobs/${job.id}`;
  const descId = useId();
  const description = job.description?.trim() ?? "";

  return (
    <article
      className={cn(
        "h-full rounded-xl p-6 shadow-sm ring-1 ring-black/5",
        cardClasses,
        className,
      )}
    >
      <p className="text-sm font-medium text-muted">
        {JOB_TYPES_LABELS[job.type]}
      </p>
      <p className="text-sm font-medium text-muted">
        {WORK_MODE_LABELS[job.workMode]}
      </p>
      <h3 className="mt-2 text-xl font-bold">
        <Link
          to={detailsPath}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 rounden-sm hover:underline focus-visible:underline"
        >
          {job.title}
        </Link>
      </h3>

      <p className={cn("mb-3 text-muted", "line-clamp-3")} id={descId}>
        {description}
      </p>

      <p className="text-indigo-500 mb-2">{job.salary}</p>
      <p className="text-indigo-500 mb-2">{job.company.name}</p>
      <p className="text-accent mt-5 mb-3 pt-2 border-t border-border inline-flex items-center">
        <FaMapMarker aria-hidden="true" className="mr-2 h-4 w-4" />
        <span className="sr-only">Location</span>
        {job.region.name}-{job.municipality.name}
      </p>
    </article>
  );
};

export default JobCard;
