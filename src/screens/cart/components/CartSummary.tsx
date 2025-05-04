import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import useAuthStore from "@/screens/auth/store/authStore";
import useCartStore from "@/store/useCartStore";

type Props = {
  subtotal: number;
  shipping: number;
  total: number;
};

const CartSummary: React.FC<Props> = ({ subtotal, shipping, total }) => {
  const navigate = useNavigate();
  const { items } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to complete your purchase",
        variant: "destructive",
      });
      navigate("/login", { state: { returnUrl: "/checkout" } });
      return;
    }

    navigate("/checkout");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>

        {shipping > 0 && (
          <div className="text-xs text-muted-foreground">
            Free shipping on orders over $50
          </div>
        )}

        <Separator />

        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-primary border-secondary text-secondary transition-all duration-150 ease-in-out hover:bg-secondary hover:text-primary hover:border-primary"
          size="lg"
          onClick={handleCheckout}
          disabled={items.length === 0}
        >
          {isAuthenticated ? "Proceed to Checkout" : "Login to Checkout"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CartSummary;
