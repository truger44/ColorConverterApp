import { useState } from "react";
import ColorHistory from "../ColorHistory";
import chroma from "chroma-js";

export default function ColorHistoryExample() {
  const [currentColor, setCurrentColor] = useState(chroma("#2563EB"));

  // Simulate some history by changing colors
  const testColors = [
    chroma("#22C55E"),
    chroma("#EF4444"), 
    chroma("#8B5CF6"),
    chroma("#F59E0B"),
  ];

  const simulateColorChange = () => {
    const randomColor = testColors[Math.floor(Math.random() * testColors.length)];
    setCurrentColor(randomColor);
  };

  return (
    <div className="p-4 max-w-md space-y-4">
      <button 
        onClick={simulateColorChange}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
      >
        Change Color (Simulate History)
      </button>
      
      <ColorHistory 
        currentColor={currentColor}
        onColorSelect={setCurrentColor}
      />
      
      <div className="text-sm text-muted-foreground">
        Current: <span className="font-mono">{currentColor.hex()}</span>
      </div>
    </div>
  );
}