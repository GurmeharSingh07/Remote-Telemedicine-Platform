"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--background-alt)] border border-[var(--border-color)] text-[var(--foreground)] opacity-50 relative pointer-events-none">
        <Sun className="h-[1.2rem] w-[1.2rem] opacity-0" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--background-alt)] border border-[var(--border-color)] text-[var(--foreground)] shadow-[0_0_15px_var(--border-color)] transition-all duration-300 hover:scale-105"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-[var(--gold)]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-[var(--foreground)]" />
      )}
    </button>
  );
}
