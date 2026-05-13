import JobForm from "../components/forms/JobForm";

const AddJobPage = () => {
  return (
    <>
      <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h2 className="text-3xl text-center font-semibold mb-6">Add Job</h2>
            <JobForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default AddJobPage;
