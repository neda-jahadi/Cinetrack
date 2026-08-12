import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Suspense } from 'react';
import { ThemeProvider } from './context/ThemeProvider';
import { AuthProvider } from './context/AuthProvider';

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
