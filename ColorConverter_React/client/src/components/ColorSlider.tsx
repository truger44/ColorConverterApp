import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface ColorSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export default function ColorSlider({ 
  label, 
  value, 
  onChange, 
  min = 0, 
  max = 255, 
  step = 1,
  unit = ""
}: ColorSliderProps) {
  const handleIncrement = () => {
    const newValue = Math.min(max, value + step);
    onChange(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(min, value - step);
    onChange(newValue);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline" 
            className="h-6 w-6"
            onClick={handleDecrement}
            data-testid={`button-decrement-${label.toLowerCase()}`}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="font-mono text-sm min-w-[3rem] text-center">
            {value}{unit}
          </span>
          <Button
            size="icon"
            variant="outline"
            className="h-6 w-6" 
            onClick={handleIncrement}
            data-testid={`button-increment-${label.toLowerCase()}`}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        min={min}
        max={max}
        step={step}
        className="w-full"
        data-testid={`slider-${label.toLowerCase()}`}
      />
    </div>
  );
}