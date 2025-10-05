import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import ColorFormatInfoDialog from "../ColorFormatInfoDialog";

export default function ColorFormatInfoDialogExample() {
  const [activeDialog, setActiveDialog] = useState<string | null>(null);

  const formats = ["hex", "rgb", "hsl", "hsv", "cmyk", "opengl"];

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {formats.map((format) => (
          <Button
            key={format}
            variant="outline"
            onClick={() => setActiveDialog(format)}
            className="flex items-center gap-2"
          >
            <Info className="h-4 w-4" />
            {format.toUpperCase()}
          </Button>
        ))}
      </div>

      {formats.map((format) => (
        <ColorFormatInfoDialog
          key={format}
          format={format}
          isOpen={activeDialog === format}
          onClose={() => setActiveDialog(null)}
        />
      ))}
    </div>
  );
}