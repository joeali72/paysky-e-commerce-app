import api from "@/lib/api-service";
import { useQueryWrapper } from "@/lib/use-api-wrapper";
import { Product } from "@/types/product.model";
import { UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

const endpoint = (category?: string) =>
  category ? `/products/category/${category}` : "/products";

type ReturnType = UseQueryResult<Product[], AxiosError>;

export function useGetProducts(
  category?: string,
  enabled?: boolean
): ReturnType {
  const queryFn = async () => {
    const { data } = await api.get<Product[]>(endpoint(category)); // Specifying IData ensures proper typing for the response.
    return data;
  };

  // Wrap the endpoint in an array to satisfy the QueryKey type.
  return useQueryWrapper([endpoint(category)], queryFn, {
    enabled: enabled ?? false,
  });
}
