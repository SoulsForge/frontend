import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { FieldValues, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Link, Route, useRouter } from "@tanstack/react-router";
import { RegisterDto, registerSchema } from "@/services/users/dto/register.dto";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PasswordInput } from "../ui/input-password";
import { Separator } from "../ui/separator";
import { SubmitButton } from "../ui-custom/submit-button";
import { capitalize } from "@/lib/string";
import { cn } from "@/lib/utils";
import { registerUser } from "@/services/users";
import { toast } from "sonner";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export function RegisterForm({
  Route,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  Route: Route;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterDto>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterDto) {
    setLoading(true);
    form.clearErrors();

    try {
      const response = await registerUser({
        username: values.username,
        email: values.email,
        password: values.password,
      });

      if (response) {
        toast.success("Registration successful! Please login.");
        router.navigate({ to: "/login" });
      }
    } catch (error: any) {
      form.setError("root", {
        type: "custom",
        message: capitalize(error.message as string),
      });
    } finally {
      setLoading(false);
    }
  }



  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Create an account to access all features and services.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Ensure the Form component wraps all form fields */}
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input id="email" type="email" required {...field} />
                    </FormControl>
                    <FormMessage />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <PasswordInput id="confirmPassword" required {...field} />
                    </FormControl>
                    <FormMessage />
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
                submittingText="Registering..."
              >
                Register
              </SubmitButton>
            </form>
          </Form>

          <Separator className="my-4" />

          <Button variant="outline" className="w-full" disabled>
            Login with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?
            <Button variant="link" className="p-1" asChild>
              <Link to="/login">Sign in</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
