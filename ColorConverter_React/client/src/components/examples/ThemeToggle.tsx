import ThemeToggle from "../ThemeToggle";

export default function ThemeToggleExample() {
  return (
    <div className="p-4">
      <div className="flex items-center gap-4">
        <span className="text-sm">Toggle theme:</span>
        <ThemeToggle />
      </div>
    </div>
  );
}