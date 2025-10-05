import ColorPreview from "../ColorPreview";

export default function ColorPreviewExample() {
  return (
    <div className="space-y-4 p-4">
      <ColorPreview color="#2563EB" size="lg" />
      <div className="grid grid-cols-3 gap-4">
        <ColorPreview color="#22C55E" size="md" />
        <ColorPreview color="#EF4444" size="md" />
        <ColorPreview color="#8B5CF6" size="md" />
      </div>
    </div>
  );
}