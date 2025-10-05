import { useState } from "react";
import ColorInput from "../ColorInput";

export default function ColorInputExample() {
  const [rgbValue, setRgbValue] = useState("rgb(37, 99, 235)");
  const [hexValue, setHexValue] = useState("#2563EB");

  return (
    <div className="space-y-4 p-4 max-w-md">
      <ColorInput 
        label="RGB" 
        value={rgbValue}
        onChange={setRgbValue}
        placeholder="rgb(255, 255, 255)"
      />
      <ColorInput 
        label="Hex" 
        value={hexValue}
        onChange={setHexValue}
        placeholder="#FFFFFF"
      />
      <ColorInput 
        label="Read Only" 
        value="hsl(217, 91%, 60%)"
        onChange={() => {}}
        readOnly
      />
    </div>
  );
}