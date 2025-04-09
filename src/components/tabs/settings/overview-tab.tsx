import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function OverviewTab() {
  const form = useForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form>
          <form></form>
        </Form>
      </CardContent>
    </Card>
  );
}
