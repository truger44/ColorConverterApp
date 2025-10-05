import { Card } from "@/components/ui/card";

interface ColorPreviewProps {
  color: string;
  size?: "sm" | "md" | "lg";
}

export default function ColorPreview({ color, size = "lg" }: ColorPreviewProps) {
  const sizeClasses = {
    sm: "h-24",
    md: "h-32", 
    lg: "h-48"
  };

  return (
    <Card className={`${sizeClasses[size]} w-full border-2 border-border overflow-hidden`}>
      <div 
        className="w-full h-full transition-all duration-200 hover-elevate"
        style={{ backgroundColor: color }}
        data-testid="color-preview"
      />
    </Card>
  );
}