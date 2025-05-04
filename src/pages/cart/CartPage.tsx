import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartItem from "@/modules/cart/components/CartItem";
import CartSummary from "@/modules/cart/components/CartSummary";
import useCart from "@/modules/cart/hooks/useCart";

const CartPage: React.FC = () => {
  const {
    subtotal,
    shipping,
    total,
    handleQuantityChange,
    handleRemove,
    items,
  } = useCart();

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-16 space-y-6">
          <div className="flex justify-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button
            size="lg"
            asChild
            className="bg-primary text-secondary border-secondary transition-all duration-150 ease-in-out hover:bg-secondary hover:text-primary hover:border-primary"
          >
            <Link to="/products">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              {items.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  handleQuantityChange={handleQuantityChange}
                  handleRemove={handleRemove}
                />
              ))}
            </div>

            <Button
              variant="outline"
              className="mt-4 bg-secondary border-primary text-primary transition-all duration-150 ease-in-out hover:bg-primary hover:text-secondary hover:border-secondary"
              asChild
            >
              <Link to="/products">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>

          <div>
            <CartSummary
              total={total}
              subtotal={subtotal}
              shipping={shipping}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
