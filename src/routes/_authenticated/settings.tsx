import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import DangerTab from "@/components/tabs/settings/danger-tab";
import ProfileTab from "@/components/tabs/settings/profile-tab";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="size-full flex flex-col justify-center space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <Tabs defaultValue="profile" className="flex flex-col gap-2.5 w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger className="w-full" value="profile">
            Profile
          </TabsTrigger>
          {/* <TabsTrigger className="w-full" value="connections">
          Connections
        </TabsTrigger>
        <TabsTrigger className="w-full" value="sessions">
          Sessions
        </TabsTrigger> */}
          <TabsTrigger className="w-full" value="danger">
            Danger Zone
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileTab />
        </TabsContent>

        {/* <TabsContent value="connections"></TabsContent>

      <TabsContent value="sessions"></TabsContent> */}

        <TabsContent value="danger">
          <DangerTab />
        </TabsContent>
      </Tabs>
    </section>
  );
}
