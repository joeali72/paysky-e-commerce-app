import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import useCartStore from "@/modules/product/store/cartStore";
import useAuthStore from "@/modules/auth/store/authStore";
import CheckoutSummary from "@/modules/checkout/components/CheckoutSummary";
import useCart from "@/modules/cart/hooks/useCart";
import CheckoutForm from "@/modules/checkout/components/CheckoutForm";
import useCheckoutSchema from "@/modules/checkout/schema/useCheckoutSchema";

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { clearCart } = useCartStore();
  const { items, subtotal, total, shipping } = useCart();
  const { isAuthenticated, user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { checkoutSchema } = useCheckoutSchema();
  type CheckoutFormData = z.infer<typeof checkoutSchema>;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { returnUrl: "/checkout" } });
      return;
    }

    if (items.length === 0) {
      navigate("/cart");
      return;
    }
  }, [isAuthenticated, items.length, navigate]);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: user?.name.firstname || "",
      lastName: user?.name.lastname || "",
      email: user?.email || "",
      address: "",
      city: "",
      zipCode: "",
      phone: "",
    },
  });

  const onSubmit = async (_data: CheckoutFormData) => {
    setIsSubmitting(true);

    try {
      // In a real app, this would send the order to a backend
      await new Promise((resolve) => setTimeout(resolve, 1500));

      clearCart();
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase.",
      });
      navigate("/");
    } catch (_error) {
      toast({
        title: "Error placing order",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated || items.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <CheckoutForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
              </Form>
            </CardContent>
          </Card>
        </div>

        <div>
          <CheckoutSummary
            items={items}
            subtotal={subtotal}
            total={total}
            shipping={shipping}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
