// components/ThemeToggle.tsx
"use client";

import React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme();

  // منع الرندرة حتى يتم التحميل في المتصفح للحفاظ على تطابق الأيقونة مع الثيم الفعلي
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full relative p-2">
         {/* Placeholder فاضي بنفس الحجم لمنع تحرك العناصر */}
        <div className="w-5.5  h-5.5 " />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative p-2 rounded-full hover:bg-muted transition-colors group w-9 h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {/* الأيقونة تتغير بناءً على الـ State الحالي */}
          {theme === "light" && (
            <Sun className="absolute h-5.5 w-5.5 text-amber-500 transition-all" />
          )}
          {theme === "dark" && (
            <Moon className="absolute h-5.5 w-5.5 text-emerald-500 transition-all" />
          )}
          {theme === "system" && (
            <Monitor className="absolute h-5.5 w-5.5 text-slate-500 dark:text-slate-400 transition-all" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-36 rounded-xl shadow-lg border-border">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={`gap-3 cursor-pointer rounded-lg m-1 ${
            theme === "light" ? "bg-accent text-emerald-600 font-medium" : ""
          }`}
        >
          <Sun size={16} className={theme === "light" ? "text-amber-500" : "text-muted-foreground"} />
          Light
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={`gap-3 cursor-pointer rounded-lg m-1 ${
            theme === "dark" ? "bg-accent text-emerald-600 font-medium" : ""
          }`}
        >
          <Moon size={16} className={theme === "dark" ? "text-emerald-500" : "text-muted-foreground"} />
          Dark
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={`gap-3 cursor-pointer rounded-lg m-1 ${
            theme === "system" ? "bg-accent text-emerald-600 font-medium" : ""
          }`}
        >
          <Monitor size={16} className={theme === "system" ? "text-slate-500" : "text-muted-foreground"} />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}