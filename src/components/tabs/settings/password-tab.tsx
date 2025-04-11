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

import { PasswordInput } from "@/components/ui/input-password";
import { SubmitButton } from "@/components/ui-custom/submit-button";
import { toast } from "sonner";
import { updatePassword } from "@/services/users";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
    oldPassword: z.string(),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, oldPassword }, ctx) => {
    if (confirmPassword !== oldPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The new passwords did not match",
        path: ["confirmPassword", "oldPassword"],
      });
    }
  });

export default function PassowrdTab() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      oldPassword: "",
      confirmPassword: "",
    },
  });

  async function onUpdatePasswordSubmit(
    values: z.infer<typeof resetPasswordSchema>,
  ) {
    setLoading(true);

    console.log("Updating password with values:", values);

    try {
      const resp = await updatePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });

      if (!resp) {
        toast.error("Failed to update password.");
        return;
      }

      toast.success("Password updated successfully.");
    } catch (error) {
      toast.error("Failed to update password.");
      console.error("Failed to update password:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Password and Security</CardTitle>
        <CardDescription>
          Update your password and manage your account security settings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onUpdatePasswordSubmit)}
            className="space-y-8 grid gap-6 md:grid-cols-2"
          >
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} id="oldPassword" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <span />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} id="newPassword" />
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
                    <PasswordInput {...field} id="confirmPassword" />
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

            <SubmitButton type="submit" isSubmitting={loading}>
              Update Password
            </SubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
