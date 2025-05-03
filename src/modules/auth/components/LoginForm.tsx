import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useLogin from "../hooks/useLogin";

export default function LoginForm() {
  const { isPendingLogin, loginForm, onSubmit } = useLogin();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={loginForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-start">Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-start">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full mt-4"
              disabled={isPendingLogin}
            >
              {isPendingLogin ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-sm text-muted-foreground">
          For testing, use: <code>username: mor_2314, password: 83r5^_</code>
        </p>
      </CardFooter>
    </Card>
  );
}
