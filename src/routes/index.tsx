import React, { Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";

import Header from "@/components/layout/Header";
import { Toaster } from "@/components/ui/toaster";

import HomePage from "@/pages/HomePage";
const LoginPage = React.lazy(() => import("@/pages/auth/LoginPage"));
import useAuthStore from "@/modules/auth/store/authStore";
import { Loader } from "@/components/ui/loader";

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated && window.location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && window.location.pathname === " /login") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Layout component with header
const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader message="Loading..." />}>
              <LoginPage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

// App component with providers
const Routes: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Routes;
