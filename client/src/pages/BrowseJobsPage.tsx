import { useSearchParams } from "react-router-dom";
import JobPreview from "../components/sections/Job/JobPreview";
import Container from "../components/ui/Container";
import Spinner from "../components/ui/Spinner";
import { useJobs } from "../features/jobs/jobData";
import NotFound from "@/components/sections/Job/NotFound";
import PaginationComponent from "@/components/navigation/pagination/PaginationComponent";
import {
  useMunicipalities,
  useRegions,
} from "@/features/locations/locationQuery";
import { MultiSelectDropDown } from "@/components/ui/multiselect-dropdown";
import {
  JOB_TYPES,
  JOB_TYPES_LABELS,
  WORK_MODE,
  WORK_MODE_LABELS,
} from "@/constants/job";
import { Autocomplete } from "@/components/ui/autocomplete/autocomplete";
import SearchJobTitle from "@/components/sections/Job/SearchJobTitle";
import { Button } from "@/components/ui/button";
import FormField from "@/components/ui/FormField";

const BrowseJobsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const title = searchParams.get("title") || "";
  const types = searchParams.getAll("type");
  const modes = searchParams.getAll("mode");
  const region = searchParams.get("region") || "";
  const location = searchParams.get("location") || "";

  const { data, isLoading, isError } = useJobs({
    page,
    types,
    modes,
    title,
    region,
    location,
  });
  const { data: regionsData, isLoading: regionsLoading } = useRegions();
  const { data: municipalitiesData, isLoading: municipalitiesLoading } =
    useMunicipalities();

  const jobs = data ? data.data : [];
  const pagination = data?.pagination;
  const regions = regionsData ? regionsData : [];
  const municipalities = municipalitiesData ? municipalitiesData : [];

  const locationOptions = [
    ...regions.map((region) => ({
      value: `region-${region.id}`,
      label: region.name,
    })),

    ...municipalities.map((municipality) => ({
      value: `municipality-${municipality.id}`,
      label: `${municipality.name} (${municipality.region.name})`,
    })),
  ];

  const handleChangePage = (key: string, newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, String(newPage));
    setSearchParams(params);
  };

  const setMultiParamValue = (key: string, values: string[]) => {
    const params = new URLSearchParams(searchParams);

    params.delete(key);

    values.forEach((value) => params.append(key, value));

    params.set("page", "1");
    setSearchParams(params);
  };

  const setSingleParamValue = (key: string, value: string) => {
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
          <div className="flex sm:flex-col md:flex-col lg:flex-row gap-2 mb-4">
            <SearchJobTitle
              title={title}
              handleUpdateSearchParams={(value) =>
                setSingleParamValue("title", value)
              }
            />
            <Autocomplete
              options={locationOptions}
              value={location}
              placeholder="Location..."
              onChange={(value) => setSingleParamValue("location", value)}
            />
          </div>
          <div className="flex gap-2">
            <div>
              <label id="work-mode-filter" className="block">
                Select Work Mode
              </label>
              <MultiSelectDropDown
                id="work-mode-filter"
                placeholder="Select Work mode"
                options={WORK_MODE.map((type) => ({
                  label: WORK_MODE_LABELS[type],
                  value: type,
                }))}
                selected={modes}
                onSelectChange={(values) =>
                  setMultiParamValue("mode", values as string[])
                }
              />
            </div>
            <div>
              <label id="job-type-filter" className="block">
                Select Job type
              </label>
              <MultiSelectDropDown
                id="job-type-filter"
                placeholder="Select Job Type"
                options={JOB_TYPES.map((type) => ({
                  label: JOB_TYPES_LABELS[type],
                  value: type,
                }))}
                selected={types}
                onSelectChange={(values) =>
                  setMultiParamValue("type", values as string[])
                }
              />
            </div>
          </div>
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
              onPageChange={(value) => handleChangePage("page", value)}
            />
          </Container>
        </section>
      )}
    </>
  );
};

export default BrowseJobsPage;
