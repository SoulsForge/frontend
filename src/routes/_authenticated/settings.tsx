import {
  Settings2Icon,
  ShieldUserIcon,
  TriangleAlertIcon,
  UserIcon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createFileRoute, useRouter } from "@tanstack/react-router";

import DangerTab from "@/components/tabs/settings/danger-tab";
import OverviewTab from "@/components/tabs/settings/overview-tab";
import PassowrdTab from "@/components/tabs/settings/password-tab";
import ProfileTab from "@/components/tabs/settings/profile-tab";
import { z } from "zod";

const settingsSearchSchema = z.object({
  tab: z.enum(["overview", "profile", "password", "danger"]).optional(),
});

export const Route = createFileRoute("/_authenticated/settings")({
  component: RouteComponent,
  validateSearch: settingsSearchSchema,
});

function RouteComponent() {
  const router = useRouter();

  const { tab } = Route.useSearch();

  return (
    <section className="size-full flex flex-col justify-center space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <Tabs
        defaultValue={tab || "overview"}
        className="flex flex-col gap-2.5 w-full"
        onValueChange={(value) => {
          router.navigate({
            to: ".",
            search: {
              tab: value as z.infer<typeof settingsSearchSchema>["tab"],
            },
          });
        }}
      >
        <TabsList className="grid w-full h-full md:grid-cols-4 grid-cols-2 gap-2">
          <TabsTrigger className="w-full" value="overview">
            <Settings2Icon className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger className="w-full" value="profile">
            <UserIcon className="h-4 w-4" />
            Profile
          </TabsTrigger>

          <TabsTrigger className="w-full" value="password">
            <ShieldUserIcon className="h-4 w-4" />
            Password and Security
          </TabsTrigger>

          <TabsTrigger className="w-full" value="danger">
            <TriangleAlertIcon className="h-4 w-4" />
            Danger Zone
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="profile">
          <ProfileTab />
        </TabsContent>

        <TabsContent value="password">
          <PassowrdTab />
        </TabsContent>

        <TabsContent value="danger">
          <DangerTab />
        </TabsContent>
      </Tabs>
    </section>
  );
}
