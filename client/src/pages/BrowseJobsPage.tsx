import { useSearchParams } from "react-router-dom";
import JobPreview from "../components/sections/Job/JobPreview";
import Container from "../components/ui/Container";
import Spinner from "../components/ui/Spinner";
import { useJobs } from "../features/jobs/jobData";
import NotFound from "@/components/sections/Job/NotFound";
import PaginationComponent from "@/components/navigation/pagination/PaginationComponent";
import SearchField from "@/components/navigation/searchBar/SearchField";
import FilterFields from "@/components/navigation/searchBar/FilterFields";

const BrowseJobsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const title = searchParams.get("title") || "";
  const type = searchParams.get("type") || "";
  const mode = searchParams.get("mode") || "";

  const { data, isLoading, isError } = useJobs({ page, title, type, mode });
  const jobs = data ? data.data : [];
  const pagination = data?.pagination;

  const handleChangePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    setSearchParams(params);
  };

  const handleUpdateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    const currentValue = searchParams.get(key) || "";
    if (value === currentValue) return; // No change, do nothing
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1"); // Reset to first page on filter change
    setSearchParams(params);
  };

  return (
    <>
      <section>
        <Container>
          <h1 className="text-3xl font-bold mb-7 text-center">Browse Jobs</h1>
          <SearchField
            title={title}
            handleUpdateSearchParams={(value) =>
              handleUpdateSearchParams("title", value)
            }
          />
          <FilterFields
            type={type}
            mode={mode}
            handleUpdateSearchParams={handleUpdateSearchParams}
          />
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
