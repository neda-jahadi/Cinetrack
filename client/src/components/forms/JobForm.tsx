import { useNavigate } from 'react-router-dom';
import { useAddJob } from '../../features/jobs/jobData';
import { useId } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { jobSchema, type JobFormFields } from '../../validation/job';
import { zodResolver } from '@hookform/resolvers/zod';
import FormField from '../ui/FormField';
import {
  JOB_TYPES,
  JOB_TYPES_LABELS,
  WORK_MODE,
  WORK_MODE_LABELS,
} from '../../constants/job';
import Input from '../ui/Input';
import type { MunicipalityApiResponse } from '@/types/locationTypes';
import { Button } from '../ui/button/button';

type JobFormProps = {
  municipalities: MunicipalityApiResponse[];
};

const JobForm = ({ municipalities }: JobFormProps) => {
  const addJobMutation = useAddJob();

  const navigate = useNavigate();
  const formId = useId();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<JobFormFields>({
    resolver: zodResolver(jobSchema),
  });

  const onSubmitJobForm: SubmitHandler<JobFormFields> = (data) => {
    const payload = {
      title: data.title,
      type: data.type,
      workMode: data.workMode,
      description: data.description,
      salary: data.salary,
      municipalityId: Number(data.municipalityId),
    };

    addJobMutation.mutate(payload, {
      onSuccess: () => {
        navigate('/jobs');
      },
      onError: (error: unknown) => {
        setError('root', {
          type: 'server',
          message: (error as Error).message || 'Failed to create job',
        });
      },
    });
  };

  const isSaving = addJobMutation.isPending;

  const errId = (name: string) => `${formId}-${name}-error`;
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitJobForm)} noValidate>
        <p role="alert" className="text-danger text-sm min-h-1.5 mb-4">
          {errors.root?.message ?? ''}
        </p>

        <div className="mb-4">
          <FormField id="type" label="Job Type" required>
            <select
              {...register('type')}
              id="type"
              required
              aria-invalid={!!errors.type}
              aria-describedby={errors.type ? errId('type') : undefined}
              className={`border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand ${errors.type && 'border-danger focus:ring-danger'}`}
            >
              <option value="">Select job type</option>
              {JOB_TYPES.map((type) => (
                <option key={type} value={type}>
                  {JOB_TYPES_LABELS[type]}
                </option>
              ))}
            </select>
            {errors.type && (
              <p
                id={errId('type')}
                aria-live="polite"
                aria-hidden="false"
                className="text-danger"
              >
                {errors.type.message}
              </p>
            )}
          </FormField>
        </div>
        <div className="mb-4">
          <FormField id="workMode" label="Work Mode" required>
            <select
              {...register('workMode')}
              id="workMode"
              required
              aria-invalid={!!errors.workMode}
              aria-describedby={errors.workMode ? errId('workMode') : undefined}
              className={`border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand ${errors.workMode && 'border-danger focus:ring-danger'}`}
            >
              <option value="">Select work mode</option>
              {WORK_MODE.map((mode) => (
                <option key={mode} value={mode}>
                  {WORK_MODE_LABELS[mode]}
                </option>
              ))}
            </select>
            {errors.workMode && (
              <p
                id={errId('workMode')}
                aria-live="polite"
                aria-hidden="false"
                className="text-danger"
              >
                {errors.workMode.message}
              </p>
            )}
          </FormField>
        </div>

        <div className="mb-4">
          <FormField id="title" label="Job Listing Name" required>
            <Input
              {...register('title')}
              id="title"
              required
              invalid={!!errors.title}
              aria-describedby={errors.title ? errId('title') : undefined}
              placeholder="e.g. Senior Frontend Developer"
            />
            {errors.title && (
              <p
                id={errId('title')}
                aria-live="polite"
                aria-hidden="false"
                className="text-danger"
              >
                {errors.title.message}
              </p>
            )}
          </FormField>
        </div>
        <div className="mb-4">
          <FormField id="description" label="Description" required>
            <textarea
              {...register('description')}
              id="description"
              required
              aria-invalid={!!errors.description}
              aria-describedby={
                errors.description ? errId('description') : undefined
              }
              className={`border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand ${errors.description && 'border-danger focus:ring-danger'}`}
              rows={4}
              placeholder="Add any job duties, expectations, requirements, etc"
            ></textarea>
            {errors.description && (
              <p
                id={errId('description')}
                aria-live="polite"
                aria-hidden="false"
                className="text-danger"
              >
                {errors.description.message}
              </p>
            )}
          </FormField>
        </div>

        <div className="mb-4">
          <FormField id="salary" label="Salary" required>
            <textarea
              {...register('salary')}
              id="salary"
              required
              aria-invalid={!!errors.salary}
              aria-describedby={errors.salary ? errId('salary') : undefined}
              className={`border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand ${errors.salary && 'border-danger focus:ring-danger'}`}
              rows={4}
              placeholder="Add expected salary for the job"
            ></textarea>
            {errors.salary && (
              <p
                id={errId('salary')}
                aria-live="polite"
                aria-hidden="false"
                className="text-danger"
              >
                {errors.salary.message}
              </p>
            )}
          </FormField>
        </div>

        <div className="mb-4">
          <FormField id="municipalityId" label="Municipality" required>
            <select
              {...register('municipalityId')}
              id="municipalityId"
              required
              aria-invalid={!!errors.municipalityId}
              aria-describedby={
                errors.municipalityId ? errId('municipalityId') : undefined
              }
              className={`border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand ${errors.municipalityId && 'border-danger focus:ring-danger'}`}
            >
              <option value="">Select Municipality</option>
              {municipalities.map((municipality) => (
                <option key={municipality.id} value={municipality.id}>
                  {municipality.name}
                </option>
              ))}
            </select>
            {errors.municipalityId && (
              <p
                id={errId('municipalityId')}
                aria-live="polite"
                aria-hidden="false"
                className="text-danger"
              >
                {errors.municipalityId.message}
              </p>
            )}
          </FormField>
        </div>

        <div>
          <Button disabled={isSubmitting} className="w-full" type="submit">
            {isSaving ? 'Saving ...' : 'Add Job'}
          </Button>
          {errors.root && <p className="text-danger">{errors.root.message}</p>}
        </div>
      </form>
    </div>
  );
};

export default JobForm;
