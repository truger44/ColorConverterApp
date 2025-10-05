import { Button } from "@/components/ui/button";
import { Grid, Columns, Rows, Maximize2 } from "lucide-react";

export type LayoutMode = "default" | "vertical" | "horizontal" | "compact";

interface LayoutSwitcherProps {
  currentLayout: LayoutMode;
  onLayoutChange: (layout: LayoutMode) => void;
}

export default function LayoutSwitcher({ currentLayout, onLayoutChange }: LayoutSwitcherProps) {
  const layouts = [
    { mode: "default" as LayoutMode, icon: Grid, label: "Default" },
    { mode: "vertical" as LayoutMode, icon: Columns, label: "Vertical" },
    { mode: "horizontal" as LayoutMode, icon: Rows, label: "Horizontal" },
    { mode: "compact" as LayoutMode, icon: Maximize2, label: "Compact" },
  ];

  return (
    <div className="flex gap-1 border border-border rounded-md p-1">
      {layouts.map(({ mode, icon: Icon, label }) => (
        <Button
          key={mode}
          size="sm"
          variant={currentLayout === mode ? "default" : "ghost"}
          onClick={() => onLayoutChange(mode)}
          className="h-8 px-3"
          data-testid={`button-layout-${mode}`}
        >
          <Icon className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">{label}</span>
        </Button>
      ))}
    </div>
  );
}