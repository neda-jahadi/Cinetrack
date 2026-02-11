import Button from "../components/ui/Button";
import FormField from "../components/ui/FormField";

const AddJobPage = () => {
  return (
    <>
      <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form>
              <h2 className="text-3xl text-center font-semibold mb-6">
                Add Job
              </h2>

              <div className="mb-4">
                <FormField id="type" label="Job Type" required>
                  <select
                    id="type"
                    name="type"
                    className="border rounded w-full py-2 px-3"
                    required
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Remote">Remote</option>
                    <option value="Internship">Internship</option>
                  </select>
                </FormField>
              </div>

              <div className="mb-4">
                <FormField id="title" label="Job Listing Name" required>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="eg. Beautiful Apartment In Miami"
                    required
                  />
                </FormField>
              </div>
              <div className="mb-4">
                <FormField id="description" label="Description" required>
                  <textarea
                    id="description"
                    name="description"
                    className="border rounded w-full py-2 px-3"
                    rows={4}
                    placeholder="Add any job duties, expectations, requirements, etc"
                  ></textarea>
                </FormField>
              </div>

              <div className="mb-4">
                <FormField id="salary" label="Salary" required>
                  <select
                    id="salary"
                    name="salary"
                    className="border rounded w-full py-2 px-3"
                    required
                  >
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
                </FormField>
              </div>

              <div className="mb-4">
                <FormField id="location" label="Location" required>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className="border rounded w-full py-2 px-3 mb-2"
                    placeholder="Company Location"
                    required
                  />
                </FormField>
              </div>

              <h3 className="text-2xl mb-5">Company Info</h3>

              <div className="mb-4">
                <FormField id="company" label="Company Name" required>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="border rounded w-full py-2 px-3"
                    placeholder="Company Name"
                  />
                </FormField>
              </div>

              <div className="mb-4">
                <FormField
                  id="company_description"
                  label="Company Description"
                  required
                >
                  <textarea
                    id="company_description"
                    name="company_description"
                    className="border rounded w-full py-2 px-3"
                    rows={4}
                    placeholder="What does your company do?"
                  ></textarea>
                </FormField>
              </div>

              <div className="mb-4">
                <FormField id="contact_email" label="Contact Email" required>
                  <input
                    type="email"
                    autoComplete="email"
                    id="contact_email"
                    name="contact_email"
                    className="border rounded w-full py-2 px-3"
                    placeholder="Email address htmlFor applicants"
                    required
                  />
                </FormField>
              </div>
              <div className="mb-4">
                <FormField id="contact_phone" label="Contact Phone" required>
                  <input
                    type="tel"
                    autoComplete="tel"
                    id="contact_phone"
                    name="contact_phone"
                    className="border rounded w-full py-2 px-3"
                    placeholder="Optional phone htmlFor applicants"
                  />
                </FormField>
              </div>

              <div>
                <Button className="w-full" type="submit">
                  Add Job
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddJobPage;
