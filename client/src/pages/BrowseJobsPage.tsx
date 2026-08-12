import { useSearchParams } from 'react-router-dom';
import JobPreview from '@/features/jobs/components/JobPreview';
import Container from '../components/layouts/Container';
import Spinner from '../components/ui/Spinner';
import { useJobs } from '../features/jobs/api/jobData';
import NotFound from '@/pages/NotFound';
import PaginationComponent from '@/components/navigation/AppPagination';
import {
  useMunicipalities,
  useRegions,
} from '@/features/locations/api/locationQuery';
import { MultiSelectDropDown } from '@/components/ui/multiselect-dropdown';
import {
  JOB_TYPES,
  JOB_TYPES_LABELS,
  WORK_MODE,
  WORK_MODE_LABELS,
} from '@/features/jobs/constants/job';
import { Autocomplete } from '@/components/ui/autocomplete/autocomplete';
import SearchJobTitle from '@/features/jobs/components/SearchJobTitle';
import { useCallback } from 'react';

const BrowseJobsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') || 1);
  const title = searchParams.get('title') || '';
  const types = searchParams.getAll('type');
  const modes = searchParams.getAll('mode');
  const region = searchParams.get('region') || '';
  const location = searchParams.get('location') || '';

  const { data, isLoading, isError } = useJobs({
    page,
    types,
    modes,
    title,
    region,
    location,
  });
  const { data: regionsData } = useRegions();
  const { data: municipalitiesData } = useMunicipalities();

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

    params.set('page', '1');
    setSearchParams(params);
  };

  const setSingleParamValue = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      const currentValue = searchParams.get(key) || '';
      if (currentValue === value) return;
      if (value.trim()) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.set('page', '1');
      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const handleUpdateTitle = useCallback(
    (value: string) => {
      setSingleParamValue('title', value);
    },
    [setSingleParamValue],
  );

  return (
    <>
      <section>
        <Container>
          <h1 className="text-3xl font-bold mb-7 text-center">Browse Jobs</h1>
          <div className="flex lg:flex-row gap-2 mb-4">
            <SearchJobTitle
              title={title}
              handleUpdateSearchParams={handleUpdateTitle}
            />
            <Autocomplete
              options={locationOptions}
              value={location}
              placeholder="Location..."
              onChange={(value) => setSingleParamValue('location', value)}
            />
          </div>
          <div className="flex gap-2">
            <div>
              <label id="work-mode-filter" className="block mb-2">
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
                  setMultiParamValue('mode', values as string[])
                }
              />
            </div>
            <div>
              <label id="job-type-filter" className="block mb-2">
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
                  setMultiParamValue('type', values as string[])
                }
              />
            </div>
          </div>
          <div></div>
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
              onPageChange={(value) => handleChangePage('page', value)}
            />
          </Container>
        </section>
      )}
    </>
  );
};

export default BrowseJobsPage;
