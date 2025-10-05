# Color Converter Professional Design Guidelines

## Design Approach
**Design System Approach**: Material Design-inspired with shadcn/ui components, emphasizing utility and precision for professional graphics workflows.

## Core Design Principles
- **Professional Tool Aesthetic**: Clean, functional interface prioritizing efficiency over decoration
- **Real-time Visual Feedback**: Instant color preview and validation states
- **Precision-Focused**: Clear typography and well-defined interactive elements for accurate color work

## Color Palette

### Light Mode
- **Primary**: 217 91% 60% (professional blue #2563EB)
- **Secondary**: 215 25% 27% (slate grey #64748B) 
- **Background**: 0 0% 100% (white #FFFFFF)
- **Text**: 222 84% 5% (dark slate #0F172A)
- **Success**: 142 76% 36% (green #22C55E)
- **Error**: 0 84% 60% (red #EF4444)
- **Accent**: 258 90% 66% (purple #8B5CF6)

### Dark Mode
- **Primary**: 217 91% 60% (same blue for brand consistency)
- **Secondary**: 215 16% 47% (lighter slate for contrast)
- **Background**: 222 84% 5% (dark slate)
- **Surface**: 215 25% 27% (card backgrounds)
- **Text**: 210 40% 98% (light text)

## Typography
- **Primary Font**: Inter (clean, readable for UI text)
- **Monospace Font**: JetBrains Mono (for color codes and values)
- **Hierarchy**: Bold headings, regular body text, monospace for technical values

## Layout System
**Tailwind Spacing Units**: 2, 4, 6, 8, 12, 16 (p-2, m-4, gap-6, etc.)
- **Card Layout**: Grouped color format sections with subtle shadows
- **Grid System**: Responsive 12-column grid adapting to screen sizes
- **Spacing**: 16px base spacing with consistent padding/margins

## Component Library

### Core Components
- **Color Preview Window**: Large, prominent display with current color
- **Format Cards**: Grouped sections for each color format (RGB, HSL, CMYK, etc.)
- **Input Controls**: Slider controls and numeric inputs with increment buttons
- **Copy Buttons**: Hover-activated copy functionality for each color value
- **Validation Indicators**: Checkmark/X icons for web-safe and system color status

### Navigation & Layout
- **Layout Switcher**: Toggle between vertical, horizontal, compact, and default views
- **Header**: Minimal with application title and layout controls
- **Tool Panels**: Collapsible sections for advanced options

### Forms & Interactions
- **Intelligent Paste**: Auto-detection input field with format identification
- **Real-time Sync**: All format fields update simultaneously
- **Hover States**: Subtle feedback on interactive elements
- **Focus States**: Clear keyboard navigation indicators

### Data Display
- **Color Swatches**: Visual representation of current color
- **Format Labels**: Clear identification of each color system
- **Value Display**: Monospace formatting for precise color codes

## Visual Treatment
- **Shadows**: Subtle card shadows (shadow-sm, shadow-md)
- **Borders**: Minimal use, primarily for input focus states
- **Contrast**: High contrast for accessibility and professional use
- **Professional Aesthetic**: Clean, tool-like interface without unnecessary decoration

## Images
No hero images or decorative graphics needed. This is a utility-focused application where the color preview serves as the primary visual element.