import { Link, useLoaderData } from "react-router-dom";
import type { Job } from "../types";
import Container from "../components/ui/Container";
import { FaArrowLeftLong } from "react-icons/fa6";
import Card from "../components/ui/Card";

const JobDetailsPage = () => {
  const job = useLoaderData() as Job;
  return (
    <>
      <section>
        <Container className="py-4">
          <Link
            to="/jobs"
            className="group text-indigo-500 hover:text-indigo-600 inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 rounded-sm hover:underline focus-visible:underline"
          >
            <FaArrowLeftLong
              aria-hidden="true"
              className="mr-2 transition-transform duration-200 ease-out group-hover:-translate-x-1"
            />
            <span>Back to Job Listings</span>
          </Link>
        </Container>
      </section>

      <section className="bg-surface-muted py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
            <article>
              <Card className="bg-white text-center md:text-left">
                <div className="text-gray-500 mb-4">{job.type}</div>
                <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <i className="fa-solid fa-location-dot text-lg text-orange-700 mr-2"></i>
                  <p className="text-orange-700">{job.location}</p>
                </div>
              </Card>

              <Card className="bg-white mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Job Description
                </h3>

                <p className="mb-4">{job.description}</p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Salary
                </h3>

                <p className="mb-4">{job.salary}</p>
              </Card>
            </article>

            <aside>
              <Card className="bg-white">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>

                <h2 className="text-2xl">{job.company.name}</h2>

                <p className="my-2">{job.company.description}</p>

                <hr className="my-4" />

                <h3 className="text-xl">Contact Email:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.company.contactEmail}
                </p>

                <h3 className="text-xl">Contact Phone:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.company.contactPhone}
                </p>
              </Card>

              <Card className="bg-white mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                <a
                  href="/add-job.html"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Job
                </a>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                  Delete Job
                </button>
              </Card>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
};

export default JobDetailsPage;
