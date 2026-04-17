import JobPreview from "../components/sections/Job/JobPreview";
import Container from "../components/ui/Container";
import Spinner from "../components/ui/Spinner";
import { useJobs } from "../features/jobs/jobData";
import { useState } from "react";
import PaginationComponent from "../components/sections/PaginationComponent";

const BrowseJobsPage = () => {
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isError } = useJobs({ page });
  const jobs = data?.data ?? [];
  const pagination = data?.pagination;

  const handleChangePage = (currentPage: number) => {
    setPage(currentPage);
  };

  return (
    <>
      <section className="px-4 py-12">
        <Container>
          <h1 className="text-3xl font-bold mb-7 text-center">Browse Jobs</h1>
          {isLoading && <Spinner loading={true} />}
          {isError && <p>Job not found</p>}
          {!isError && !isLoading && <JobPreview jobs={jobs} />}
        </Container>
      </section>

      <section className="px-4 py-12">
        <Container className="text-center">
          <PaginationComponent
            pagination={pagination}
            handleChangePage={handleChangePage}
          />
        </Container>
      </section>
    </>
  );
};

export default BrowseJobsPage;
