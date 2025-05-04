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
import useAuthStore from "@/screens/auth/store/authStore";
import { Loader } from "@/components/ui/loader";

import HomePage from "@/pages/HomePage";
import ErrorBoundary from "@/components/ErrorBoundary";
const LoginPage = React.lazy(() => import("@/pages/auth/LoginPage"));
const ProductsPage = React.lazy(() => import("@/pages/products/ProductsPage"));
const ProductDetailsPage = React.lazy(
  () => import("@/pages/products/ProductDetailsPage")
);
const CartPage = React.lazy(() => import("@/pages/cart/CartPage"));
const CheckoutPage = React.lazy(() => import("@/pages/checkout/CheckoutPage"));

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated && window.location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }
  
  if (isAuthenticated && window.location.pathname === "/login") {
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
        <ErrorBoundary
          fallback={<div>Something went wrong while rendering the page.</div>}
        >
          <Outlet />
        </ErrorBoundary>
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
        path: "products",
        element: (
          <Suspense fallback={<Loader message="Loading..." />}>
            <ProductsPage />
          </Suspense>
        ),
      },
      {
        path: "product/:id",
        element: (
          <Suspense fallback={<Loader message="Loading..." />}>
            <ProductDetailsPage />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: (
          <Suspense fallback={<Loader message="Loading..." />}>
            <CartPage />
          </Suspense>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader message="Loading..." />}>
              <CheckoutPage />
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
