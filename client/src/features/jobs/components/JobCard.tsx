import { useId } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarker } from 'react-icons/fa';

import { cn } from '@/lib/utils';
import type { SingleJob } from '../types/jobTypes';
import { JOB_TYPES_LABELS, WORK_MODE_LABELS } from '../constants/job';
import Card from '@/components/ui/Card';

type JobCardProps = {
  job: SingleJob;
};

const JobCard = ({ job }: JobCardProps) => {
  const detailsPath = `/jobs/${job.id}`;
  const descId = useId();
  const description = job.description?.trim() ?? '';

  return (
    <Card variant="interactive">
      {/* Job metadata */}
      <div className="mb-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-primary-light px-2.5 py-1 text-xs font-medium text-primary">
          {JOB_TYPES_LABELS[job.type]}
        </span>

        <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground">
          {WORK_MODE_LABELS[job.workMode]}
        </span>
      </div>

      {/* Job title */}
      <h3 className="card-title">
        <Link
          to={detailsPath}
          aria-describedby={descId}
          className={cn(
            'rounded-sm transition-colors',
            'hover:text-primary',
            'focus-visible:outline-none',
            'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          )}
        >
          {job.title}
        </Link>
      </h3>

      {/* Description */}
      <p
        id={descId}
        className="mt-1 line-clamp-3 text-sm leading-6 text-foreground"
      >
        {description}
      </p>

      {/* Salary / company */}
      <div className="mt-4 space-y-1">
        <p className="font-medium text-primary">{job.salary}</p>

        <p className="text-sm text-muted-foreground">{job.company.name}</p>
      </div>

      {/* Location */}
      <div className="mt-auto pt-5">
        <div className="border-t border-border pt-4">
          <p className="flex items-center gap-2 text-sm text-foreground">
            <FaMapMarker
              aria-hidden="true"
              className="size-4 shrink-0 text-primary"
            />

            <span className="sr-only">Location:</span>

            <span>
              {job.region.name} – {job.municipality.name}
            </span>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
