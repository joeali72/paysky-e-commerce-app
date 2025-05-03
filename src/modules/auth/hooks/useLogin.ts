import { useLoginAPI } from "../resources/useAuth";
import useLoginSchema from "@/modules/schema/useLoginSchema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useGetUserProfile } from "../resources/useGetUserProfile";
import useAuthStore from "../store/authStore";

export default function useLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isPending: isPendingLogin, mutate: mutateLogin } = useLoginAPI();
  const { refetch: refetchUserProfile } = useGetUserProfile();
  const { loginSchema } = useLoginSchema();
  const { login } = useAuthStore();

  const returnUrl =
    (location.state as { returnUrl?: string })?.returnUrl || "/";

  type FormData = z.infer<typeof loginSchema>;

  const loginForm = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: undefined,
      password: undefined,
    },
  });

  const onSubmit = async (data: FormData) => {
    mutateLogin(data, {
      onSuccess(response) {
        localStorage.setItem("token", response?.data?.token);
        refetchUserProfile().then((userResponse) => {
          if (userResponse?.data) {
            login(response?.data?.token, userResponse?.data);
            toast({
              title: "Login successful",
              description: "Welcome back!",
            });
            navigate(returnUrl);
          }
        });
      },
      onError() {
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again",
          variant: "destructive",
        });
      },
    });
  };

  return { loginForm, isPendingLogin, onSubmit, };
}
