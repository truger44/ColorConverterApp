import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ColorPreview from "./ColorPreview";
import EditableColorFormatCard from "./EditableColorFormatCard";
import ValidationIndicator from "./ValidationIndicator";
import LayoutSwitcher, { LayoutMode } from "./LayoutSwitcher";
import PasteDetector from "./PasteDetector";
import ThemeToggle from "./ThemeToggle";
import ColorHistory from "./ColorHistory";
import { KeyboardShortcutsButton } from "./KeyboardShortcutsHelp";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { Palette as PaletteIcon } from "lucide-react";
import chroma from "chroma-js";

export default function ColorConverter() {
  const [location, navigate] = useLocation();
  const [color, setColor] = useState(chroma("#2563EB"));
  const [layout, setLayout] = useState<LayoutMode>("default");
  const [activeFormatIndex, setActiveFormatIndex] = useState(0);

  // Load color from URL parameter if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const colorParam = params.get('color');
    if (colorParam) {
      try {
        const newColor = chroma(colorParam);
        setColor(newColor);
        // Clean up URL after loading color
        window.history.replaceState({}, '', '/');
      } catch {
        console.log('Invalid color parameter in URL');
      }
    }
  }, []);

  const handleColorChange = (newColor: any) => {
    try {
      setColor(newColor);
      console.log('Color changed to:', newColor.hex());
    } catch {
      console.log('Invalid color');
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

  const handlePastedColor = (colorValue: string, format: string) => {
    try {
      let colorToConvert = colorValue;
      
      // Convert BGR to RGB for chroma-js processing
      if (format === "BGR") {
        colorToConvert = convertBgrToRgb(colorValue);
      }
      
      const newColor = chroma(colorToConvert);
      setColor(newColor);
      console.log(`Pasted ${format} color:`, colorValue);
    } catch {
      console.log('Invalid pasted color');
    }
  };

  // Enhanced color validation
  const isWebSafe = () => {
    try {
      const rgb = color.rgb();
      // Web-safe colors: each RGB component should be one of: 0, 51, 102, 153, 204, 255
      // These are multiples of 51 (256/5 rounded)
      const webSafeValues = [0, 51, 102, 153, 204, 255];
      return rgb.every(c => webSafeValues.includes(Math.round(c)));
    } catch {
      return false;
    }
  };

  const isSystemColor = () => {
    try {
      const hex = color.hex().toLowerCase();
      // Extended system colors including CSS named colors
      const systemColors = [
        '#000000', // black
        '#ffffff', // white  
        '#ff0000', // red
        '#00ff00', // lime (CSS green)
        '#0000ff', // blue
        '#ffff00', // yellow
        '#ff00ff', // magenta/fuchsia
        '#00ffff', // cyan/aqua
        '#800000', // maroon
        '#008000', // green
        '#000080', // navy
        '#808000', // olive
        '#800080', // purple
        '#008080', // teal
        '#c0c0c0', // silver
        '#808080', // gray
        '#ffa500', // orange
        '#a52a2a', // brown
        '#ffc0cb', // pink
        '#add8e6', // lightblue
        '#90ee90', // lightgreen
        '#ffb6c1', // lightpink
        '#f0e68c', // khaki
      ];
      return systemColors.includes(hex);
    } catch {
      return false;
    }
  };

  const hasValidFormat = () => {
    try {
      color.hex(); // If this doesn't throw, format is valid
      return true;
    } catch {
      return false;
    }
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case "vertical":
        return "grid grid-cols-1 gap-6";
      case "horizontal": 
        return "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4";
      case "compact":
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3";
      default:
        return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4";
    }
  };

  const colorFormats = [
    { title: "Hexadecimal", format: "hex" },
    { title: "RGB", format: "rgb" },
    { title: "BGR (OpenCV)", format: "bgr" },
    { title: "HSL", format: "hsl" },
    { title: "HSV/HSB", format: "hsv" },
    { title: "CMYK", format: "cmyk" },
    { title: "OpenGL Float", format: "opengl" },
  ];

  // Keyboard shortcuts
  const handleCopyColor = async () => {
    try {
      await navigator.clipboard.writeText(color.hex());
      console.log('Color copied to clipboard:', color.hex());
    } catch (err) {
      console.error('Failed to copy color:', err);
    }
  };

  const handlePasteColor = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const newColor = chroma(text);
      setColor(newColor);
      console.log('Color pasted from clipboard:', text);
    } catch (err) {
      console.error('Failed to paste color:', err);
    }
  };

  const handleClearColor = () => {
    setColor(chroma("#000000"));
    console.log('Color reset to black');
  };

  const handleToggleTheme = () => {
    const isDark = document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', !isDark);
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    console.log('Theme toggled to:', isDark ? 'light' : 'dark');
  };

  const handleNextFormat = () => {
    setActiveFormatIndex(prev => (prev + 1) % colorFormats.length);
    console.log('Switched to format:', colorFormats[(activeFormatIndex + 1) % colorFormats.length].title);
  };

  const handlePrevFormat = () => {
    setActiveFormatIndex(prev => (prev - 1 + colorFormats.length) % colorFormats.length);
    console.log('Switched to format:', colorFormats[(activeFormatIndex - 1 + colorFormats.length) % colorFormats.length].title);
  };

  useKeyboardShortcuts({
    onCopy: handleCopyColor,
    onPaste: handlePasteColor,
    onClear: handleClearColor,
    onToggleTheme: handleToggleTheme,
    onNextFormat: handleNextFormat,
    onPrevFormat: handlePrevFormat,
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Color Converter Pro</h1>
              <p className="text-sm text-muted-foreground">
                Professional color format converter for graphics artists and game developers
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:block">
                <LayoutSwitcher currentLayout={layout} onLayoutChange={setLayout} />
              </div>
              <Button
                variant="ghost"
                onClick={() => navigate("/palette")}
                data-testid="button-navigate-palette"
              >
                <PaletteIcon className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Palettes</span>
              </Button>
              <KeyboardShortcutsButton />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 sm:py-6">
        <div className="space-y-4 sm:space-y-6">
          {/* Color Preview and Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            <div className="md:col-span-2 xl:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Color Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ColorPreview color={color.hex()} size="lg" />
                  <ValidationIndicator
                    isWebSafe={isWebSafe()}
                    isSystemColor={isSystemColor()}
                    hasValidFormat={hasValidFormat()}
                  />
                  <div className="text-center">
                    <div className="text-lg font-mono font-bold">{color.hex()}</div>
                    <div className="text-sm text-muted-foreground">
                      Current Color
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2 xl:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Input</CardTitle>
                </CardHeader>
                <CardContent>
                  <PasteDetector onColorDetected={handlePastedColor} />
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2 xl:col-span-1">
              <ColorHistory 
                currentColor={color}
                onColorSelect={setColor}
              />
            </div>
          </div>

          <Separator />

          {/* Color Format Cards */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Color Formats</h2>
            <div className={getLayoutClasses()}>
              {colorFormats.map(({ title, format }) => (
                <EditableColorFormatCard
                  key={format}
                  title={title}
                  color={color}
                  format={format}
                  onColorChange={handleColorChange}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>Professional color conversion tool • Supports RGB, Hex, HSL, HSV, CMYK, OpenGL formats</p>
          </div>
        </div>
      </footer>
    </div>
  );
}