import React from "react";
import ProductList from "@/components/product/ProductList";

const ProductsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <ProductList />
    </div>
  );
};

export default ProductsPage;
