import { useSearchParams } from "react-router-dom";
import JobPreview from "../components/sections/Job/JobPreview";
import Container from "../components/ui/Container";
import Spinner from "../components/ui/Spinner";
import { useJobs } from "../features/jobs/jobData";
import NotFound from "@/components/sections/Job/NotFound";
import Input from "@/components/ui/Input";
import PaginationComponent from "@/components/navigation/pagination/PaginationComponent";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/Button";
import { SearchIcon } from "lucide-react";
import SearchBar from "@/components/navigation/searchBar/searchBar";

const BrowseJobsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") || 1);

  const { data, isLoading, isError } = useJobs({ page });
  const jobs = data ? data.data : [];
  const pagination = data?.pagination;

  const handleChangePage = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };

  return (
    <>
      <section>
        <Container>
          <h1 className="text-3xl font-bold mb-7 text-center">Browse Jobs</h1>
          <SearchBar />
        </Container>
      </section>
      <section className="px-4 py-12">
        <Container>
          {isLoading && <Spinner loading={true} />}
          {isError && <NotFound />}
          {!isError && !isLoading && <JobPreview jobs={jobs} />}
        </Container>
      </section>

      {pagination && pagination.totalPages > 1 && (
        <section>
          <Container>
            <PaginationComponent
              pagination={pagination}
              onPageChange={handleChangePage}
            />
          </Container>
        </section>
      )}
    </>
  );
};

export default BrowseJobsPage;
