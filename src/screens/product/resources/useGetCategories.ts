import api from "@/lib/api-service";
import { useQueryWrapper } from "@/lib/use-api-wrapper";
import { UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

const endpoint = "/products/categories";

type ReturnType = UseQueryResult<string[], AxiosError>;

export function useGetCategories(): ReturnType {
  const queryFn = async () => {
    const { data } = await api.get<string[]>(endpoint); // Specifying IData ensures proper typing for the response.
    return data;
  };

  // Wrap the endpoint in an array to satisfy the QueryKey type.
  return useQueryWrapper([endpoint], queryFn);
}
