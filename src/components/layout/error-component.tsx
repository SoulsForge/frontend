import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { ErrorComponentProps, Link, useRouter } from "@tanstack/react-router";

import { AlertTriangleIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function ErrorComponent({
  error,
}: { error: ErrorComponentProps }) {
  const router = useRouter();
  const isDev = process.env.NODE_ENV === "development";

  const networkError = error.error.message.includes("NetworkError");
  const isOffline = navigator.onLine === false;

  const isOfflineError = networkError && isOffline;
  const isServerError = networkError && !isOffline;

  if (isOfflineError) {
    return (
      <div className="flex size-full flex-col items-center justify-center self-center p-2 text-2xl flex-grow">
        <div className="w-full max-w-md">
          <Alert variant="destructive">
            <AlertTriangleIcon className="size-4" />
            <AlertTitle>Ooops! You are offline</AlertTitle>
            <AlertDescription>
              Please check your internet connection and try again.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  if (isServerError) {
    return (
      <div className="flex size-full flex-col items-center justify-center self-center p-2 text-2xl flex-grow">
        <div className="w-full max-w-md">
          <Alert variant="destructive">
            <AlertTriangleIcon className="size-4" />
            <AlertTitle>Ooops! Server error</AlertTitle>
            <AlertDescription>
              We&apos;re sorry, but we encoutered an unexpected error.
              <br />
              Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }
  

  return (
    <div className="flex size-full flex-col items-center justify-center self-center p-2 text-2xl flex-grow">
      <div className="w-full max-w-md">
        <Alert variant="destructive">
          <AlertTriangleIcon className="size-4" />
          <AlertTitle>Ooops! Something went wrong</AlertTitle>
          <AlertDescription>
            We&apos;re sorry, but we encoutered an unexpected error.
          </AlertDescription>
        </Alert>

        <div className="mt-4 space-y-4">
          <Button
            className="w-full"
            onClick={() => {
              router.invalidate();
            }}
          >
            Try again
          </Button>
          <Button className="w-full" variant="outline" asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
      {isDev ? (
        <div className="mt-4 w-full max-w-5xl">
          <Accordion type="single" className="w-full" collapsible>
            <AccordionItem value="error-details">
              <AccordionTrigger>View Error details</AccordionTrigger>
              <AccordionContent>
                <div className="relative rounded-md bg-muted p-4">
                  <h3 className="mb-2 font-semibold">Error message:</h3>
                  <p className="mb-4 text-sm">{error.error.message}</p>

                  <h3 className="mb-2 font-semibold">Stack trace:</h3>
                  <pre className="whitespace-pre-wrap text-sm">
                    {error.error.stack}
                  </pre>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ) : null}
    </div>
  );
}
