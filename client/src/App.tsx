import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { Suspense } from "react";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <Suspense fallback={<div>Loading ...</div>}>
            <RouterProvider router={router} />
          </Suspense>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
