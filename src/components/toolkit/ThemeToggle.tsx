import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const KEY = "amt:theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const stored = (localStorage.getItem(KEY) as "dark" | "light" | null) ?? "light";
    apply(stored);
    setTheme(stored);
  }, []);

  const apply = (t: "dark" | "light") => {
    const root = document.documentElement;
    if (t === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  };

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    apply(next);
    setTheme(next);
    localStorage.setItem(KEY, next);
  };

  return (
    <button
      onClick={toggle}
      className={cn(
        "size-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
      )}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
