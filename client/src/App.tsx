import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import NotFound from "./components/sections/Job/NotFound";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<RootLayout />}
      handle={{ crumb: () => ({ to: "/", label: "Home" }) }}
    >
      <Route index element={<HomePage />} />
      <Route
        path="jobs"
        handle={{ crumb: () => ({ to: "/jobs", label: "Jobs" }) }}
      >
        <Route index element={<JobsPage />} />
        <Route
          path=":id"
          element={<JobDetailsPage />}
          errorElement={<NotFound />}
          handle={{
            crumb: () => ({
              label: "Job",
            }),
          }}
        />
        <Route
          path="edit-job/:id"
          element={<EditJobPage />}
          handle={{
            crumb: () => ({
              label: "edit",
            }),
          }}
        />
      </Route>
      <Route path="add-job" element={<AddJobPage />} />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
