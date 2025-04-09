import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui-custom/number-input";
import { RGBColor } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Props {
  title: string;
  value: string | number | boolean | RGBColor;
  values?: string[];
  onChange?: (value: string | number | boolean | RGBColor) => void;
  disabled?: boolean;
  options?: {
    min?: number;
    max?: number;
  };
}

export default function CharacterSubsectionEdit({
  title,
  value,
  values,
  onChange,
  disabled = false,
  options,
}: Props) {
  return (
    <section className="my-1 flex min-w-[200px] flex-col items-start rounded-lg border border-secondary/30 shadow-sm">
      <h3 className="p-2 font-bold text-2xl text-foreground">{title}</h3>
      <div className="flex w-full flex-col items-start justify-start bg-secondary/10 p-2">
        {getValueComponent(value, onChange, values, disabled, options)}
      </div>
    </section>
  );
}

function getValueComponent(
  value: string | number | boolean | RGBColor,
  onChange?: (value: string | number | boolean | RGBColor) => void,
  values?: string[],
  disabled?: boolean,
  options?: {
    min?: number;
    max?: number;
  },
) {
  const [prevValue, setPrevValue] = useState<
    string | number | boolean | RGBColor
  >(value);

  if (typeof value === "string") {
    if (values) {
      return (
        <Select
          disabled={disabled}
          value={value} // Asegúrate de que el valor actual se controle aquí
          onValueChange={(newValue) => onChange?.(newValue)}
        >
          <SelectTrigger className={cn("w-full")}>
            <SelectValue placeholder="Select a value" />
          </SelectTrigger>
          <SelectContent className={cn("w-full")}>
            <SelectGroup>
              {values.map((val) => (
                <SelectItem key={val} value={val}>
                  {val}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    }

    return (
      <Input
        type="text"
        disabled={disabled}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          "w-full rounded-lg border border-secondary/30 p-2 shadow-sm",
        )}
      />
    );
  } else if (typeof value === "number") {
    return (
      <Input
        type="number"
        disabled={disabled}
        value={value}
        onChange={(e) => {
          const newValue = parseFloat(e.target.value);
          setPrevValue(newValue);
          onChange?.(newValue);
        }}
        onBlur={(e) => {
          const newValue = parseFloat(e.target.value || "0");
          setPrevValue(newValue);
          onChange?.(newValue);
        }}
        className={cn(
          "w-full rounded-lg border border-secondary/30 p-2 shadow-sm",
        )}
        min={options?.min}
        max={options?.max}
      />
    );
  } else if (typeof value === "boolean") {
    return (
      <Input
        type="checkbox"
        disabled={disabled}
        checked={value}
        onChange={(e) => onChange?.(e.target.checked)}
        className={cn(
          "w-full rounded-lg border border-secondary/30 p-2 shadow-sm",
        )}
      />
    );
  } else if (typeof value === "object" && value !== null) {
    const orderColorKeys = ["r", "g", "b"];

    value = value as RGBColor;

    return (
      <div className="flex items-center space-x-2">
        {Object.entries(value)
          .sort(([keyA], [keyB]) => {
            const indexA = orderColorKeys.indexOf(keyA);
            const indexB = orderColorKeys.indexOf(keyB);
            return indexA - indexB;
          })
          .map(([key, val]) => (
            <Input
              key={key}
              type="number"
              disabled={disabled}
              value={val}
              onChange={(e) => {
                const newValue = {
                  ...value,
                  [key]: parseInt(e.target.value),
                } as RGBColor;
                setPrevValue(newValue);
                onChange?.(newValue);
              }}
              onBlur={(e) => {
                const newValue = {
                  ...value,
                  [key]: parseInt(e.target.value || "0"),
                } as RGBColor;
                setPrevValue(newValue);
                onChange?.(newValue);
              }}
              className={cn(
                "w-full rounded-lg border border-secondary/30 p-2 shadow-sm",
              )}
              min={options?.min}
              max={options?.max}
            />
          ))}
      </div>
    );
  }
  return null;
}