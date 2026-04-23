"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowDownWideNarrow,
  SlidersHorizontal,
  X,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const sortOptions = [
  { label: "Default", value: "" },
  { label: "Price: Low → High", value: "price" },
  { label: "Price: High → Low", value: "-price" },
  { label: "Top Rated", value: "-ratingsAverage" },
  { label: "Newest", value: "-createdAt" },
  { label: "Best Sellers", value: "-sold" },
];

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "";
  const currentMinPrice = searchParams.get("price[gte]") || "";
  const currentMaxPrice = searchParams.get("price[lte]") || "";
  const currentKeyword = searchParams.get("keyword") || "";

  const [minPrice, setMinPrice] = useState(currentMinPrice);
  const [maxPrice, setMaxPrice] = useState(currentMaxPrice);
  const [showFilters, setShowFilters] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const buildUrl = useCallback(
    (overrides: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      // Remove page when filters change
      params.delete("page");

      Object.entries(overrides).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      return `/products?${params.toString()}`;
    },
    [searchParams]
  );

  const handleSortChange = (value: string) => {
    router.push(buildUrl({ sort: value }));
    setShowSortMenu(false);
  };

  const handlePriceFilter = () => {
    router.push(
      buildUrl({ "price[gte]": minPrice, "price[lte]": maxPrice })
    );
    setShowFilters(false);
  };

  const clearFilter = (key: string) => {
    if (key === "price") {
      setMinPrice("");
      setMaxPrice("");
      router.push(buildUrl({ "price[gte]": "", "price[lte]": "" }));
    } else if (key === "keyword") {
      router.push(buildUrl({ keyword: "" }));
    } else {
      router.push(buildUrl({ [key]: "" }));
    }
  };

  const clearAllFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    router.push("/products");
  };

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === currentSort)?.label || "Default";

  const hasActiveFilters =
    currentSort || currentMinPrice || currentMaxPrice || currentKeyword;

  return (
    <div className="w-full space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Sort Dropdown */}
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => {
              setShowSortMenu(!showSortMenu);
              setShowFilters(false);
            }}
            className="h-11 px-4 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold gap-2 shadow-sm transition-all"
            aria-expanded={showSortMenu}
            aria-haspopup="listbox"
          >
            <ArrowDownWideNarrow size={16} />
            <span className="hidden sm:inline">Sort:</span>{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              {currentSortLabel}
            </span>
            <ChevronDown
              size={14}
              className={cn(
                "transition-transform",
                showSortMenu && "rotate-180"
              )}
            />
          </Button>

          {showSortMenu && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200" role="listbox" aria-label="Sort options">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSortChange(opt.value)}
                  role="option"
                  aria-selected={currentSort === opt.value}
                  className={cn(
                    "w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors",
                    currentSort === opt.value
                      ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price Filter Toggle */}
        <Button
          variant="outline"
          onClick={() => {
            setShowFilters(!showFilters);
            setShowSortMenu(false);
          }}
          className={cn(
            "h-11 px-4 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold gap-2 shadow-sm transition-all",
            (currentMinPrice || currentMaxPrice) &&
              "border-emerald-500 text-emerald-600 dark:text-emerald-400"
          )}
          aria-expanded={showFilters}
        >
          <SlidersHorizontal size={16} />
          Price Range
          {(currentMinPrice || currentMaxPrice) && (
            <Badge className="ml-1 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-[10px] px-1.5 py-0 rounded-full">
              Active
            </Badge>
          )}
        </Button>

        {/* Clear All */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearAllFilters}
            className="h-11 px-4 rounded-xl text-slate-500 dark:text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 font-bold gap-2 transition-all"
          >
            <X size={14} />
            Clear All
          </Button>
        )}
      </div>

      {/* Price Filter Panel */}
      {showFilters && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4">
            Filter by Price Range
          </h4>
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[120px]">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                Min Price (EGP)
              </label>
              <input
                type="number"
                min={0}
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
              />
            </div>
            <div className="flex-1 min-w-[120px]">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                Max Price (EGP)
              </label>
              <input
                type="number"
                min={0}
                placeholder="Any"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
              />
            </div>
            <Button
              onClick={handlePriceFilter}
              className="h-10 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20 transition-all active:scale-95"
            >
              Apply
            </Button>
          </div>
        </div>
      )}

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Active:
          </span>
          {currentKeyword && (
            <Badge
              variant="secondary"
              className="bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-900/50 pl-3 pr-1 py-1.5 rounded-full font-bold text-xs flex items-center gap-1"
            >
              Search: &quot;{currentKeyword}&quot;
              <button
                onClick={() => clearFilter("keyword")}
                className="ml-1 p-0.5 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              >
                <X size={12} />
              </button>
            </Badge>
          )}
          {currentSort && (
            <Badge
              variant="secondary"
              className="bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-400 border-violet-100 dark:border-violet-900/50 pl-3 pr-1 py-1.5 rounded-full font-bold text-xs flex items-center gap-1"
            >
              Sort: {currentSortLabel}
              <button
                onClick={() => clearFilter("sort")}
                className="ml-1 p-0.5 rounded-full hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors"
              >
                <X size={12} />
              </button>
            </Badge>
          )}
          {(currentMinPrice || currentMaxPrice) && (
            <Badge
              variant="secondary"
              className="bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-900/50 pl-3 pr-1 py-1.5 rounded-full font-bold text-xs flex items-center gap-1"
            >
              Price: {currentMinPrice || "0"} — {currentMaxPrice || "∞"} EGP
              <button
                onClick={() => clearFilter("price")}
                className="ml-1 p-0.5 rounded-full hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
              >
                <X size={12} />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Backdrop to close dropdowns */}
      {(showSortMenu || showFilters) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowSortMenu(false);
            setShowFilters(false);
          }}
        />
      )}
    </div>
  );
}
