import { Loader2Icon } from "lucide-react";
import { PropsWithChildren } from "react";

interface LoaderProps extends PropsWithChildren {
  loaded?: boolean;
  message?: string;
}

export default function Loader({
  children,
  loaded = false,
  message,
}: LoaderProps) {
  if (loaded && children) return <>{children}</>;

  return (
    <div className="flex size-full flex-grow flex-col items-center justify-center">
      <Loader2Icon className="animate-spin text-primary" size={48} />
      <p className="font-semibold text-lg text-primary">{message}</p>
    </div>
  );
}
