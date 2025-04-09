import * as React from "react";

import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  controls?: boolean;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value,
      onChange,
      min = Number.MIN_SAFE_INTEGER,
      max = Number.MAX_SAFE_INTEGER,
      step = 1,
      controls = true,
      disabled,
      className,
      inputClassName,
      buttonClassName,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState<string>(
      value.toString(),
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;

      // Actualiza el estado interno para reflejar lo que el usuario escribe
      setInternalValue(inputValue);

      // Si el valor es válido (no vacío), llama a `onChange`
      if (inputValue !== "" && !isNaN(Number(inputValue))) {
        onChange(clamp(Number(inputValue), min, max));
      }
    };

    const handleBlur = () => {
      // Si el campo está vacío al perder el foco, vuelve al valor anterior
      if (internalValue === "" || isNaN(Number(internalValue))) {
        setInternalValue(value.toString());
      } else {
        // Asegúrate de que el valor esté dentro de los límites
        const clampedValue = clamp(Number(internalValue), min, max);
        setInternalValue(clampedValue.toString());
        onChange(clampedValue);
      }
    };

    const handleIncrement = () => {
      const newValue = clamp(value + step, min, max);
      setInternalValue(newValue.toString());
      onChange(newValue);
    };

    const handleDecrement = () => {
      const newValue = clamp(value - step, min, max);
      setInternalValue(newValue.toString());
      onChange(newValue);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        handleIncrement();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        handleDecrement();
      }
    };

    const clamp = (value: number, min: number, max: number) => {
      return Math.min(Math.max(value, min), max);
    };

    React.useEffect(() => {
      // Sincroniza el estado interno cuando el valor externo cambia
      setInternalValue(value.toString());
    }, [value]);

    return (
      <div className={cn("flex", className)}>
        <div className="relative flex items-center">
          <input
            type="number"
            ref={ref}
            value={internalValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              controls && "pr-12",
              inputClassName,
            )}
            {...props}
          />
          {controls && (
            <div className="absolute top-0 right-0 flex h-full flex-col">
              <button
                type="button"
                className={cn(
                  "h-1/2 rounded-none rounded-tr-md border-input border-l px-2 py-0 hover:bg-accent",
                  buttonClassName,
                )}
                onClick={handleIncrement}
                disabled={disabled || value >= max}
                tabIndex={-1}
              >
                <ChevronUp className="h-3 w-3" />
                <span className="sr-only">Increase</span>
              </button>
              <button
                type="button"
                className={cn(
                  "h-1/2 rounded-none rounded-br-md border-input border-t border-l px-2 py-0 hover:bg-accent",
                  buttonClassName,
                )}
                onClick={handleDecrement}
                disabled={disabled || value <= min}
                tabIndex={-1}
              >
                <ChevronDown className="h-3 w-3" />
                <span className="sr-only">Decrease</span>
              </button>
            </div>
          )}
        </div>
      </div>
    );
  },
);

NumberInput.displayName = "NumberInput";

export { NumberInput };
