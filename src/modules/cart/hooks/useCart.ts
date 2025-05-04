import { toast } from "@/hooks/use-toast";
import useCartStore from "../store/useCartStore";
import { Product } from "@/types/product.model";

export default function useCart() {
  const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 10;
  const total = subtotal + shipping;

  const handleQuantityChange = (
    delta: number,
    product: Product,
    quantity: number,
    setQuantity: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const newQuantity = quantity + delta;

    if (newQuantity < 1) {
      removeItem(product.id);
      toast({
        title: "Item removed",
        description: `${product.title} was removed from your cart`,
      });
      return;
    }

    updateQuantity(product.id, newQuantity);
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleRemove = (product: Product) => {
    removeItem(product.id);
    toast({
      title: "Item removed",
      description: `${product.title} was removed from your cart`,
    });
  };

  return { subtotal, shipping, total, handleQuantityChange, handleRemove, items };
}
