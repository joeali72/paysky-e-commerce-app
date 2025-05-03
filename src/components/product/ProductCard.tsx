import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Product } from "@/types/product.model";
import useCartStore from "@/modules/product/store/cartStore";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);

    toast({
      title: "Added to cart",
      description: `${product.title.substring(0, 30)}... added to your cart`,
    });
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg group">
        <CardContent className="p-3">
          <div className="relative mb-2">
            <Badge variant="secondary" className="absolute top-2 left-2 z-10">
              {product.category}
            </Badge>
            <AspectRatio ratio={1 / 1} className="bg-gray-100 rounded-md">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              />
            </AspectRatio>
          </div>

          <div className="space-y-2 mt-3">
            <h3 className="font-medium line-clamp-2 text-base h-12">
              {product.title}
            </h3>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <span className="text-yellow-500">★</span>
                <span className="text-sm">{product.rating.rate}</span>
                <span className="text-xs text-muted-foreground">
                  ({product.rating.count})
                </span>
              </div>
              <span className="font-semibold text-primary">
                ${product.price.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-3 pt-0 gap-2">
          <Button
            variant="default"
            size="sm"
            className="w-full"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
