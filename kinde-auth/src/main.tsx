import { KindeProvider } from '@kinde-oss/kinde-auth-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Dashboard from './pages/Dashboard.tsx';
import Home from './pages/Home.tsx';
import ProtectedRoute from './pages/ProtectedRoute.tsx';
import RootLayout from './pages/RootLayout.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <KindeProvider
      clientId="1dac60cc4ab84caf8b28e1123498ba3f"
      domain="https://bytegradcc.kinde.com"
      redirectUri="http://localhost:5173"
      logoutUri="http://localhost:5173"
    >
      <RouterProvider router={router} />
    </KindeProvider>
  </React.StrictMode>
);