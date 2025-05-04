import LoginForm from "@/screens/auth/components/LoginForm";
import React from "react";

const LoginPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to Paysky</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
