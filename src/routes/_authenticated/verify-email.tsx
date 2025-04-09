import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Link, createFileRoute, useRouter } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SubmitButton } from "@/components/ui/submit-button";
import { setAuthorization } from "@/lib/clients/graphql";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { verifyEmail } from "@/services/users";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Search = z.object({
  code: z.coerce.string().optional(),
  redirect: z.string().optional(),
  token: z.string().optional(),
});

export const Route = createFileRoute("/_authenticated/verify-email")({
  validateSearch: (search) => Search.parse(search),
  component: RouteComponent,
});

const verifyCodeSchema = z.object({
  code: z.coerce.string().length(6, {
    message: "Code must be exactly 6 characters long",
  }),
});

function RouteComponent() {
  const { code, redirect, token } = Route.useSearch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof verifyCodeSchema>>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: code || "",
    },
  });

  async function onSubmit(values: z.infer<typeof verifyCodeSchema>) {
    setLoading(true);

    form.clearErrors();
    try {
      await sendVerificationCode(values.code);
    } catch (e) {
      toast.error("An error occurred while verifying the email.", {
        description: `${e}`,
      });
    } finally {
      setLoading(false);
    }
  }

  async function onResend() {
    toast.info("Resending verification email...");
  }

  async function sendVerificationCode(code: string) {
    const promise = verifyEmail(code);

    if (token) {
      setAuthorization(token);
    }

    toast.promise(promise, {
      loading: "Verifying email...",
      success: (data) => {
        if (redirect) {
          router.navigate({ to: redirect });
        } else {
          router.navigate({ to: "/sliders" });
        }
      },
      error: (error) => {
        setError(error.message);
        return "An error occurred while verifying the email.";
      },
    });
  }

  return (
    <section className="mx-auto mt-auto mb-auto w-full max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Please verify your email address to continue.
          </CardTitle>
          <CardDescription className="flex flex-col gap-2">
            <p>You must verify your email address to access this page.</p>
            <p>
              We have sent you an email with a verification link. Please check
              your inbox and click on the link to verify your email address.
            </p>
            <p>
              If you haven&apos;t received the email, please check your spam
              folder or click the button below to resend the verification email.
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        className="w-full"
                        containerClassName="justify-center w-full"
                        {...field}
                      >
                        <InputOTPGroup className="w-full">
                          {Array.from({ length: 6 }, (_, index) => (
                            <InputOTPSlot
                              key={index}
                              index={index}
                              className="text-center w-1/6"
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col justify-center">
                <SubmitButton isSubmitting={loading} type="submit">
                  Verify Email
                </SubmitButton>
                {!code && (
                  <>
                    <Separator className="my-4" />
                    {/* <Button
                      type="button"
                      variant="outline"
                      className="mt-2"
                      onClick={onResend}
                    >
                      Resend Verification Email
                    </Button> */}
                    <Button variant="destructive" className="mt-2" asChild>
                      <Link to="/logout">Logout</Link>
                    </Button>
                  </>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
