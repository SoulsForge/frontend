import { type ChangeEvent, useEffect, useState } from "react";

type UseCharacterLimitProps = {
  maxLength: number;
  initialValue?: string;
  onChange?: (value: string) => void;
};

export function useCharacterLimit({
  maxLength,
  initialValue = "",
  onChange,
}: UseCharacterLimitProps) {
  const [value, setValue] = useState(initialValue);
  const [characterCount, setCharacterCount] = useState(initialValue.length);

  useEffect(() => {
    // Update if initialValue changes externally
    setValue(initialValue);
    setCharacterCount(initialValue.length);
  }, [initialValue]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      setValue(newValue);
      setCharacterCount(newValue.length);
      onChange?.(newValue);
    }
  };

  const reset = () => {
    setValue("");
    setCharacterCount(0);
  };

  return {
    value,
    characterCount,
    handleChange,
    maxLength,
    reset,
    setCharacterCount,
    setValue,
  };
}
