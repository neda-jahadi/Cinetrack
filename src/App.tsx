import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import RootLayout from "./layout/RootLayout";
import { RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import jobDetailsLoader from "./components/sections/Job/jobDetailsLoader";
import NotFound from "./components/sections/Job/NotFound";

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
          loader={jobDetailsLoader}
          handle={{
            crumb: () => ({
              label: "Job",
            }),
          }}
        />
      </Route>
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
