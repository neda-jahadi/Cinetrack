import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/ui/Button";
import FormField from "../components/ui/FormField";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  type: z.string().min(1, "This field is required"),
  title: z.string().min(1, "This field is required"),
  description: z
    .string()
    .min(30, "This field shuold have at least 30 characters"),
  salary: z.string().min(1, "This field is required"),
  location: z.string().min(1, "This field is required"),
  company: z.string().min(1, "This field is required"),
  company_description: z.string().min(1, "This field is required"),
  contact_email: z.email(),
  contact_phone: z.string().min(1, "This field is required"),
});

type JobFormFields = z.infer<typeof schema>;

const AddJobPage = () => {
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

  return (
    <>
      <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={handleSubmit(onSubmitJobForm)}>
              <h2 className="text-3xl text-center font-semibold mb-6">
                Add Job
              </h2>

              <div className="mb-4">
                <FormField id="type" label="Job Type" required>
                  <select
                    {...register("type")}
                    id="type"
                    name="type"
                    className="border rounded w-full py-2 px-3"
                  >
                    <option value="">Select job type</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Remote">Remote</option>
                    <option value="Internship">Internship</option>
                  </select>
                  {errors.type && (
                    <p className="text-danger">{errors.type.message}</p>
                  )}
                </FormField>
              </div>

              <div className="mb-4">
                <FormField id="title" label="Job Listing Name" required>
                  <input
                    {...register("title")}
                    type="text"
                    id="title"
                    name="title"
                    className="border rounded w-full py-2 px-3"
                    placeholder="eg. Beautiful Apartment In Miami"
                  />
                  {errors.title && (
                    <p className="text-danger">{errors.title.message}</p>
                  )}
                </FormField>
              </div>
              <div className="mb-4">
                <FormField id="description" label="Description" required>
                  <textarea
                    {...register("description")}
                    id="description"
                    name="description"
                    className="border rounded w-full py-2 px-3"
                    rows={4}
                    placeholder="Add any job duties, expectations, requirements, etc"
                  ></textarea>
                  {errors.description && (
                    <p className="text-danger">{errors.description.message}</p>
                  )}
                </FormField>
              </div>

              <div className="mb-4">
                <FormField id="salary" label="Salary" required>
                  <select
                    {...register("salary")}
                    id="salary"
                    name="salary"
                    className="border rounded w-full py-2 px-3"
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
                    <p className="text-danger">{errors.salary.message}</p>
                  )}
                </FormField>
              </div>

              <div className="mb-4">
                <FormField id="location" label="Location" required>
                  <input
                    {...register("location")}
                    type="text"
                    id="location"
                    name="location"
                    className="border rounded w-full py-2 px-3"
                    placeholder="Company Location"
                  />
                  {errors.location && (
                    <p className="text-danger">{errors.location.message}</p>
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
                    name="company"
                    className="border rounded w-full py-2 px-3"
                    placeholder="Company Name"
                  />
                  {errors.company && (
                    <p className="text-danger">{errors.company.message}</p>
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
                    name="company_description"
                    className="border rounded w-full py-2 px-3"
                    rows={4}
                    placeholder="What does your company do?"
                  ></textarea>
                  {errors.company_description && (
                    <p className="text-danger">
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
                    name="contact_email"
                    className="border rounded w-full py-2 px-3"
                    placeholder="Email address htmlFor applicants"
                  />
                  {errors.contact_email && (
                    <p className="text-danger">
                      {errors.contact_email.message}
                    </p>
                  )}
                </FormField>
              </div>
              <div className="mb-4">
                <FormField id="contact_phone" label="Contact Phone" required>
                  <input
                    {...register("contact_phone")}
                    type="tel"
                    autoComplete="tel"
                    id="contact_phone"
                    name="contact_phone"
                    className="border rounded w-full py-2 px-3"
                    placeholder="Optional phone htmlFor applicants"
                  />
                  {errors.contact_phone && (
                    <p className="text-danger">
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
