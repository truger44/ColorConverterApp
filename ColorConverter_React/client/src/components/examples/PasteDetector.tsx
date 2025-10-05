import PasteDetector from "../PasteDetector";

export default function PasteDetectorExample() {
  const handleColorDetected = (color: string, format: string) => {
    console.log(`Detected ${format} color:`, color);
  };

  return (
    <div className="p-4 max-w-md">
      <PasteDetector onColorDetected={handleColorDetected} />
      <div className="mt-4 text-xs text-muted-foreground space-y-1">
        <div>Try pasting:</div>
        <div className="font-mono">#2563EB</div>
        <div className="font-mono">rgb(37, 99, 235)</div>
        <div className="font-mono">bgr(235, 99, 37)</div>
        <div className="font-mono">hsl(217, 91%, 60%)</div>
        <div className="font-mono">(0.145, 0.388, 0.922)</div>
      </div>
    </div>
  );
}