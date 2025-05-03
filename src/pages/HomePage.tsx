import React from "react";
import Hero from "@/modules/home/components/Hero";
import Categories from "@/modules/home/components/Categories";
import Products from "@/modules/home/components/Products";

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
