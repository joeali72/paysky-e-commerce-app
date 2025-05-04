import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartItem } from "@/types/cart.model";
import { Separator } from '@/components/ui/separator';

type Props = {
  items: CartItem[];
  subtotal: number;
  total: number;
  shipping: number;
};

export default function CheckoutSummary({
  items,
  total,
  subtotal,
  shipping,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.product.id} className="flex flex-wrap -mx-2">
            <div className="w-4/6 md:w-4/5 px-2">
              <p className="font-medium truncate" title={item.product.title}>
                {item.product.title}
              </p>
              <p className="text-sm text-muted-foreground">
                Qty: {item.quantity}
              </p>
            </div>
            <p className="w-4/12 md:w-1/5 px-2">
              ${(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}

        <Separator className="my-4" />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>

          <Separator className="my-2" />

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
