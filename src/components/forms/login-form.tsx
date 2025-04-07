import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginDto, loginSchema } from "@/services/users/dto/login.dto";
import { Link, Route, useRouter } from "@tanstack/react-router";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { loginUser } from "@/services/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PasswordInput } from "../ui/input-password";
import { Separator } from "../ui/separator";
import { SubmitButton } from "../ui/submit-button";

export function LoginForm({
  Route,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  Route: Route;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const search = Route.useSearch();

  const { login } = useAuth();

  const form = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginDto) {
    setLoading(true);
    form.clearErrors();

    try {
      const response = await loginUser(values);
      login(response.accessToken, response.user);
      router.navigate({ to: search.redirect || "/" });
    } catch (error: any) {
      let errorMessage = "An unexpected error occurred";

      if (error.response?.errors?.[0]?.message) {
        errorMessage = error.response.errors[0].message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      form.setError("root", {
        type: "manual",
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input id="username" type="text" required {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput id="password" required {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {form.formState.errors.root && (
                <div className="font-medium text-destructive text-sm">
                  {form.formState.errors.root.message}
                </div>
              )}

              <SubmitButton
                type="submit"
                className="w-full"
                isSubmitting={loading}
                submittingText="Logging in..."
              >
                Login
              </SubmitButton>
            </form>
          </Form>

          <Separator className="my-4" />

          <Button variant="outline" className="w-full" disabled>
            Login with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
