import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../components/layouts/RootLayout';
import { lazy } from 'react';
import BrowseJobsPage from '../pages/job/BrowseJobsPage';
import ProfilePage from '../pages/ProfilePage';
import BusinessAccountPage from '../pages/company/BusinessAccountPage';
import RegisterCompanyPage from '../pages/company/RegisterCompanyPage';
import RequireAuth from './RequireAuth';
import GuestOnly from './GuestOnly';
import RequireCompany from './RequireCompany';
import { AdminDashboardPage } from '@/pages/AdminDashboardPage';
import RequireAdmin from './RequireAdmin';
const HomePage = lazy(() => import('../pages/HomePage'));
const JobDetailsPage = lazy(() => import('../pages/job/JobDetailsPage'));
const NotFound = lazy(() => import('../pages/NotFound'));
const EditJobPage = lazy(() => import('../pages/job/EditJobPage'));
const AddJobPage = lazy(() => import('../pages/job/AddJobPage'));
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    handle: { crumb: () => ({ to: '/', label: 'Home' }) },
    children: [
      { index: true, element: <HomePage /> },
      {
        element: <GuestOnly />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'signup',
            element: <RegisterPage />,
          },
          {
            path: '/business/signup',
            element: <RegisterPage />,
            handle: { crumb: () => ({ label: 'Signup' }) },
          },
        ],
      },
      {
        element: <RequireCompany />,
        children: [
          {
            path: 'jobs/edit-job/:id',
            element: <EditJobPage />,
            handle: { crumb: () => ({ label: 'Edit' }) },
          },
          {
            path: 'jobs/add-job',
            element: <AddJobPage />,
            handle: { crumb: () => ({ label: 'Add Job' }) },
          },
        ],
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: 'profile',
            element: <ProfilePage />,
            handle: { crumb: () => ({ label: 'Profile' }) },
          },
          {
            path: 'business/register-company',
            element: <RegisterCompanyPage />,
            handle: { crumb: () => ({ label: 'Create Company' }) },
          },
        ],
      },
      {
        element: <RequireAdmin />,
        children: [
          {
            path: 'admin-dashboard',
            element: <AdminDashboardPage />,
            handle: { crumb: () => ({ label: 'Admin Dashboard' }) },
          },
        ],
      },
      {
        path: 'jobs',
        handle: { crumb: () => ({ to: '/jobs', label: 'Jobs' }) },
        children: [
          { index: true, element: <BrowseJobsPage /> },

          {
            path: ':id',
            element: <JobDetailsPage />,
            errorElement: <NotFound />,
            handle: { crumb: () => ({ label: 'Job' }) },
          },
        ],
      },
      {
        path: 'business',
        element: <BusinessAccountPage />,
        handle: {
          crumb: () => ({ to: '/business', label: 'Business Account' }),
        },
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
