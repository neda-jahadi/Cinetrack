import { useJob } from '../../features/jobs/api/jobData';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/ui/Spinner';
import NotFound from '../NotFound';

import { useMunicipalities } from '@/features/locations/api/locationQuery';
import EditJobForm from '@/features/jobs/forms/EditJobForm';

const EditJobPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: job, isLoading, isError } = useJob(id);
  const {
    data: municipalities = [],
    isLoading: isLoadingMunicipalities,
    isError: isErrorMunicipalities,
  } = useMunicipalities();

  if (!id) return <NotFound />;
  if (isLoading || isLoadingMunicipalities) return <Spinner loading={true} />;
  if (isError || isErrorMunicipalities) return <NotFound />;

  return (
    <>
      <EditJobForm job={job} municipalities={municipalities} id={id} />
    </>
  );
};

export default EditJobPage;
