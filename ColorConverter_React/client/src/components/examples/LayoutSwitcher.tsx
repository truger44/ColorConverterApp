import { useState } from "react";
import LayoutSwitcher, { LayoutMode } from "../LayoutSwitcher";

export default function LayoutSwitcherExample() {
  const [layout, setLayout] = useState<LayoutMode>("default");

  return (
    <div className="space-y-4 p-4">
      <LayoutSwitcher 
        currentLayout={layout}
        onLayoutChange={setLayout}
      />
      <div className="text-sm text-muted-foreground">
        Current layout: <span className="font-medium">{layout}</span>
      </div>
    </div>
  );
}