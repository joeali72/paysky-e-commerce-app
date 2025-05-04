import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Product } from "@/types/product.model";
import useCartStore from "@/store/useCartStore";

type Props = {
  product?: Product;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  handleCartQuantityChange?: (
    delta: number,
    product: Product,
    quantity: number,
    setQuantity: React.Dispatch<React.SetStateAction<number>>
  ) => void;
};

export default function Quantity({
  product,
  quantity,
  setQuantity,
  handleCartQuantityChange,
}: Props) {
  const { items } = useCartStore();

  useEffect(() => {
    if (product && setQuantity) {
      setQuantity(
        items?.find((item) => +item?.product?.id === Number(product?.id))
          ?.quantity ?? 1
      );
    }
  }, [product, items, setQuantity]);

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm font-medium">Quantity:</span>
      <div className="flex items-center border rounded-md">
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            handleCartQuantityChange
              ? handleCartQuantityChange(-1, product!, quantity, setQuantity)
              : handleQuantityChange(-1)
          }
          disabled={quantity <= 1}
          className="p-1 size-8 text-white transition-all duration-150 ease-in-out hover:bg-white hover:text-primary hover:border-primary"
        >
          <Minus className="size-6" />
        </Button>
        <span className="w-10 text-center">{quantity}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            handleCartQuantityChange
              ? handleCartQuantityChange(1, product!, quantity, setQuantity)
              : handleQuantityChange(1)
          }
          className="p-1 size-8 text-white transition-all duration-150 ease-in-out hover:bg-white hover:text-primary hover:border-primary"
        >
          <Plus className="size-6" />
        </Button>
      </div>
    </div>
  );
}
