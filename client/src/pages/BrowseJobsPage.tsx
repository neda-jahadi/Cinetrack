import { useSearchParams } from "react-router-dom";
import JobPreview from "../components/sections/Job/JobPreview";
import Container from "../components/ui/Container";
import Spinner from "../components/ui/Spinner";
import { useJobs } from "../features/jobs/jobData";
import NotFound from "@/components/sections/Job/NotFound";
import PaginationComponent from "@/components/navigation/pagination/PaginationComponent";
import SearchField from "@/components/navigation/searchBar/SearchField";
import FilterField from "@/components/navigation/searchBar/FilterFields";
const BrowseJobsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const title = searchParams.get("title") || "";
  const types = searchParams.getAll("type");
  const modes = searchParams.getAll("mode");
  // console.log("Search Params:", { page, title, types, modes });

  const { data, isLoading, isError } = useJobs({ page, types, modes, title });
  const jobs = data ? data.data : [];
  const pagination = data?.pagination;

  const handleChangePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    setSearchParams(params);
  };

  const toggleParamValue = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    const currentValues = params.getAll(key);
    params.delete(key);

    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    newValues.forEach((v) => params.append(key, v));
    params.set("page", "1");
    setSearchParams(params);
  };

  const setParamValue = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value.trim()) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    setSearchParams(params);
  };

  return (
    <>
      <section>
        <Container>
          <h1 className="text-3xl font-bold mb-7 text-center">Browse Jobs</h1>
          <SearchField
            title={title}
            handleUpdateSearchParams={(key, value) => setParamValue(key, value)}
          />
          <FilterField
            types={types}
            modes={modes}
            handleUpdateSearchParams={(key, value) =>
              toggleParamValue(key, value)
            }
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
