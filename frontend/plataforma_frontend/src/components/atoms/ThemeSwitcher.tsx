"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";

const ThemeSwitcher: React.FC = () => {
  const [isDark, setIsDark] = React.useState(false);

  // Restore saved theme on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("waiwa-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = saved ? saved === "dark" : prefersDark;
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("waiwa-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("waiwa-theme", "light");
      }
      return next;
    });
  };

  return (
    <button
      onClick={toggleTheme}
      title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className={`
        relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-waiwa-amber
        ${isDark
          ? "bg-waiwa-amber shadow-[0_0_12px_rgba(231,182,29,0.4)]"
          : "bg-gray-200 hover:bg-gray-300"
        }
      `}
    >
      {/* Track thumb */}
      <span
        className={`
          absolute top-0.5 left-0.5 w-6 h-6 rounded-full flex items-center justify-center
          transition-all duration-300 shadow-sm
          ${isDark
            ? "translate-x-7 bg-[#0a1f1a]"
            : "translate-x-0 bg-white"
          }
        `}
      >
        {isDark
          ? <Moon className="h-3.5 w-3.5 text-waiwa-amber" />
          : <Sun className="h-3.5 w-3.5 text-gray-500" />
        }
      </span>
    </button>
  );
};

export default ThemeSwitcher;
