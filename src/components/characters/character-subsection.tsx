import { RGBColor } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  value: string | number | boolean | RGBColor;
}

export default function CharacterSubsection({ title, value }: Props) {
  return (
    <section className="my-1 flex min-w-[200px] flex-col items-start rounded-lg border border-secondary/30 shadow-sm">
      <h3 className="p-2 font-bold text-2xl text-foreground">{title}</h3>
      <div className="flex w-full flex-col items-start justify-start bg-secondary/10 p-2">
        {getValueComponent(value)}
      </div>
    </section>
  );
}

function getValueComponent(value: string | number | boolean | RGBColor) {
  if (typeof value === "string") {
    return <p className="h-8 text-lg">{value}</p>;
  } else if (typeof value === "number") {
    return <p className="h-8 text-lg">{value}</p>;
  } else if (typeof value === "boolean") {
    return <p className="h-8 text-lg">{value ? "Yes" : "No"}</p>;
  } else if (typeof value === "object") {
    return (
      <div
        className="h-8 w-full rounded-md"
        style={{ backgroundColor: `rgb(${value.r}, ${value.g}, ${value.b})` }}
      >
        <p
          className={cn(
            "text-center font-semibold text-lg",
            value.r > 128 || value.g > 128 || value.b > 128
              ? "text-black"
              : "text-white",
          )}
        >{`${value.r}, ${value.g}, ${value.b}`}</p>
      </div>
    );
  }
}
