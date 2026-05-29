"use client";

import { useEffect, useState, type ChangeEvent } from "react";

import {
  formatCurrencyInputValue,
  parseCurrencyInputToInteger,
} from "@/lib/currency";

import { Input } from "./input";

type CurrencyInputProps = Readonly<{
  id?: string;
  value: number | null;
  onValueChange: (value: number | null) => void;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  "aria-label"?: string;
}>;

export function CurrencyInput({
  id,
  value,
  onValueChange,
  disabled,
  required,
  placeholder,
  "aria-label": ariaLabel,
}: CurrencyInputProps) {
  const [display, setDisplay] = useState(() =>
    value != null ? formatCurrencyInputValue(value) : "",
  );

  useEffect(() => {
    setDisplay(value != null ? formatCurrencyInputValue(value) : "");
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextInteger = parseCurrencyInputToInteger(event.target.value);
    onValueChange(nextInteger);
    setDisplay(
      nextInteger != null ? formatCurrencyInputValue(nextInteger) : "",
    );
  };

  return (
    <Input
      id={id}
      type="text"
      inputMode="numeric"
      autoComplete="off"
      disabled={disabled}
      required={required}
      placeholder={placeholder}
      aria-label={ariaLabel}
      value={display}
      onChange={handleChange}
    />
  );
}
