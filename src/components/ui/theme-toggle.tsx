import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/lib/theme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="interactive">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <Monitor className="absolute h-[1.2rem] w-[1.2rem] opacity-0 scale-0 transition-all [html:not(.light):not(.dark)_&]:opacity-100 [html:not(.light):not(.dark)_&]:scale-100" />
          <span className="sr-only">Alternar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover border border-border min-w-[140px] glow-card animate-fade-in">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className={`flex items-center gap-2 transition-all hover:bg-accent/50 ${theme === "light" ? "bg-accent text-accent-foreground" : ""}`}
        >
          <Sun className="h-4 w-4" />
          Claro
          {theme === "light" && <div className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className={`flex items-center gap-2 transition-all hover:bg-accent/50 ${theme === "dark" ? "bg-accent text-accent-foreground" : ""}`}
        >
          <Moon className="h-4 w-4" />
          Escuro
          {theme === "dark" && <div className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className={`flex items-center gap-2 transition-all hover:bg-accent/50 ${theme === "system" ? "bg-accent text-accent-foreground" : ""}`}
        >
          <Monitor className="h-4 w-4" />
          Sistema
          {theme === "system" && <div className="ml-auto w-2 h-2 rounded-full bg-gradient-primary animate-pulse" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}