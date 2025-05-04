import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/types/cart.model";
import Quantity from "@/components/Quantity";
import { Product } from "@/types/product.model";

interface CartItemProps {
  item: CartItemType;
  handleRemove?: (product: Product) => void;
  handleQuantityChange?: (
    delta: number,
    product: Product,
    quantity: number,
    setQuantity: React.Dispatch<React.SetStateAction<number>>
  ) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  handleRemove,
  handleQuantityChange,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b">
      <div className="flex-shrink-0 w-full sm:w-24 h-24 bg-white p-2 rounded-md border mb-4 sm:mb-0 sm:mr-4">
        <img
          src={item.product.image}
          alt={item.product.title}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex-grow min-w-0">
        <h3 className="font-medium text-base line-clamp-1">
          {item.product.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">
          {item.product.category}
        </p>

        <div className="flex items-center justify-between">
          <Quantity
            product={item?.product}
            quantity={quantity}
            setQuantity={setQuantity}
            handleCartQuantityChange={handleQuantityChange}
          />
          <div className="font-semibold">
            ${(item.product.price * quantity).toFixed(2)}
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleRemove?.(item.product)}
        className="ml-2 size-8 text-white p-1 transition-all duration-150 ease-in-out hover:bg-secondary hover:text-primary hover:border-primary"
      >
        <X className="size-5" />
      </Button>
    </div>
  );
};

export default CartItem;
