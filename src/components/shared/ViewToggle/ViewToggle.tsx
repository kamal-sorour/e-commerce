"use client";

import { LayoutGrid, List, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ViewType = "list" | "grid" | "bento";

interface ViewToggleProps {
  view: ViewType;
  onViewChange: (view: ViewType) => void;
}

export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onViewChange("list")}
        className={`w-9 h-9 rounded-lg transition-all ${
          view === "list"
            ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
            : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800/50"
        }`}
        title="List View"
      >
        <List size={18} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onViewChange("grid")}
        className={`w-9 h-9 rounded-lg transition-all ${
          view === "grid"
            ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
            : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800/50"
        }`}
        title="Grid View"
      >
        <LayoutGrid size={18} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onViewChange("bento")}
        className={`w-9 h-9 rounded-lg transition-all ${
          view === "bento"
            ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
            : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800/50"
        }`}
        title="Bento View"
      >
        <LayoutDashboard size={18} />
      </Button>
    </div>
  );
}