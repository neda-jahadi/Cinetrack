import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import { lazy } from "react";
import BrowseJobsPage from "../pages/BrowseJobsPage";
import ManageBookingPage from "../pages/ManageBookingPage";
const HomePage = lazy(() => import("../pages/HomePage"));
const JobsPage = lazy(() => import("../pages/JobsPage"));
const JobDetailsPage = lazy(() => import("../pages/JobDetailsPage"));
const NotFound = lazy(() => import("../components/sections/Job/NotFound"));
const EditJobPage = lazy(() => import("../pages/EditJobPage"));
const AddJobPage = lazy(() => import("../pages/AddJobPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));

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
          { index: true, element: <BrowseJobsPage /> },

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
      { path: "manage-bookings", element: <ManageBookingPage /> },
      { path: "add-job", element: <AddJobPage /> },
      { path: "careers", element: <JobsPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
