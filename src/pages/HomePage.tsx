import React from "react";
import Hero from "@/screens/home/components/Hero";
import Categories from "@/screens/home/components/Categories";
import Products from "@/screens/home/components/Products";

const HomePage: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <Hero />

      {/* Categories Section */}
      <Categories />

      {/* Featured Products */}
      <Products />
    </div>
  );
};

export default HomePage;
