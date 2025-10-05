import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import ColorInput from "./ColorInput";
import ColorSlider from "./ColorSlider";
import ColorFormatInfoDialog from "./ColorFormatInfoDialog";
import chroma from "chroma-js";

interface ColorFormatCardProps {
  title: string;
  color: any; // chroma-js color object
  format: string;
  onColorChange: (newColor: any) => void;
  showSliders?: boolean;
}

export default function ColorFormatCard({ 
  title, 
  color, 
  format, 
  onColorChange,
  showSliders = false 
}: ColorFormatCardProps) {
  const [showInfoDialog, setShowInfoDialog] = useState(false);

  const getFormattedValue = () => {
    try {
      switch (format) {
        case "hex":
          return color.hex();
        case "rgb":
          const rgb = color.rgb();
          return `rgb(${Math.round(rgb[0])}, ${Math.round(rgb[1])}, ${Math.round(rgb[2])})`;
        case "hsl":
          const hsl = color.hsl();
          return `hsl(${Math.round(hsl[0] || 0)}, ${Math.round(hsl[1] * 100)}%, ${Math.round(hsl[2] * 100)}%)`;
        case "cmyk":
          const cmyk = color.cmyk();
          return `cmyk(${Math.round(cmyk[0])}%, ${Math.round(cmyk[1])}%, ${Math.round(cmyk[2])}%, ${Math.round(cmyk[3])}%)`;
        case "opengl":
          const gl = color.gl();
          return `(${gl[0].toFixed(3)}, ${gl[1].toFixed(3)}, ${gl[2].toFixed(3)})`;
        case "hsv":
          const hsv = color.hsv();
          return `hsv(${Math.round(hsv[0] || 0)}, ${Math.round(hsv[1] * 100)}%, ${Math.round(hsv[2] * 100)}%)`;
        case "bgr":
          const rgbForBgr = color.rgb();
          return `bgr(${Math.round(rgbForBgr[2])}, ${Math.round(rgbForBgr[1])}, ${Math.round(rgbForBgr[0])})`;
        default:
          return color.hex();
      }
    } catch {
      return "#000000";
    }
  };

  const handleInputChange = (newValue: string) => {
    try {
      // Try to parse the new color value
      const newColor = chroma(newValue);
      onColorChange(newColor);
    } catch {
      // Invalid color, ignore
      console.log('Invalid color format');
    }
  };

  const renderSliders = () => {
    if (!showSliders) return null;

    try {
      const rgb = color.rgb();

      return (
        <div className="space-y-4 mt-4">
          <ColorSlider
            label="Red"
            value={Math.round(rgb[0])}
            onChange={(val) => {
              const newColor = chroma.rgb(val, rgb[1], rgb[2]);
              onColorChange(newColor);
            }}
            min={0}
            max={255}
          />
          <ColorSlider
            label="Green" 
            value={Math.round(rgb[1])}
            onChange={(val) => {
              const newColor = chroma.rgb(rgb[0], val, rgb[2]);
              onColorChange(newColor);
            }}
            min={0}
            max={255}
          />
          <ColorSlider
            label="Blue"
            value={Math.round(rgb[2])}
            onChange={(val) => {
              const newColor = chroma.rgb(rgb[0], rgb[1], val);
              onColorChange(newColor);
            }}
            min={0}
            max={255}
          />
        </div>
      );
    } catch {
      return null;
    }
  };

  return (
    <>
      <Card data-testid={`card-${format}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setShowInfoDialog(true)}
              className="h-6 w-6"
              data-testid={`button-info-${format}`}
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ColorInput
            label={format.toUpperCase()}
            value={getFormattedValue()}
            onChange={handleInputChange}
            placeholder={`Enter ${format} value`}
          />
          {renderSliders()}
        </CardContent>
      </Card>
    
      <ColorFormatInfoDialog
        format={format}
        isOpen={showInfoDialog}
        onClose={() => setShowInfoDialog(false)}
      />
    </>
  );
}