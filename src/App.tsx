import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import RootLayout from "./layout/RootLayout";
import { RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
    </Route>,
  ),
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <p>App</p>
    </>
  );
}

export default App;
