import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui-custom/submit-button";
import { toast } from "sonner";
import { updateProfile } from "@/services/profile";
import useAuth from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string()
    .min(1, { message: "This field is required." })
    .email("This is not a valid email."),
  avatar: z.string().optional(),
});

export default function ProfileTab() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: user?.username,
      email: user?.email,
      avatar: user?.profile.avatar,
    },
  });

  async function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    setLoading(true);
    try {
      // Create an object with only the changed fields
      const updatedFields: Partial<z.infer<typeof profileFormSchema>> = {};

      if (values.username !== user?.username) {
        updatedFields.username = values.username;
      }

      if (values.email !== user?.email) {
        updatedFields.email = values.email;
      }

      if (values.avatar !== user?.profile.avatar) {
        updatedFields.avatar = values.avatar;
      }

      if (Object.keys(updatedFields).length === 0) {
        // Check if there are no changes
        toast.info("No changes to save");
        setLoading(false);
        return;
      }

      console.log("Sending only changed fields:", updatedFields);

      const resp = await updateProfile(updatedFields);

      if (resp) {
        toast.success("Profile updated successfully!");
        console.log("Profile updated successfully:", resp);

        if (resp.email !== user?.email) {
          toast.success("Please verify your new email address.", {
            description:
              "A verification email has been sent to your new email address.",
          });
        }

        // Update the user with the response data
        if (user) {
          setUser({
            ...user,
            username: resp.username,
            email: resp.email,
            emailVerified: resp.emailVerified,
            profile: {
              ...user.profile,
              avatar: resp.avatar,
              // Make sure the id is preserved from the existing profile
              id: user.profile.id,
              userId: user.profile.userId,
            },
          });
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Update your profile information and how others see you on the
          platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onProfileSubmit)}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.profile.avatar} alt="Profile" />
                <AvatarFallback>
                  {user?.username
                    ? user.username.charAt(0).toUpperCase()
                    : "JD"}
                </AvatarFallback>
              </Avatar>
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Avatar URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/avatar.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter a URL to your avatar image.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
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
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Your email address is used for notifications.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <SubmitButton type="submit" isSubmitting={loading}>
              Save changes
            </SubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
