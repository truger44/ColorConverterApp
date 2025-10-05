import { useState } from "react";
import ColorSlider from "../ColorSlider";

export default function ColorSliderExample() {
  const [red, setRed] = useState(37);
  const [hue, setHue] = useState(217);
  const [alpha, setAlpha] = useState(100);

  return (
    <div className="space-y-6 p-4 max-w-md">
      <ColorSlider 
        label="Red" 
        value={red}
        onChange={setRed}
        min={0}
        max={255}
      />
      <ColorSlider 
        label="Hue" 
        value={hue}
        onChange={setHue}
        min={0}
        max={360}
        unit="°"
      />
      <ColorSlider 
        label="Alpha" 
        value={alpha}
        onChange={setAlpha}
        min={0}
        max={100}
        unit="%"
      />
    </div>
  );
}