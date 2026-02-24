import type { LoaderFunctionArgs } from "react-router-dom";

const jobDetailsLoader = async ({ params }: LoaderFunctionArgs) => {
  const id = params.id;
  if (!id) throw new Response("Missing job id", { status: 400 });
  const res = await fetch(`/api/jobs/${id}`);
  if (!res.ok) throw new Response("Job not found", { status: 404 });
  const json = await res.json();
  return json.data;
};

export default jobDetailsLoader;
