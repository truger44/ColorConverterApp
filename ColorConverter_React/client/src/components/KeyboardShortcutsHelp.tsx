import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Keyboard, X } from "lucide-react";

interface KeyboardShortcutsHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KeyboardShortcutsHelp({ isOpen, onClose }: KeyboardShortcutsHelpProps) {
  const shortcuts = [
    {
      keys: ["Ctrl", "C"],
      macKeys: ["⌘", "C"],
      description: "Copy current color hex value to clipboard"
    },
    {
      keys: ["Ctrl", "V"],
      macKeys: ["⌘", "V"],
      description: "Paste color from clipboard"
    },
    {
      keys: ["Ctrl", "D"],
      macKeys: ["⌘", "D"],
      description: "Toggle dark/light theme"
    },
    {
      keys: ["Delete"],
      macKeys: ["Delete"],
      description: "Reset to default color"
    },
    {
      keys: ["←", "→"],
      macKeys: ["←", "→"],
      description: "Navigate between color formats"
    },
    {
      keys: ["?"],
      macKeys: ["?"],
      description: "Show keyboard shortcuts (console)"
    }
  ];

  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            Keyboard Shortcuts
          </DialogTitle>
          <DialogDescription>
            Use these shortcuts to work faster with the color converter
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm">{shortcut.description}</p>
              </div>
              <div className="flex gap-1 ml-4">
                {(isMac ? shortcut.macKeys : shortcut.keys).map((key, keyIndex) => (
                  <Badge key={keyIndex} variant="secondary" className="text-xs font-mono">
                    {key}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={onClose} variant="outline" size="sm">
            <X className="h-4 w-4 mr-1" />
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function KeyboardShortcutsButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setIsOpen(true)}
        data-testid="button-keyboard-shortcuts"
        title="Keyboard shortcuts"
      >
        <Keyboard className="h-4 w-4" />
      </Button>
      
      <KeyboardShortcutsHelp 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
}