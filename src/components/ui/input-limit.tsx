import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useCharacterLimit } from "@/hooks/use-character-limit";
import { useId } from "react";

export interface CharacterLimitInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  maxLength?: number;
  initialValue?: string;
  showCounter?: boolean;
  description?: React.ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  counterClassName?: string;
}

const CharacterLimitInput = React.forwardRef<
  HTMLInputElement,
  CharacterLimitInputProps
>(
  (
    {
      label,
      maxLength = 50,
      initialValue = "",
      showCounter = true,
      description,
      containerClassName,
      labelClassName,
      counterClassName,
      className,
      onChange,
      ...props
    },
    ref,
  ) => {
    const id = useId();
    const {
      value,
      characterCount,
      handleChange,
      maxLength: limit,
    } = useCharacterLimit({
      maxLength,
      initialValue,
      onChange: (value) =>
        onChange?.({
          target: { value },
        } as React.ChangeEvent<HTMLInputElement>),
    });

    return (
      <div className={cn("flex flex-col gap-2", containerClassName)}>
        {label && (
          <Label htmlFor={id} className={cn(labelClassName)}>
            {label}
          </Label>
        )}
        <div className="relative">
          <Input
            id={id}
            ref={ref}
            value={value}
            maxLength={maxLength}
            onChange={(e) => handleChange(e)}
            className={cn(showCounter ? "pe-14" : "", className)}
            {...props}
          />
          {showCounter && (
            <div
              id={`${id}-counter`}
              className={cn(
                "absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground text-xs tabular-nums",
                counterClassName,
              )}
              aria-live="polite"
              role="status"
            >
              {characterCount}/{limit}
            </div>
          )}
        </div>
        {description && (
          <p className="text-muted-foreground text-xs" id={`${id}-description`}>
            {description}
          </p>
        )}
      </div>
    );
  },
);

CharacterLimitInput.displayName = "CharacterLimitInput";

export { CharacterLimitInput };
