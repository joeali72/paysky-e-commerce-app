import ProductList from "@/components/product/ProductList";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Products() {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Products</h2>
          <Button
            variant="outline"
            asChild
            className="text-primary transition-all ease-in-out duration-150 hover:bg-primary hover:text-white"
          >
            <Link to="/products">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <ProductList />
      </div>
    </section>
  );
}
