import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Clipboard, Wand2 } from "lucide-react";
import chroma from "chroma-js";

interface PasteDetectorProps {
  onColorDetected: (color: string, format: string) => void;
}

export default function PasteDetector({ onColorDetected }: PasteDetectorProps) {
  const [input, setInput] = useState("");
  const [detectedFormat, setDetectedFormat] = useState<string | null>(null);

  const detectColorFormat = (value: string): string | null => {
    const trimmed = value.trim();
    
    // Hex format (3, 4, 6, or 8 digits)
    if (/^#[0-9A-Fa-f]{3,8}$/.test(trimmed)) {
      return "HEX";
    }
    
    // RGB format
    if (/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i.test(trimmed)) {
      return "RGB";
    }
    
    // BGR format (OpenCV)
    if (/^bgr\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i.test(trimmed)) {
      return "BGR";
    }
    
    // RGBA format  
    if (/^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/i.test(trimmed)) {
      return "RGBA";
    }
    
    // HSL format
    if (/^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/i.test(trimmed)) {
      return "HSL";
    }
    
    // HSLA format
    if (/^hsla\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,\s*[\d.]+\s*\)$/i.test(trimmed)) {
      return "HSLA";
    }
    
    // HSV format
    if (/^hsv\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/i.test(trimmed)) {
      return "HSV";
    }
    
    // CMYK format
    if (/^cmyk\(\s*\d+%\s*,\s*\d+%\s*,\s*\d+%\s*,\s*\d+%\s*\)$/i.test(trimmed)) {
      return "CMYK";
    }
    
    // OpenGL float format (0.0, 0.0, 0.0)
    if (/^\(\s*[01]?\.?\d*\s*,\s*[01]?\.?\d*\s*,\s*[01]?\.?\d*\s*\)$/.test(trimmed)) {
      return "OpenGL";
    }
    
    // CSS color names (basic detection)
    if (/^[a-zA-Z]+$/.test(trimmed)) {
      const cssColors = ['red', 'green', 'blue', 'white', 'black', 'yellow', 'cyan', 'magenta', 'orange', 'purple', 'pink', 'brown', 'gray', 'grey'];
      if (cssColors.includes(trimmed.toLowerCase())) {
        return "CSS Name";
      }
    }

    return null;
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    const format = detectColorFormat(value);
    setDetectedFormat(format);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      const format = detectColorFormat(text);
      setDetectedFormat(format);
      
      if (format) {
        try {
          // Validate with chroma-js
          const color = chroma(text);
          onColorDetected(text, format);
        } catch {
          console.log('Invalid color format');
        }
      }
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  const convertBgrToRgb = (bgrString: string): string => {
    const match = bgrString.match(/bgr\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
    if (match) {
      const [, b, g, r] = match;
      return `rgb(${r}, ${g}, ${b})`;
    }
    return bgrString;
  };

  const handleConvert = () => {
    if (detectedFormat && input) {
      try {
        let colorToConvert = input;
        
        // Convert BGR to RGB for chroma-js processing
        if (detectedFormat === "BGR") {
          colorToConvert = convertBgrToRgb(input);
        }
        
        const color = chroma(colorToConvert);
        onColorDetected(input, detectedFormat);
      } catch {
        console.log('Invalid color format');
      }
    }
  };

  return (
    <div className="space-y-3">
      <Label htmlFor="paste-input" className="text-sm font-medium">
        Paste Color Value
      </Label>
      <div className="flex gap-2">
        <Input
          id="paste-input"
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Paste or type color value..."
          className="font-mono"
          data-testid="input-paste-detector"
        />
        <Button
          size="icon"
          variant="outline"
          onClick={handlePaste}
          data-testid="button-paste"
        >
          <Clipboard className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          onClick={handleConvert}
          disabled={!detectedFormat}
          data-testid="button-convert"
        >
          <Wand2 className="h-4 w-4" />
        </Button>
      </div>
      {detectedFormat && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Detected:</span>
          <Badge variant="secondary" className="text-xs" data-testid="badge-detected-format">
            {detectedFormat}
          </Badge>
        </div>
      )}
    </div>
  );
}