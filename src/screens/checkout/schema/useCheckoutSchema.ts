import { z } from "zod";

export default function useCheckoutSchema() {
  const checkoutSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
    zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
  });

  return { checkoutSchema };
}
