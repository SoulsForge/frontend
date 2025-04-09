import { Button, type ButtonProps } from "../ui/button";

import { cn } from "@/lib/utils";
import { LoaderCircleIcon } from "lucide-react";

export function SubmitButton({
  children,
  isSubmitting,
  submittingText = "Loading...",
  ...props
}: {
  children: React.ReactNode;
  isSubmitting: boolean;
  submittingText?: string;
} & ButtonProps) {
  return (
    <Button
      disabled={isSubmitting}
      {...props}
      className={cn("relative", props.className)}
    >
      <span className={cn({ "opacity-0": isSubmitting })}>{children}</span>

      {isSubmitting && (
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 flex items-center gap-2">
          <LoaderCircleIcon className="size-4 animate-spin" />
          <span className="">{submittingText}</span>
        </div>
      )}
    </Button>
  );
}
