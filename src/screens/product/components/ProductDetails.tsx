import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ShoppingCart, Loader2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import Quantity from "@/components/Quantity";
import useAuthStore from "@/screens/auth/store/authStore";
import { useGetProduct } from "../resources/useGetProduct";
import Back from "@/components/Back";
import useCartStore from "@/store/useCartStore";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const { data: product, isLoading, error } = useGetProduct(Number(id));

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);

      toast({
        title: "Added to cart",
        description: `${quantity} × ${product.title} added to your cart`,
      });
    }
  };

  const handleBuyNow = () => {
    if (product) {
      if (!isAuthenticated) {
        toast({
          title: "Authentication required",
          description: "Please login to checkout",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      addItem(product, quantity);
      navigate("/cart");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-20">
        <p className="text-destructive">
          Error loading product. Please try again later.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => navigate("/products")}
        >
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <Back />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="flex justify-center bg-white p-8 rounded-lg border border-gray-100">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-w-md h-auto object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold">{product.title}</h1>

            <div className="flex items-center space-x-2 mt-2">
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-current"
                    fill={
                      i < Math.round(product.rating.rate)
                        ? "currentColor"
                        : "none"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.rating.count} reviews)
              </span>
            </div>
          </div>

          <div className="text-3xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="space-y-4">
            <Quantity
              product={product}
              quantity={quantity}
              setQuantity={setQuantity}
            />

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 transition-all duration-150 ease-in-out hover:bg-secondary hover:text-primary hover:border-primary"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="secondary"
                onClick={handleBuyNow}
                className="flex-1 transition-all duration-150 ease-in-out hover:bg-primary hover:text-secondary hover:border-secondary"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
