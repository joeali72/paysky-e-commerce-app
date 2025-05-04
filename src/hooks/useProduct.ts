import useCartStore from "@/store/useCartStore";
import { toast } from "./use-toast";
import { Product } from "@/types/product.model";

export default function useProduct() {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);

    toast({
      title: "Added to cart",
      description: `${product.title.substring(0, 30)}... added to your cart`,
    });
  };

  return { handleAddToCart };
}
