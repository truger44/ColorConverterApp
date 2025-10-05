import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Lock, Unlock, RefreshCw, Copy, Palette as PaletteIcon } from "lucide-react";
import chroma from "chroma-js";
import ThemeToggle from "@/components/ThemeToggle";

// Generate 216 web-safe colors
const generateWebSafeColors = () => {
  const values = ['00', '33', '66', '99', 'CC', 'FF'];
  const colors: string[] = [];
  
  for (const r of values) {
    for (const g of values) {
      for (const b of values) {
        colors.push(`#${r}${g}${b}`);
      }
    }
  }
  
  return colors;
};

// System/Named CSS colors organized by category
const systemColors = {
  "Neutrals": [
    { name: "Black", hex: "#000000" },
    { name: "DimGray", hex: "#696969" },
    { name: "Gray", hex: "#808080" },
    { name: "DarkGray", hex: "#A9A9A9" },
    { name: "Silver", hex: "#C0C0C0" },
    { name: "LightGray", hex: "#D3D3D3" },
    { name: "Gainsboro", hex: "#DCDCDC" },
    { name: "White", hex: "#FFFFFF" },
  ],
  "Reds": [
    { name: "DarkRed", hex: "#8B0000" },
    { name: "Red", hex: "#FF0000" },
    { name: "Crimson", hex: "#DC143C" },
    { name: "FireBrick", hex: "#B22222" },
    { name: "IndianRed", hex: "#CD5C5C" },
    { name: "LightCoral", hex: "#F08080" },
    { name: "Salmon", hex: "#FA8072" },
    { name: "LightSalmon", hex: "#FFA07A" },
  ],
  "Oranges": [
    { name: "OrangeRed", hex: "#FF4500" },
    { name: "DarkOrange", hex: "#FF8C00" },
    { name: "Orange", hex: "#FFA500" },
    { name: "Coral", hex: "#FF7F50" },
    { name: "Tomato", hex: "#FF6347" },
  ],
  "Yellows": [
    { name: "Gold", hex: "#FFD700" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "LightYellow", hex: "#FFFFE0" },
    { name: "LemonChiffon", hex: "#FFFACD" },
    { name: "Khaki", hex: "#F0E68C" },
  ],
  "Greens": [
    { name: "DarkGreen", hex: "#006400" },
    { name: "Green", hex: "#008000" },
    { name: "ForestGreen", hex: "#228B22" },
    { name: "LimeGreen", hex: "#32CD32" },
    { name: "Lime", hex: "#00FF00" },
    { name: "SpringGreen", hex: "#00FF7F" },
    { name: "MediumSeaGreen", hex: "#3CB371" },
    { name: "LightGreen", hex: "#90EE90" },
  ],
  "Blues": [
    { name: "Navy", hex: "#000080" },
    { name: "DarkBlue", hex: "#00008B" },
    { name: "MediumBlue", hex: "#0000CD" },
    { name: "Blue", hex: "#0000FF" },
    { name: "RoyalBlue", hex: "#4169E1" },
    { name: "SteelBlue", hex: "#4682B4" },
    { name: "DodgerBlue", hex: "#1E90FF" },
    { name: "DeepSkyBlue", hex: "#00BFFF" },
    { name: "SkyBlue", hex: "#87CEEB" },
    { name: "LightBlue", hex: "#ADD8E6" },
  ],
  "Purples": [
    { name: "Indigo", hex: "#4B0082" },
    { name: "Purple", hex: "#800080" },
    { name: "DarkMagenta", hex: "#8B008B" },
    { name: "DarkViolet", hex: "#9400D3" },
    { name: "BlueViolet", hex: "#8A2BE2" },
    { name: "MediumPurple", hex: "#9370DB" },
    { name: "Plum", hex: "#DDA0DD" },
    { name: "Lavender", hex: "#E6E6FA" },
  ],
  "Pinks": [
    { name: "DeepPink", hex: "#FF1493" },
    { name: "HotPink", hex: "#FF69B4" },
    { name: "Pink", hex: "#FFC0CB" },
    { name: "LightPink", hex: "#FFB6C1" },
  ],
  "Browns": [
    { name: "Maroon", hex: "#800000" },
    { name: "Brown", hex: "#A52A2A" },
    { name: "SaddleBrown", hex: "#8B4513" },
    { name: "Sienna", hex: "#A0522D" },
    { name: "Chocolate", hex: "#D2691E" },
    { name: "Peru", hex: "#CD853F" },
    { name: "Tan", hex: "#D2B48C" },
    { name: "Wheat", hex: "#F5DEB3" },
  ],
};

interface PaletteColor {
  hex: string;
  locked: boolean;
}

export default function Palette() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [palette, setPalette] = useState<PaletteColor[]>([
    { hex: "#FF6B6B", locked: false },
    { hex: "#4ECDC4", locked: false },
    { hex: "#45B7D1", locked: false },
    { hex: "#FFA07A", locked: false },
    { hex: "#98D8C8", locked: false },
  ]);

  const webSafeColors = generateWebSafeColors();

  const handleColorClick = (hex: string) => {
    navigate(`/?color=${encodeURIComponent(hex)}`);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const toggleLock = (index: number) => {
    setPalette(prev => prev.map((color, i) => 
      i === index ? { ...color, locked: !color.locked } : color
    ));
  };

  const generateRandomColor = (): string => {
    return chroma.random().hex();
  };

  const generateHarmoniousPalette = () => {
    setPalette(prev => {
      const newPalette = [...prev];
      
      // Generate a fresh random base color for harmony
      const base = chroma.random();
      
      // Get base HSL values for transformations
      const baseHue = base.get('hsl.h') || 0;
      const baseSat = base.get('hsl.s');
      const baseLight = base.get('hsl.l');
      
      // Generate harmonious colors using various color theory approaches
      // Each approach creates a distinct color based on color theory
      const approaches = [
        () => base.hex(), // Base color
        () => chroma.hsl((baseHue + 30) % 360, baseSat, baseLight).hex(), // Analogous nearby
        () => chroma.hsl((baseHue + 120) % 360, baseSat, baseLight).hex(), // Triadic
        () => chroma.hsl((baseHue + 180) % 360, baseSat, baseLight).hex(), // Complementary
        () => chroma.hsl((baseHue + 240) % 360, baseSat, baseLight).hex(), // Triadic opposite
      ];
      
      let approachIndex = 0;
      for (let i = 0; i < newPalette.length; i++) {
        if (!newPalette[i].locked) {
          try {
            newPalette[i].hex = approaches[approachIndex % approaches.length]();
          } catch {
            newPalette[i].hex = generateRandomColor();
          }
          approachIndex++;
        }
      }
      
      return newPalette;
    });
  };

  const exportPalette = () => {
    const hexList = palette.map(c => c.hex).join(', ');
    copyToClipboard(hexList, "Palette");
  };

  const getTextColor = (bgHex: string): string => {
    try {
      const luminance = chroma(bgHex).luminance();
      return luminance > 0.5 ? '#000000' : '#FFFFFF';
    } catch {
      return '#000000';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PaletteIcon className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Color Palettes</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              data-testid="button-navigate-converter"
            >
              Converter
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Coolors-style Generator */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Palette Generator</h2>
            <p className="text-muted-foreground">
              Generate harmonious color palettes. Lock colors to keep them while regenerating.
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                {palette.map((color, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-md overflow-hidden border border-border"
                  >
                    <button
                      onClick={() => handleColorClick(color.hex)}
                      className="w-full h-full hover-elevate active-elevate-2"
                      style={{ backgroundColor: color.hex }}
                      data-testid={`button-palette-color-${index}`}
                      aria-label={`Select color ${color.hex}`}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur p-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono truncate">{color.hex}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6"
                          onClick={() => toggleLock(index)}
                          data-testid={`button-lock-color-${index}`}
                        >
                          {color.locked ? (
                            <Lock className="h-3 w-3" />
                          ) : (
                            <Unlock className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={generateHarmoniousPalette}
                  data-testid="button-generate-palette"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate
                </Button>
                <Button
                  variant="outline"
                  onClick={exportPalette}
                  data-testid="button-export-palette"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Palette
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-12" />

        {/* Web Safe Colors */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Web Safe Colors</h2>
            <p className="text-muted-foreground">
              216 colors that display consistently across different browsers and platforms.
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-12 sm:grid-cols-18 md:grid-cols-24 gap-1">
                {webSafeColors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => handleColorClick(color)}
                    className="aspect-square rounded hover-elevate active-elevate-2 border border-border"
                    style={{ backgroundColor: color }}
                    title={color}
                    data-testid={`button-websafe-${index}`}
                    aria-label={`Web safe color ${color}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-12" />

        {/* System Safe Colors */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">System Colors</h2>
            <p className="text-muted-foreground">
              Named CSS colors organized by category for easy reference.
            </p>
          </div>

          <div className="space-y-6">
            {Object.entries(systemColors).map(([category, colors]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle>{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => handleColorClick(color.hex)}
                        className="flex flex-col items-center gap-2 p-3 rounded-md hover-elevate active-elevate-2 border border-border"
                        data-testid={`button-system-${color.name.toLowerCase()}`}
                      >
                        <div
                          className="w-full aspect-square rounded"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div className="text-xs text-center">
                          <div className="font-medium">{color.name}</div>
                          <div className="text-muted-foreground font-mono">
                            {color.hex}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>Professional color palettes • Web safe • System colors • Palette generation</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
