import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/number-input";
import { RGBColor } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  value: string | number | boolean | RGBColor;
  values?: string[];
  onChange?: (value: string | number | boolean | RGBColor) => void;
  disabled?: boolean;
}

export default function CharacterSubsectionEdit({
  title,
  value,
  values,
  onChange,
  disabled = false,
}: Props) {
  return (
    <section className="my-1 flex min-w-[200px] flex-col items-start rounded-lg border border-secondary/30 shadow-sm">
      <h3 className="p-2 font-bold text-2xl text-foreground">{title}</h3>
      <div className="flex w-full flex-col items-start justify-start bg-secondary/10 p-2">
        {getValueComponent(value, onChange, values, disabled)}
      </div>
    </section>
  );
}

function getValueComponent(
  value: string | number | boolean | RGBColor,
  onChange?: (value: string | number | boolean | RGBColor) => void,
  values?: string[],
  disabled?: boolean,
) {
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
      <NumberInput
        disabled={disabled}
        value={value}
        onChange={(val) => {
          const newValue = val.toString() === "" ? 0 : val;
          onChange?.(newValue);
        }}
        className={cn(
          "w-full rounded-lg border border-secondary/30 p-2 shadow-sm",
        )}
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
    return (
      <div className="flex items-center space-x-2">
        {Object.entries(value).map(([key, val]) => (
          <div key={key} className="flex items-center space-x-2">
            <NumberInput
              disabled={disabled}
              id={key}
              value={val}
              onChange={(val) => {
                const newValue = { ...value, [key]: val };
                onChange?.(newValue);
              }}
              className={cn("w-full rounded p-2 shadow-sm")}
            />
          </div>
        ))}
      </div>
    );
  }
  return null;
}

// function getValueComponent(
//   value: string | number | boolean | RGBColor,
//   onChange?: (value: string | number | boolean | RGBColor) => void,
//   values?: string[],
// ) {
//   if (typeof value === "string") {
//     if (values) {
//       return (
//         <Select onValueChange={onChange} defaultValue={value}>
//           <SelectTrigger className={cn("w-full")}>
//             <SelectValue placeholder="Select a value" />
//           </SelectTrigger>
//           <SelectContent className={cn("w-full")}>
//             <SelectGroup>
//               {values.map((val) => (
//                 <SelectItem key={val} value={val}>
//                   {val}
//                 </SelectItem>
//               ))}
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//       );
//     }

//     return (
//       <Input
//         type="text"
//         value={value}
//         onChange={(e) => onChange?.(e.target.value)}
//         className={cn(
//           "w-full p-2 rounded-lg border border-secondary/30 shadow-sm",
//         )}
//       />
//     );
//   } else if (typeof value === "number") {
//     return (
//       <NumberInput
//         value={value}
//         onChange={(val) => onChange?.(val)}
//         className={cn(
//           "w-full p-2 rounded-lg border border-secondary/30 shadow-sm",
//         )}
//       />
//     );
//   } else if (typeof value === "boolean") {
//     return (
//       <Input
//         type="checkbox"
//         checked={value}
//         onChange={(e) => onChange?.(e.target.checked)}
//         className={cn(
//           "w-full p-2 rounded-lg border border-secondary/30 shadow-sm",
//         )}
//       />
//     );
//   } else if (typeof value === "object" && value !== null) {
//     return (
//       <div className="flex items-center space-x-2">
//         {Object.entries(value).map(([key, val]) => (
//           <div key={key} className="flex items-center space-x-2">
//             <NumberInput
//               id={key}
//               value={val}
//               onChange={(val) => {
//                 const newValue = { ...value, [key]: val };
//                 onChange?.(newValue);
//               }}
//               className={cn("w-full p-2 rounded shadow-sm")}
//             />
//           </div>
//         ))}
//       </div>
//     );
//   }
//   return null;
// }
