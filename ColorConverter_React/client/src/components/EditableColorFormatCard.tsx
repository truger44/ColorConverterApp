import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Info, Copy, Check, Plus, Minus } from "lucide-react";
import ColorFormatInfoDialog from "./ColorFormatInfoDialog";
import { useToast } from "@/hooks/use-toast";
import chroma from "chroma-js";

interface EditableColorFormatCardProps {
  title: string;
  color: any; // chroma-js color object
  format: string;
  onColorChange: (newColor: any) => void;
}

export default function EditableColorFormatCard({ 
  title, 
  color, 
  format, 
  onColorChange
}: EditableColorFormatCardProps) {
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

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

  const handleCopy = async () => {
    try {
      const formattedValue = getFormattedValue();
      await navigator.clipboard.writeText(formattedValue);
      setCopied(true);
      toast({
        description: `${format.toUpperCase()} value copied: ${formattedValue}`,
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const renderHexFields = () => {
    const hexValue = color.hex();
    
    return (
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="flex-1">
            <Label className="text-xs">Hex Value</Label>
            <Input
              value={hexValue}
              onChange={(e) => {
                try {
                  const newColor = chroma(e.target.value);
                  onColorChange(newColor);
                } catch {}
              }}
              className="font-mono text-sm"
              placeholder="#000000"
              data-testid="input-hex"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderRgbFields = () => {
    const rgb = color.rgb();
    
    const updateRgb = (index: number, value: number) => {
      const newRgb = [...rgb];
      newRgb[index] = Math.max(0, Math.min(255, value));
      try {
        const newColor = chroma.rgb(newRgb[0], newRgb[1], newRgb[2]);
        onColorChange(newColor);
      } catch {}
    };

    return (
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <div>
            <Label className="text-xs">Red</Label>
            <Input
              type="number"
              value={Math.round(rgb[0])}
              onChange={(e) => updateRgb(0, parseInt(e.target.value) || 0)}
              min={0}
              max={255}
              className="text-sm"
              data-testid="input-rgb-r"
            />
          </div>
          <div>
            <Label className="text-xs">Green</Label>
            <Input
              type="number"
              value={Math.round(rgb[1])}
              onChange={(e) => updateRgb(1, parseInt(e.target.value) || 0)}
              min={0}
              max={255}
              className="text-sm"
              data-testid="input-rgb-g"
            />
          </div>
          <div>
            <Label className="text-xs">Blue</Label>
            <Input
              type="number"
              value={Math.round(rgb[2])}
              onChange={(e) => updateRgb(2, parseInt(e.target.value) || 0)}
              min={0}
              max={255}
              className="text-sm"
              data-testid="input-rgb-b"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderBgrFields = () => {
    const rgb = color.rgb();
    
    const updateBgr = (index: number, value: number) => {
      const newRgb = [...rgb];
      // BGR format: B=rgb[2], G=rgb[1], R=rgb[0]
      const rgbIndex = index === 0 ? 2 : index === 2 ? 0 : 1; // Convert BGR index to RGB index
      newRgb[rgbIndex] = Math.max(0, Math.min(255, value));
      try {
        const newColor = chroma.rgb(newRgb[0], newRgb[1], newRgb[2]);
        onColorChange(newColor);
      } catch {}
    };

    return (
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <div>
            <Label className="text-xs">Blue</Label>
            <Input
              type="number"
              value={Math.round(rgb[2])} // Blue component
              onChange={(e) => updateBgr(0, parseInt(e.target.value) || 0)}
              min={0}
              max={255}
              className="text-sm"
              data-testid="input-bgr-b"
            />
          </div>
          <div>
            <Label className="text-xs">Green</Label>
            <Input
              type="number"
              value={Math.round(rgb[1])} // Green component
              onChange={(e) => updateBgr(1, parseInt(e.target.value) || 0)}
              min={0}
              max={255}
              className="text-sm"
              data-testid="input-bgr-g"
            />
          </div>
          <div>
            <Label className="text-xs">Red</Label>
            <Input
              type="number"
              value={Math.round(rgb[0])} // Red component
              onChange={(e) => updateBgr(2, parseInt(e.target.value) || 0)}
              min={0}
              max={255}
              className="text-sm"
              data-testid="input-bgr-r"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderHslFields = () => {
    const hsl = color.hsl();
    
    const updateHsl = (index: number, value: number) => {
      const newHsl = [...hsl];
      if (index === 0) {
        newHsl[index] = ((value % 360) + 360) % 360; // Hue 0-360
      } else {
        newHsl[index] = Math.max(0, Math.min(1, value / 100)); // Saturation/Lightness 0-1
      }
      try {
        const newColor = chroma.hsl(newHsl[0], newHsl[1], newHsl[2]);
        onColorChange(newColor);
      } catch {}
    };

    return (
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <div>
            <Label className="text-xs">Hue (°)</Label>
            <Input
              type="number"
              value={Math.round(hsl[0] || 0)}
              onChange={(e) => updateHsl(0, parseInt(e.target.value) || 0)}
              min={0}
              max={360}
              className="text-sm"
              data-testid="input-hsl-h"
            />
          </div>
          <div>
            <Label className="text-xs">Saturation (%)</Label>
            <Input
              type="number"
              value={Math.round((hsl[1] || 0) * 100)}
              onChange={(e) => updateHsl(1, parseInt(e.target.value) || 0)}
              min={0}
              max={100}
              className="text-sm"
              data-testid="input-hsl-s"
            />
          </div>
          <div>
            <Label className="text-xs">Lightness (%)</Label>
            <Input
              type="number"
              value={Math.round((hsl[2] || 0) * 100)}
              onChange={(e) => updateHsl(2, parseInt(e.target.value) || 0)}
              min={0}
              max={100}
              className="text-sm"
              data-testid="input-hsl-l"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderHsvFields = () => {
    const hsv = color.hsv();
    
    const updateHsv = (index: number, value: number) => {
      const newHsv = [...hsv];
      if (index === 0) {
        newHsv[index] = ((value % 360) + 360) % 360; // Hue 0-360
      } else {
        newHsv[index] = Math.max(0, Math.min(1, value / 100)); // Saturation/Value 0-1
      }
      try {
        const newColor = chroma.hsv(newHsv[0], newHsv[1], newHsv[2]);
        onColorChange(newColor);
      } catch {}
    };

    const incrementHue = (amount: number) => {
      updateHsv(0, (hsv[0] || 0) + amount);
    };

    return (
      <div className="space-y-4">
        {/* Hue with increment/decrement */}
        <div>
          <Label className="text-xs mb-2 block">Hue (°)</Label>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => incrementHue(-1)}
              className="h-8 w-8"
              data-testid="button-hsv-hue-decrement"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Input
              type="number"
              value={Math.round(hsv[0] || 0)}
              onChange={(e) => updateHsv(0, parseInt(e.target.value) || 0)}
              min={0}
              max={360}
              className="text-sm text-center"
              data-testid="input-hsv-h"
            />
            <Button
              size="icon"
              variant="outline"
              onClick={() => incrementHue(1)}
              className="h-8 w-8"
              data-testid="button-hsv-hue-increment"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Saturation slider */}
        <div>
          <Label className="text-xs mb-2 block">Saturation: {Math.round((hsv[1] || 0) * 100)}%</Label>
          <Slider
            value={[(hsv[1] || 0) * 100]}
            onValueChange={(value) => updateHsv(1, value[0])}
            max={100}
            step={1}
            className="w-full"
            data-testid="slider-hsv-saturation"
          />
        </div>

        {/* Value slider */}
        <div>
          <Label className="text-xs mb-2 block">Value: {Math.round((hsv[2] || 0) * 100)}%</Label>
          <Slider
            value={[(hsv[2] || 0) * 100]}
            onValueChange={(value) => updateHsv(2, value[0])}
            max={100}
            step={1}
            className="w-full"
            data-testid="slider-hsv-value"
          />
        </div>
      </div>
    );
  };

  const renderCmykFields = () => {
    const cmyk = color.cmyk();
    
    const updateCmyk = (index: number, value: number) => {
      const newCmyk = [...cmyk];
      newCmyk[index] = Math.max(0, Math.min(100, value));
      try {
        const newColor = chroma.cmyk(newCmyk[0], newCmyk[1], newCmyk[2], newCmyk[3]);
        onColorChange(newColor);
      } catch {}
    };

    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs">Cyan (%)</Label>
            <Input
              type="number"
              value={Math.round(cmyk[0])}
              onChange={(e) => updateCmyk(0, parseInt(e.target.value) || 0)}
              min={0}
              max={100}
              className="text-sm"
              data-testid="input-cmyk-c"
            />
          </div>
          <div>
            <Label className="text-xs">Magenta (%)</Label>
            <Input
              type="number"
              value={Math.round(cmyk[1])}
              onChange={(e) => updateCmyk(1, parseInt(e.target.value) || 0)}
              min={0}
              max={100}
              className="text-sm"
              data-testid="input-cmyk-m"
            />
          </div>
          <div>
            <Label className="text-xs">Yellow (%)</Label>
            <Input
              type="number"
              value={Math.round(cmyk[2])}
              onChange={(e) => updateCmyk(2, parseInt(e.target.value) || 0)}
              min={0}
              max={100}
              className="text-sm"
              data-testid="input-cmyk-y"
            />
          </div>
          <div>
            <Label className="text-xs">Black (%)</Label>
            <Input
              type="number"
              value={Math.round(cmyk[3])}
              onChange={(e) => updateCmyk(3, parseInt(e.target.value) || 0)}
              min={0}
              max={100}
              className="text-sm"
              data-testid="input-cmyk-k"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderOpenglFields = () => {
    const gl = color.gl();
    
    const updateGl = (index: number, value: number) => {
      const newGl = [...gl];
      newGl[index] = Math.max(0, Math.min(1, value));
      try {
        const newColor = chroma.gl(newGl[0], newGl[1], newGl[2]);
        onColorChange(newColor);
      } catch {}
    };

    return (
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          <div>
            <Label className="text-xs">Red</Label>
            <Input
              type="number"
              value={gl[0].toFixed(3)}
              onChange={(e) => updateGl(0, parseFloat(e.target.value) || 0)}
              min={0}
              max={1}
              step={0.001}
              className="text-sm"
              data-testid="input-opengl-r"
            />
          </div>
          <div>
            <Label className="text-xs">Green</Label>
            <Input
              type="number"
              value={gl[1].toFixed(3)}
              onChange={(e) => updateGl(1, parseFloat(e.target.value) || 0)}
              min={0}
              max={1}
              step={0.001}
              className="text-sm"
              data-testid="input-opengl-g"
            />
          </div>
          <div>
            <Label className="text-xs">Blue</Label>
            <Input
              type="number"
              value={gl[2].toFixed(3)}
              onChange={(e) => updateGl(2, parseFloat(e.target.value) || 0)}
              min={0}
              max={1}
              step={0.001}
              className="text-sm"
              data-testid="input-opengl-b"
            />
          </div>
        </div>
      </div>
    );
  };

  const renderFields = () => {
    switch (format) {
      case "hex":
        return renderHexFields();
      case "rgb":
        return renderRgbFields();
      case "bgr":
        return renderBgrFields();
      case "hsl":
        return renderHslFields();
      case "hsv":
        return renderHsvFields();
      case "cmyk":
        return renderCmykFields();
      case "opengl":
        return renderOpenglFields();
      default:
        return null;
    }
  };

  return (
    <>
      <Card data-testid={`card-${format}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <div className="flex items-center gap-1">
              <Button
                size="icon"
                variant="ghost"
                onClick={handleCopy}
                className="h-6 w-6"
                data-testid={`button-copy-${format}`}
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              </Button>
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
          </div>
          {/* Show formatted value for reference */}
          <div className="text-xs text-muted-foreground font-mono bg-muted/30 px-2 py-1 rounded">
            {getFormattedValue()}
          </div>
        </CardHeader>
        <CardContent>
          {renderFields()}
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