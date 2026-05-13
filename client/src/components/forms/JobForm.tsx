import { useNavigate } from "react-router-dom";
import { useAddJob } from "../../features/jobs/jobData";
import { useId } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { jobSchema, type JobFormFields } from "../../validation/job";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../ui/FormField";
import { JOB_TYPES } from "../../constants/job";
import Input from "../ui/Input";
import Button from "../ui/Button";

const JobForm = () => {
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
      description: data.description,
      salary: data.salary,
      location: data.location,
    };

    addJobMutation.mutate(payload, {
      onSuccess: () => {
        navigate("/jobs");
      },
      onError: (error: any) => {
        setError("root", {
          type: "server",
          message: error.message || "Failed to create job",
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
          {errors.root?.message ?? ""}
        </p>

        <div className="mb-4">
          <FormField id="type" label="Job Type" required>
            <select
              {...register("type")}
              id="type"
              required
              aria-invalid={!!errors.type}
              aria-describedby={errors.type ? errId("type") : undefined}
              className={`border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand ${errors.type && "border-danger focus:ring-danger"}`}
            >
              <option value="">Select job type</option>
              {JOB_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type.replace("_", " ")}
                </option>
              ))}
            </select>
            {errors.type && (
              <p
                id={errId("type")}
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
          <FormField id="title" label="Job Listing Name" required>
            <Input
              {...register("title")}
              id="title"
              required
              invalid={!!errors.title}
              aria-describedby={errors.title ? errId("title") : undefined}
              placeholder="e.g. Senior Frontend Developer"
            />
            {errors.title && (
              <p
                id={errId("title")}
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
              {...register("description")}
              id="description"
              required
              aria-invalid={!!errors.description}
              aria-describedby={
                errors.description ? errId("description") : undefined
              }
              className={`border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand ${errors.description && "border-danger focus:ring-danger"}`}
              rows={4}
              placeholder="Add any job duties, expectations, requirements, etc"
            ></textarea>
            {errors.description && (
              <p
                id={errId("description")}
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
            <select
              {...register("salary")}
              id="salary"
              required
              aria-invalid={!!errors.salary}
              aria-describedby={errors.salary ? errId("salary") : undefined}
              className={`border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand ${errors.salary && "border-danger focus:ring-danger"}`}
            >
              <option value="">Select Salary</option>
              <option value="Under $50K">Under $50K</option>
              <option value="$50K - 60K">$50K - $60K</option>
              <option value="$60K - 70K">$60K - $70K</option>
              <option value="$70K - 80K">$70K - $80K</option>
              <option value="$80K - 90K">$80K - $90K</option>
              <option value="$90K - 100K">$90K - $100K</option>
              <option value="$100K - 125K">$100K - $125K</option>
              <option value="$125K - 150K">$125K - $150K</option>
              <option value="$150K - 175K">$150K - $175K</option>
              <option value="$175K - 200K">$175K - $200K</option>
              <option value="Over $200K">Over $200K</option>
            </select>
            {errors.salary && (
              <p
                id={errId("salary")}
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
          <FormField id="location" label="Location" required>
            <Input
              {...register("location")}
              id="location"
              required
              invalid={!!errors.location}
              aria-describedby={errors.location ? errId("location") : undefined}
              placeholder="Company Location"
            />
            {errors.location && (
              <p id={errId("location")} className="text-danger">
                {errors.location.message}
              </p>
            )}
          </FormField>
        </div>

        <div>
          <Button disabled={isSubmitting} className="w-full" type="submit">
            {isSaving ? "Saving ..." : "Add Job"}
          </Button>
          {errors.root && <p className="text-danger">{errors.root.message}</p>}
        </div>
      </form>
    </div>
  );
};

export default JobForm;
