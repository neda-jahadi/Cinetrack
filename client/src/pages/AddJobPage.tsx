import { useMunicipalities } from '@/features/locations/api/locationQuery';
import JobForm from '@/features/jobs/forms/JobForm';
import Spinner from '@/components/ui/Spinner';
import NotFound from '@/pages/NotFound';

const AddJobPage = () => {
  const { data: municipalities, isLoading, isError } = useMunicipalities();

  if (isLoading) return <Spinner loading={true} />;
  if (isError || !municipalities) return <NotFound />;

  return (
    <>
      <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h2 className="text-3xl text-center font-semibold mb-6">Add Job</h2>
            <JobForm municipalities={municipalities} />
          </div>
        </div>
      </section>
    </>
  );
};

export default AddJobPage;
