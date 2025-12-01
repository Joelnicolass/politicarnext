import { useState, useEffect } from "react";

interface NumericInputProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
  placeholder?: string;
  min?: number;
  max?: number;
}

export function NumericInput({
  value,
  onChange,
  className = "",
  placeholder,
  min,
  max,
}: NumericInputProps) {
  // Estado local para mantener el valor como string mientras se escribe
  const [inputValue, setInputValue] = useState<string>(value.toString());

  // Sincronizar cuando el valor externo cambie
  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleChange = (newValue: string) => {
    // Actualizar el valor visual del input
    setInputValue(newValue);

    // Si está vacío, permitir que permanezca vacío temporalmente
    if (newValue === "") {
      return;
    }

    // Si es solo "-", permitir escribirlo (para números negativos)
    if (newValue === "-") {
      return;
    }

    // Permitir solo números válidos (incluyendo negativos completos)
    if (/^-?\d+$/.test(newValue)) {
      const numValue = parseInt(newValue);

      // Validar min y max si están definidos
      if (min !== undefined && numValue < min) return;
      if (max !== undefined && numValue > max) return;

      onChange(numValue);
    }
  };

  const handleBlur = () => {
    // Al perder el foco, si está vacío o es solo "-", usar el mínimo o 0
    if (inputValue === "" || inputValue === "-") {
      const defaultValue = min !== undefined ? min : 0;
      onChange(defaultValue);
      setInputValue(defaultValue.toString());
    } else {
      // Sincronizar con el valor real
      setInputValue(value.toString());
    }
  };

  return (
    <input
      inputMode="url"
      type="tel"
      id="numberInput"
      placeholder="Enter number"
      pattern="-?[0-9]+"
      value={inputValue}
      onChange={(e) => handleChange(e.target.value)}
      onBlur={handleBlur}
      //placeholder={placeholder}
      className={className}
    />
  );
}
