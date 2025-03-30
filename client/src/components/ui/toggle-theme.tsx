import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ToggleThemeProps {
  className?: string;
}

export function ToggleTheme({ className }: ToggleThemeProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <div className={`flex items-center ${className || ""}`}>
      <Switch id="theme-mode" checked={isDarkMode} onCheckedChange={toggleTheme} />
      <Label htmlFor="theme-mode" className="mr-3 text-sm font-medium">
        حالت تاریک
      </Label>
    </div>
  );
}
