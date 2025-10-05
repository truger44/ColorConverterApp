import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

export default function ColorInput({ 
  label, 
  value, 
  onChange, 
  placeholder,
  readOnly = false 
}: ColorInputProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast({
        description: `${label} value copied to clipboard`,
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={`input-${label}`} className="text-sm font-medium">
        {label}
      </Label>
      <div className="flex gap-2">
        <Input
          id={`input-${label}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          className="font-mono"
          data-testid={`input-${label.toLowerCase()}`}
        />
        <Button
          size="icon"
          variant="outline"
          onClick={handleCopy}
          data-testid={`button-copy-${label.toLowerCase()}`}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}