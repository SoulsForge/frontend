import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ImageWithSkeletonProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  aspectRatio?: "square" | "video" | "wide" | "portrait" | string;
}

export function Image({
  src,
  alt = "",
  width,
  height,
  containerClassName,
  className,
  aspectRatio = "square",
  ...props
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true);

  const aspectRatioClass =
    aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "video"
        ? "aspect-video"
        : aspectRatio === "wide"
          ? "aspect-[16/9]"
          : aspectRatio === "portrait"
            ? "aspect-[3/4]"
            : aspectRatio;

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        aspectRatioClass,
        containerClassName,
      )}
    >
      {isLoading && (
        <Skeleton className="absolute inset-0 h-full w-full rounded-md" />
      )}
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className,
        )}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
}
