import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import HomePage from "../pages/HomePage";
import JobsPage from "../pages/JobsPage";
import JobDetailsPage from "../pages/JobDetailsPage";
import NotFound from "../components/sections/Job/NotFound";
import EditJobPage from "../pages/EditJobPage";
import AddJobPage from "../pages/AddJobPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    handle: { crumb: () => ({ to: "/", label: "Home" }) },
    children: [
      { index: true, element: <HomePage /> },

      {
        path: "jobs",
        handle: { crumb: () => ({ to: "/jobs", label: "Jobs" }) },
        children: [
          { index: true, element: <JobsPage /> },

          {
            path: ":id",
            element: <JobDetailsPage />,
            errorElement: <NotFound />,
            handle: { crumb: () => ({ label: "Job" }) },
          },

          {
            path: "edit-job/:id",
            element: <EditJobPage />,
            handle: { crumb: () => ({ label: "edit" }) },
          },
        ],
      },

      { path: "add-job", element: <AddJobPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
