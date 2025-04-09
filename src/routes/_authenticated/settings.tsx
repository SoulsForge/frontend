import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import OverviewTab from "@/components/tabs/settings/overview-tab";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Tabs defaultValue="overview" className="flex flex-col gap-2.5 w-full">
      <TabsList className="">
        <TabsTrigger className="w-full" value="overview">
          Overview
        </TabsTrigger>
        <TabsTrigger className="w-full" value="profile">
          Profile
        </TabsTrigger>
        <TabsTrigger className="w-full" value="connections">
          Connections
        </TabsTrigger>
        <TabsTrigger className="w-full" value="sessions">
          Sessions
        </TabsTrigger>
        <TabsTrigger className="w-full" value="danger">
          Danger Zone
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <OverviewTab />
      </TabsContent>

      <TabsContent value="profile"></TabsContent>

      <TabsContent value="connections"></TabsContent>

      <TabsContent value="sessions"></TabsContent>

      <TabsContent value="danger"></TabsContent>
    </Tabs>
  );
}
