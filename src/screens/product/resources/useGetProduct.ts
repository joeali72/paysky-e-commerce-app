import api from "@/lib/api-service";
import { useQueryWrapper } from "@/lib/use-api-wrapper";
import { Product } from "@/types/product.model";
import { UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

const endpoint = (id: number) => `/products/${id}`;

type ReturnType = UseQueryResult<Product, AxiosError>;

export function useGetProduct(id: number): ReturnType {
  const queryFn = async () => {
    const { data } = await api.get<Product>(endpoint(id)); // Specifying IData ensures proper typing for the response.
    return data;
  };

  // Wrap the endpoint in an array to satisfy the QueryKey type.
  return useQueryWrapper([endpoint(id)], queryFn, { enabled: !!id });
}
