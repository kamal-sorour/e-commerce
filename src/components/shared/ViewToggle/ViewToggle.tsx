"use client";

import { LayoutGrid, List, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ViewType = "list" | "grid" | "bento";

interface ViewToggleProps {
  view: ViewType;
  onViewChange: (view: ViewType) => void;
}

const viewOptions: { value: ViewType; label: string; icon: typeof List }[] = [
  { value: "list", label: "List View", icon: List },
  { value: "grid", label: "Grid View", icon: LayoutGrid },
  { value: "bento", label: "Bento View", icon: LayoutDashboard },
];

export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div
      className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800"
      role="group"
      aria-label="Product view layout"
    >
      {viewOptions.map((opt) => {
        const Icon = opt.icon;
        const isActive = view === opt.value;
        return (
          <Button
            key={opt.value}
            variant="ghost"
            size="icon"
            onClick={() => onViewChange(opt.value)}
            aria-label={opt.label}
            aria-pressed={isActive}
            className={`w-9 h-9 rounded-lg transition-all ${
              isActive
                ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800/50"
            }`}
          >
            <Icon size={18} aria-hidden="true" />
          </Button>
        );
      })}
    </div>
  );
}