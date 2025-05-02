import api from "@/lib/api-service";
import { useMutationWrapper } from "@/lib/use-api-wrapper";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { LoginCredentials, LoginResponse } from "../types/auth.model";

const endpoint = "/auth/login";

type ReturnType = UseMutationResult<
  AxiosResponse<LoginResponse>,
  AxiosError,
  LoginCredentials
>;
export function useLoginAPI(): ReturnType {
  const mutationFn = async (
    body: LoginCredentials
  ): Promise<AxiosResponse<LoginResponse>> => {
    const response = await api.post<LoginResponse>(endpoint, body);
    return response; // Ensure we return the full Axios response
  };

  return useMutationWrapper(mutationFn, { mutationKey: [endpoint] });
}
