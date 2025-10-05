import { useState } from "react";
import ColorFormatCard from "../ColorFormatCard";
import chroma from "chroma-js";

export default function ColorFormatCardExample() {
  const [color, setColor] = useState(chroma("#2563EB"));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <ColorFormatCard
        title="Hexadecimal"
        color={color}
        format="hex"
        onColorChange={setColor}
      />
      <ColorFormatCard
        title="RGB"
        color={color}
        format="rgb"
        onColorChange={setColor}
        showSliders={true}
      />
      <ColorFormatCard
        title="HSL"
        color={color}
        format="hsl"
        onColorChange={setColor}
      />
      <ColorFormatCard
        title="OpenGL Float"
        color={color}
        format="opengl"
        onColorChange={setColor}
      />
    </div>
  );
}