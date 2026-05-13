import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/ui/Button";
import FormField from "../components/ui/FormField";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect, useId } from "react";
import Input from "../components/ui/Input";
import { useEditJob, useJob } from "../features/jobs/jobData";
import { useNavigate, useParams } from "react-router-dom";
import { jobSchema, type JobFormFields } from "../validation/job";
import Spinner from "../components/ui/Spinner";
import NotFound from "../components/sections/Job/NotFound";
import { JOB_TYPES } from "../constants/job";

const EditJobPage = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) throw new Error("Missing job id");
  const { data: job, isLoading, isError } = useJob(id);

  const editJobMutation = useEditJob();
  const navigate = useNavigate();
  const formId = useId();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JobFormFields>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      type: "Full_Time",
      title: "",
      description: "",
      salary: "",
      location: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (!job) return;

    reset(
      {
        type: job.type ?? "",
        title: job.title ?? "",
        description: job.description ?? "",
        salary: job.salary ?? "",
        location: job.location ?? "",
      },
      {
        keepDirtyValues: true,
      },
    );
  }, [job?.id, reset]);

  if (!id) return <NotFound />;
  if (isLoading) return <Spinner loading />;
  if (isError || !job) return <NotFound />;

  const onSubmitJobForm: SubmitHandler<JobFormFields> = (data) => {
    const jobToEdit = {
      title: data.title,
      type: data.type,
      description: data.description,
      salary: data.salary,
      location: data.location,
    };

    const payload = {
      id,
      jobToEdit,
    };

    editJobMutation.mutate(payload, {
      onSuccess: () => {
        navigate(`/jobs/${id}`);
      },
      onError: (error: any) => {
        setError("root", {
          type: "server",
          message: error.message || "Failed to edit the job",
        });
      },
    });
  };

  const isSaving = editJobMutation.isPending;

  const errId = (name: string) => `${formId}-${name}-error`;

  return (
    <>
      <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={handleSubmit(onSubmitJobForm)} noValidate>
              <h2 className="text-3xl text-center font-semibold mb-6">
                Edit the Job
              </h2>
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
                        {type.replaceAll("_", " ")}
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
                  <textarea
                    {...register("salary")}
                    id="salary"
                    required
                    aria-invalid={!!errors.salary}
                    aria-describedby={
                      errors.salary ? errId("salary") : undefined
                    }
                    className={`border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand ${errors.salary && "border-danger focus:ring-danger"}`}
                    rows={4}
                    placeholder="Add expected salary for the job"
                  ></textarea>
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
                    aria-describedby={
                      errors.location ? errId("location") : undefined
                    }
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
                <Button
                  disabled={isSubmitting}
                  className="w-full"
                  type="submit"
                >
                  {isSaving ? "Saving ..." : "Edit Job"}
                </Button>
                {errors.root && (
                  <p className="text-danger">{errors.root.message}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditJobPage;
