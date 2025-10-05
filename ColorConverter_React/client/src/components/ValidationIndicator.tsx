import { Badge } from "@/components/ui/badge";
import { Check, X, AlertTriangle, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ValidationIndicatorProps {
  isWebSafe: boolean;
  isSystemColor: boolean;
  hasValidFormat: boolean;
}

export default function ValidationIndicator({ 
  isWebSafe, 
  isSystemColor, 
  hasValidFormat 
}: ValidationIndicatorProps) {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-2">
        <Tooltip>
          <TooltipTrigger>
            <Badge 
              variant={hasValidFormat ? "default" : "destructive"}
              className="text-xs cursor-help"
              data-testid="badge-format-valid"
            >
              {hasValidFormat ? (
                <Check className="h-3 w-3 mr-1" />
              ) : (
                <X className="h-3 w-3 mr-1" />
              )}
              Format
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">
              {hasValidFormat 
                ? "Valid color format recognized" 
                : "Invalid or unrecognized color format"
              }
            </p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger>
            <Badge 
              variant={isWebSafe ? "default" : "secondary"}
              className="text-xs cursor-help"
              data-testid="badge-web-safe"
            >
              {isWebSafe ? (
                <Check className="h-3 w-3 mr-1" />
              ) : (
                <Info className="h-3 w-3 mr-1" />
              )}
              Web Safe
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">
              {isWebSafe 
                ? "Color displays consistently across all browsers and devices" 
                : "Color may display differently on older browsers or systems"
              }
            </p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger>
            <Badge 
              variant={isSystemColor ? "default" : "secondary"}
              className="text-xs cursor-help"
              data-testid="badge-system-color"
            >
              {isSystemColor ? (
                <Check className="h-3 w-3 mr-1" />
              ) : (
                <Info className="h-3 w-3 mr-1" />
              )}
              System
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">
              {isSystemColor 
                ? "Standard CSS named color recognized by all systems" 
                : "Custom color - not a standard CSS named color"
              }
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}