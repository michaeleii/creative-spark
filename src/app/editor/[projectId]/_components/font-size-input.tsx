import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import type { ChangeEvent } from "react";

interface FontSizeInputProps {
  value: number;
  onChange: (value: number) => void;
}

export default function FontSizeInput({ value, onChange }: FontSizeInputProps) {
  const increment = () => onChange(value + 1);
  const decrement = () => onChange(value - 1);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    onChange(value);
  };
  return (
    <div className="flex items-center">
      <Button
        variant="outline"
        size="icon"
        className="rounded-r-none border-r-0 p-2"
        onClick={decrement}
      >
        <Minus className="size-4" />
      </Button>
      <Input
        type="number"
        value={value}
        onChange={handleChange}
        className="h-10 w-[80px] rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <Button
        variant="outline"
        size="icon"
        className="rounded-l-none border-l-0 p-2"
        onClick={increment}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}
