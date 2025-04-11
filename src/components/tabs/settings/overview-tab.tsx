import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OverviewTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>
          This is the overview tab. It contains general information about your
          account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Here you can find general information about your account.</p>
        <p className="font-semibold">More details will be added soon.</p>
      </CardContent>
    </Card>
  );
}
