import { Link, useParams } from "react-router-dom";
import Container from "../components/ui/Container";
import { FaArrowLeftLong } from "react-icons/fa6";
import Card from "../components/ui/Card";
import { FaMapMarker } from "react-icons/fa";
import ButtonLink from "../components/ui/ButtonLink";
import Button from "../components/ui/Button";
import { useDeleteJob, useJob } from "../features/jobs/jobData";
import NotFound from "../components/sections/Job/NotFound";
import Spinner from "../components/ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const JobDetailsPage = () => {
  const { isLoggedIn } = useAuth();

  const { id } = useParams<{ id: string }>();
  const { data: job, isLoading, isError } = useJob(id);

  const deleteJobMutation = useDeleteJob();

  const navigate = useNavigate();

  if (!id) return <NotFound />;

  if (isLoading) {
    return (
      <section className="px-4 py-12">
        <Container>
          <Spinner loading={true} />
        </Container>
      </section>
    );
  }

  if (isError || !job) {
    return <NotFound />;
  }

  const handleDeleteSingleJob = () => {
    const ok = window.confirm("Are you sure you want to delete this job?");
    if (!ok) return;
    deleteJobMutation.mutate(id, {
      onSuccess: () => {
        navigate("/jobs");
      },
    });
  };

  return (
    <>
      <section aria-label="Back navigation">
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
                <p className="text-accent mt-5 mb-3 pt-2 border-t border-border inline-flex items-center">
                  <FaMapMarker aria-hidden="true" className="mr-2 h-4 w-4" />
                  <span className="sr-only">Location</span>
                  {job.location}
                </p>
              </Card>

              <Card className="bg-white mt-6">
                <h2 className="text-indigo-800 text-lg font-bold mb-6">
                  Job Description
                </h2>

                <p className="mb-4">{job.description}</p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Salary
                </h3>

                <p className="mb-4">{job.salary}</p>
              </Card>
            </article>

            <aside aria-label="Company and actions">
              <Card className="bg-white">
                <h2 className="text-xl font-bold mb-6">Company Info</h2>

                <h3 className="text-2xl">{job.company.name}</h3>

                <p className="my-2">{job.company.description}</p>

                <hr className="my-4" />

                <h3 className="text-xl">Contact Email:</h3>

                <a
                  href={`mailto:${job.company.contactEmail}`}
                  className="mt-1 block rounded bg-indigo-100 p-2 font-bold underline-offset-2 hover:underline focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                >
                  {job.company.contactEmail}
                </a>

                <h3 className="text-xl mt-4">Contact Phone:</h3>

                <a
                  href={`tel:${job.company.contactPhone}`}
                  className="mt-1 block rounded bg-indigo-100 p-2 font-bold underline-offset-2 hover:underline focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                >
                  {job.company.contactPhone}
                </a>
              </Card>
              {isLoggedIn && (
                <Card className="bg-white mt-6">
                  <h2 className="text-xl font-bold mb-6">Manage Job</h2>
                  <ButtonLink
                    to={`/jobs/edit-job/${job._id}`}
                    className="w-full"
                  >
                    Edit Job
                  </ButtonLink>
                  <Button
                    variant="danger"
                    className="w-full rounded-full my-2"
                    disabled={deleteJobMutation.isPending}
                    onClick={() => handleDeleteSingleJob()}
                  >
                    {deleteJobMutation.isPending ? "Deleting ..." : "delete"}
                  </Button>
                  <div></div>
                  {deleteJobMutation.isError && (
                    <p>{(deleteJobMutation.error as Error).message}</p>
                  )}
                </Card>
              )}
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
};

export default JobDetailsPage;
