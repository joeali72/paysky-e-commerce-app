import React from "react";
import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader } from "../ui/loader";
import { useGetProducts } from "@/modules/product/resources/useGetProducts";
import { useGetCategories } from "@/modules/product/resources/useGetCategories";
import ProductCard from "./ProductCard";

const ProductList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "";

  const {
    data: products,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useGetProducts(categoryParam || undefined, true);
  const { data: categories } = useGetCategories();

  const handleCategoryChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.set("category", "");
    } else if (value && value !== "all") {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    setSearchParams(params);
  };

  if (isLoadingProducts) {
    return (
      <div className="min-h-[300px] flex items-center justify-center">
        <Loader message="Loading Products..." />
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="text-center py-20">
        <p className="text-destructive">
          Error loading products. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="ms-auto flex items-center space-x-4">
          <div className="w-48">
            <Select
              value={categoryParam || undefined}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="border-primary focus-visible:ring-primary focus:ring-primary hover:border-primary">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="cursor-pointer">
                  All Categories
                </SelectItem>
                {categories?.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="cursor-pointer"
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[400px]">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products?.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No products found.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
