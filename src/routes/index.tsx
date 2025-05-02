import React from "react";
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
// import ProductsPage from "@/pages/ProductsPage";
// import ProductDetailsPage from "@/pages/ProductDetailsPage";
// import CartPage from "@/pages/CartPage";
// import LoginPage from "@/pages/LoginPage";
// import CheckoutPage from "@/pages/CheckoutPage";
// import useAuthStore from "@/store/authStore";

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
