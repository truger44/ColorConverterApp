import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, RotateCcw } from "lucide-react";
import ColorPreview from "./ColorPreview";
import chroma from "chroma-js";

interface ColorHistoryItem {
  id: string;
  color: any; // chroma-js color object
  hex: string;
  timestamp: Date;
  format?: string;
}

interface ColorHistoryProps {
  currentColor: any;
  onColorSelect: (color: any) => void;
}

export default function ColorHistory({ currentColor, onColorSelect }: ColorHistoryProps) {
  const [history, setHistory] = useState<ColorHistoryItem[]>([]);

  // Add current color to history with debounce to avoid flooding from sliders
  useEffect(() => {
    if (currentColor) {
      const hex = currentColor.hex();
      
      // Debounce: only add to history after 800ms of no changes
      const timeoutId = setTimeout(() => {
        // Don't add if it's the same as the last color
        if (history.length === 0 || history[0].hex !== hex) {
          const id = `${hex}-${Date.now()}`;
          const newItem: ColorHistoryItem = {
            id,
            color: currentColor,
            hex,
            timestamp: new Date(),
          };
          
          setHistory(prev => [newItem, ...prev.slice(0, 9)]); // Keep only 10 items
        }
      }, 800);

      // Cleanup timeout if color changes again before delay
      return () => clearTimeout(timeoutId);
    }
  }, [currentColor, history]);

  const clearHistory = () => {
    setHistory([]);
  };

  const handleColorClick = (item: ColorHistoryItem) => {
    onColorSelect(item.color);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Recent Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground text-center py-8">
            No colors in history yet. Start converting colors to see them here.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Recent Colors</CardTitle>
          <Button
            size="icon"
            variant="ghost"
            onClick={clearHistory}
            className="h-6 w-6"
            data-testid="button-clear-history"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 sm:space-y-3 max-h-64 sm:max-h-80 overflow-y-auto">
          {history.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-2 sm:gap-3 p-2 rounded-md hover-elevate cursor-pointer border border-border touch-manipulation"
              onClick={() => handleColorClick(item)}
              data-testid={`history-item-${item.hex.replace('#', '')}`}
            >
              <div className="flex-shrink-0">
                <ColorPreview color={item.hex} size="sm" />
              </div>
              <div className="flex-grow min-w-0">
                <div className="font-mono text-xs font-medium truncate">
                  {item.hex}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatTimeAgo(item.timestamp)}
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-6 w-6 flex-shrink-0 touch-manipulation"
                onClick={(e) => {
                  e.stopPropagation();
                  handleColorClick(item);
                }}
                data-testid={`button-restore-${item.hex.replace('#', '')}`}
              >
                <RotateCcw className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}