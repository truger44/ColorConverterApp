import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface ColorFormatInfo {
  fullName: string;
  description: string;
  fields: Array<{
    name: string;
    description: string;
    range: string;
    calculation?: string;
  }>;
}

interface ColorFormatInfoDialogProps {
  format: string;
  isOpen: boolean;
  onClose: () => void;
}

const colorFormatInfo: Record<string, ColorFormatInfo> = {
  hex: {
    fullName: "Hexadecimal Color",
    description: "A 6-digit hexadecimal representation of color using base-16 notation. Each pair of digits represents the intensity of red, green, and blue components.",
    fields: [
      {
        name: "Red Component",
        description: "First two hex digits representing red intensity",
        range: "00-FF (0-255)",
        calculation: "Convert decimal red value (0-255) to hexadecimal notation"
      },
      {
        name: "Green Component", 
        description: "Middle two hex digits representing green intensity",
        range: "00-FF (0-255)",
        calculation: "Convert decimal green value (0-255) to hexadecimal notation"
      },
      {
        name: "Blue Component",
        description: "Last two hex digits representing blue intensity", 
        range: "00-FF (0-255)",
        calculation: "Convert decimal blue value (0-255) to hexadecimal notation"
      }
    ]
  },
  rgb: {
    fullName: "Red Green Blue",
    description: "An additive color model where colors are created by combining different intensities of red, green, and blue light. This is the standard for digital displays.",
    fields: [
      {
        name: "Red (R)",
        description: "Intensity of red light component",
        range: "0-255",
        calculation: "Direct value representing red light intensity from no light (0) to maximum intensity (255)"
      },
      {
        name: "Green (G)",
        description: "Intensity of green light component",
        range: "0-255", 
        calculation: "Direct value representing green light intensity from no light (0) to maximum intensity (255)"
      },
      {
        name: "Blue (B)",
        description: "Intensity of blue light component",
        range: "0-255",
        calculation: "Direct value representing blue light intensity from no light (0) to maximum intensity (255)"
      }
    ]
  },
  hsl: {
    fullName: "Hue Saturation Lightness",
    description: "A cylindrical color model that describes colors in terms of their hue (color type), saturation (color intensity), and lightness (brightness level).",
    fields: [
      {
        name: "Hue (H)",
        description: "The color type on the color wheel",
        range: "0°-360°",
        calculation: "Angle on color wheel: 0°=red, 120°=green, 240°=blue, calculated from RGB using arctangent functions"
      },
      {
        name: "Saturation (S)",
        description: "The intensity or purity of the color",
        range: "0%-100%",
        calculation: "Calculated as (max - min) / (max + min) where max/min are the highest/lowest RGB values"
      },
      {
        name: "Lightness (L)",
        description: "The brightness level of the color",
        range: "0%-100%",
        calculation: "Calculated as (max + min) / 2 where max/min are the highest/lowest RGB values"
      }
    ]
  },
  hsv: {
    fullName: "Hue Saturation Value (Brightness)",
    description: "Similar to HSL but uses 'Value' (brightness) instead of lightness. Value represents the brightness of the color regardless of saturation.",
    fields: [
      {
        name: "Hue (H)",
        description: "The color type on the color wheel",
        range: "0°-360°",
        calculation: "Same as HSL: angle on color wheel calculated from RGB using arctangent functions"
      },
      {
        name: "Saturation (S)",
        description: "The intensity of the color relative to brightness",
        range: "0%-100%",
        calculation: "Calculated as (max - min) / max where max/min are the highest/lowest RGB values"
      },
      {
        name: "Value/Brightness (V)",
        description: "The overall brightness of the color",
        range: "0%-100%",
        calculation: "Simply the maximum value among the RGB components: max(R, G, B) / 255"
      }
    ]
  },
  cmyk: {
    fullName: "Cyan Magenta Yellow Key (Black)",
    description: "A subtractive color model used in color printing. Colors are created by subtracting brightness from white paper using cyan, magenta, yellow, and black inks.",
    fields: [
      {
        name: "Cyan (C)",
        description: "Amount of cyan ink required",
        range: "0%-100%",
        calculation: "C = (255 - R) / 255 × 100, then adjusted for black component"
      },
      {
        name: "Magenta (M)",
        description: "Amount of magenta ink required", 
        range: "0%-100%",
        calculation: "M = (255 - G) / 255 × 100, then adjusted for black component"
      },
      {
        name: "Yellow (Y)",
        description: "Amount of yellow ink required",
        range: "0%-100%",
        calculation: "Y = (255 - B) / 255 × 100, then adjusted for black component"
      },
      {
        name: "Key/Black (K)",
        description: "Amount of black ink for depth and contrast",
        range: "0%-100%",
        calculation: "K = 1 - max(R, G, B) / 255, represents the darkest component"
      }
    ]
  },
  opengl: {
    fullName: "OpenGL Floating Point",
    description: "Normalized color values used in graphics programming where each component is represented as a floating-point number between 0.0 and 1.0.",
    fields: [
      {
        name: "Red Component",
        description: "Normalized red intensity as floating-point",
        range: "0.0-1.0",
        calculation: "RGB red value divided by 255: R_float = R_int / 255.0"
      },
      {
        name: "Green Component",
        description: "Normalized green intensity as floating-point",
        range: "0.0-1.0", 
        calculation: "RGB green value divided by 255: G_float = G_int / 255.0"
      },
      {
        name: "Blue Component",
        description: "Normalized blue intensity as floating-point",
        range: "0.0-1.0",
        calculation: "RGB blue value divided by 255: B_float = B_int / 255.0"
      }
    ]
  },
  bgr: {
    fullName: "Blue Green Red (OpenCV)",
    description: "A color format commonly used in OpenCV and some image processing libraries where the Blue and Red channels are swapped compared to standard RGB. This format stores colors in Blue-Green-Red order instead of Red-Green-Blue.",
    fields: [
      {
        name: "Blue (B)",
        description: "Intensity of blue light component (stored first)",
        range: "0-255",
        calculation: "Takes the Blue value from RGB: B_bgr = B_rgb"
      },
      {
        name: "Green (G)",
        description: "Intensity of green light component (stored second)",
        range: "0-255",
        calculation: "Takes the Green value from RGB: G_bgr = G_rgb"
      },
      {
        name: "Red (R)",
        description: "Intensity of red light component (stored third)",
        range: "0-255",
        calculation: "Takes the Red value from RGB: R_bgr = R_rgb"
      }
    ]
  }
};

export default function ColorFormatInfoDialog({ 
  format, 
  isOpen, 
  onClose 
}: ColorFormatInfoDialogProps) {
  const info = colorFormatInfo[format];

  if (!info) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {info.fullName}
            <Badge variant="secondary" className="text-xs font-mono">
              {format.toUpperCase()}
            </Badge>
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed">
            {info.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          <h4 className="text-lg font-semibold">Format Components</h4>
          <div className="space-y-4">
            {info.fields.map((field, index) => (
              <div key={index} className="border border-border rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <h5 className="font-medium">{field.name}</h5>
                  <Badge variant="outline" className="text-xs">
                    {field.range}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {field.description}
                </p>
                {field.calculation && (
                  <div className="bg-muted rounded p-3 mt-2">
                    <div className="text-xs font-medium text-muted-foreground mb-1">
                      Calculation:
                    </div>
                    <code className="text-xs font-mono">
                      {field.calculation}
                    </code>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}