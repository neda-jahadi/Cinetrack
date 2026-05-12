import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import { lazy } from "react";
import BrowseJobsPage from "../pages/BrowseJobsPage";
import ProfilePage from "../pages/ProfilePage";
import BusinessAccountPage from "../pages/BusinessAccountPage";
import RegisterCompanyPage from "../pages/RegisterCompanyPage";
import RequireAuth from "./RequireAuth";
import GuestOnly from "./GuestOnly";
import RequireCompany from "./RequireCompany";
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
        element: <GuestOnly />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "signup",
            element: <RegisterPage />,
          },
          {
            path: "/business/signup",
            element: <RegisterPage />,
            handle: { crumb: () => ({ label: "Signup" }) },
          },
        ],
      },
      {
        element: <RequireCompany />,
        children: [
          {
            path: "jobs/edit-job/:id",
            element: <EditJobPage />,
            handle: { crumb: () => ({ label: "Edit" }) },
          },
          {
            path: "jobs/add-job",
            element: <AddJobPage />,
            handle: { crumb: () => ({ label: "Add Job" }) },
          },
        ],
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: "profile",
            element: <ProfilePage />,
            handle: { crumb: () => ({ label: "Profile" }) },
          },
          {
            path: "business/register-company",
            element: <RegisterCompanyPage />,
            handle: { crumb: () => ({ label: "Create Company" }) },
          },
        ],
      },
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
        ],
      },
      { path: "careers", element: <JobsPage /> },
      {
        path: "business",
        element: <BusinessAccountPage />,
        handle: {
          crumb: () => ({ to: "/business", label: "Business Account" }),
        },
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
