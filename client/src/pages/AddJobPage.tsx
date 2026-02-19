import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/ui/Button";
import FormField from "../components/ui/FormField";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useId } from "react";

const schema = z.object({
  type: z.string().min(1, "Please select a job type"),
  title: z.string().min(1, "Please add a job title"),
  description: z
    .string()
    .min(30, "Description must be at least 30 characters long"),
  salary: z.string().min(1, "Please select a salary"),
  location: z.string().min(1, "Please add a location"),
  company: z.string().min(1, "Please add a company location"),
  company_description: z
    .string()
    .min(30, "Company description must be at least 30 characters long"),
  contact_email: z.email(),
  contact_phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (v) => !v || /^[0-9+()\-.\s]+$/.test(v),
      "Phone number contains invalid characters",
    )
    .refine(
      (v) => !v || v.replace(/\D/g, "").length >= 7,
      "Phone number is too short",
    ),
});

type JobFormFields = z.infer<typeof schema>;

const AddJobPage = () => {
  const formId = useId();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<JobFormFields>({
    defaultValues: {
      contact_email: "test@gmail.com",
    },
    resolver: zodResolver(schema),
  });

  const onSubmitJobForm: SubmitHandler<JobFormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
      console.log(data);
    } catch (error) {
      setError("root", { message: "This email is already taken" });
    }
  };

  const errId = (name: string) => `${formId}-${name}-error`;

  return (
    <>
      <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={handleSubmit(onSubmitJobForm)} noValidate>
              <h2 className="text-3xl text-center font-semibold mb-6">
                Add Job
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
                    className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand"
                  >
                    <option value="">Select job type</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Remote">Remote</option>
                    <option value="Internship">Internship</option>
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
                  <input
                    {...register("title")}
                    type="text"
                    id="title"
                    required
                    aria-invalid={!!errors.title}
                    aria-describedby={errors.title ? errId("title") : undefined}
                    className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand"
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
                    className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand"
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
                    aria-describedby={
                      errors.salary ? errId("salary") : undefined
                    }
                    className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand"
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
                  <input
                    {...register("location")}
                    type="text"
                    id="location"
                    required
                    aria-invalid={!!errors.location}
                    aria-describedby={
                      errors.location ? errId("location") : undefined
                    }
                    className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand"
                    placeholder="Company Location"
                  />
                  {errors.location && (
                    <p id={errId("location")} className="text-danger">
                      {errors.location.message}
                    </p>
                  )}
                </FormField>
              </div>

              <h3 className="text-2xl mb-5">Company Info</h3>

              <div className="mb-4">
                <FormField id="company" label="Company Name" required>
                  <input
                    {...register("company")}
                    type="text"
                    id="company"
                    required
                    aria-invalid={!!errors.company}
                    aria-describedby={
                      errors.company ? errId("company") : undefined
                    }
                    className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand"
                    placeholder="Company Name"
                  />
                  {errors.company && (
                    <p id={errId("company")} className="text-danger">
                      {errors.company.message}
                    </p>
                  )}
                </FormField>
              </div>

              <div className="mb-4">
                <FormField
                  id="company_description"
                  label="Company Description"
                  required
                >
                  <textarea
                    {...register("company_description")}
                    id="company_description"
                    required
                    aria-invalid={!!errors.company_description}
                    aria-describedby={
                      errors.company_description
                        ? errId("company_description")
                        : undefined
                    }
                    className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand"
                    rows={4}
                    placeholder="What does your company do?"
                  ></textarea>
                  {errors.company_description && (
                    <p
                      id={errId("company_description")}
                      className="text-danger"
                    >
                      {errors.company_description.message}
                    </p>
                  )}
                </FormField>
              </div>

              <div className="mb-4">
                <FormField id="contact_email" label="Contact Email" required>
                  <input
                    {...register("contact_email")}
                    type="email"
                    autoComplete="email"
                    id="contact_email"
                    required
                    aria-invalid={!!errors.contact_email}
                    aria-describedby={
                      errors.contact_email ? errId("contact_email") : undefined
                    }
                    className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand"
                    placeholder="Email address htmlFor applicants"
                  />
                  {errors.contact_email && (
                    <p id={errId("contact_email")} className="text-danger">
                      {errors.contact_email.message}
                    </p>
                  )}
                </FormField>
              </div>
              <div className="mb-4">
                <FormField id="contact_phone" label="Contact Phone">
                  <input
                    {...register("contact_phone")}
                    type="tel"
                    autoComplete="tel"
                    id="contact_phone"
                    aria-invalid={!!errors.contact_phone}
                    aria-describedby={
                      errors.contact_phone ? errId("contact_phone") : undefined
                    }
                    className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-brand"
                    placeholder="Optional phone htmlFor applicants"
                  />
                  {errors.contact_phone && (
                    <p id={errId("contact_phone")} className="text-danger">
                      {errors.contact_phone.message}
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
                  {isSubmitting ? "Loading ..." : "Add Job"}
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

export default AddJobPage;
