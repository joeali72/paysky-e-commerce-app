import api from "@/lib/api-service";
import { useQueryWrapper } from "@/lib/use-api-wrapper";
import { UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { User } from "../types/auth.model";

const endpoint = "/users/1";

type ReturnType = UseQueryResult<User, AxiosError>;

export function useGetUserProfile(): ReturnType {
  const queryFn = async () => {
    const { data } = await api.get<User>(endpoint); // Specifying IData ensures proper typing for the response.
    return data;
  };

  // Wrap the endpoint in an array to satisfy the QueryKey type.
  return useQueryWrapper([endpoint], queryFn, { enabled: false });
}
