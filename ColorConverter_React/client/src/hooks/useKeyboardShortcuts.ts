import { useEffect } from "react";

interface KeyboardShortcuts {
  onCopy?: () => void;
  onPaste?: () => void;
  onClear?: () => void;
  onToggleTheme?: () => void;
  onNextFormat?: () => void;
  onPrevFormat?: () => void;
}

export function useKeyboardShortcuts({
  onCopy,
  onPaste,
  onClear,
  onToggleTheme,
  onNextFormat,
  onPrevFormat,
}: KeyboardShortcuts) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip if user is typing in an input field
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      const { key, ctrlKey, metaKey, shiftKey } = event;
      const isModifierKey = ctrlKey || metaKey; // Ctrl on Windows/Linux, Cmd on Mac

      switch (key) {
        case 'c':
          if (isModifierKey && !shiftKey) {
            event.preventDefault();
            onCopy?.();
          }
          break;
        case 'v':
          if (isModifierKey && !shiftKey) {
            event.preventDefault();
            onPaste?.();
          }
          break;
        case 'Backspace':
        case 'Delete':
          if (!isModifierKey) {
            event.preventDefault();
            onClear?.();
          }
          break;
        case 'd':
          if (isModifierKey && !shiftKey) {
            event.preventDefault();
            onToggleTheme?.();
          }
          break;
        case 'ArrowRight':
          if (!isModifierKey) {
            event.preventDefault();
            onNextFormat?.();
          }
          break;
        case 'ArrowLeft':
          if (!isModifierKey) {
            event.preventDefault();
            onPrevFormat?.();
          }
          break;
        case '?':
          if (shiftKey && !isModifierKey) {
            event.preventDefault();
            // Show keyboard shortcuts help
            console.log('Keyboard shortcuts:', {
              'Ctrl/Cmd + C': 'Copy current color',
              'Ctrl/Cmd + V': 'Paste color',
              'Ctrl/Cmd + D': 'Toggle dark mode',
              'Delete/Backspace': 'Clear current color',
              'Arrow Left/Right': 'Switch between color formats',
              '?': 'Show this help'
            });
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCopy, onPaste, onClear, onToggleTheme, onNextFormat, onPrevFormat]);
}