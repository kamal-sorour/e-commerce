"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { clearUserCart } from "@/actions/cart.actions";
// import { useCart } from "@/context/CartContext";

// ضفت prop כדי يبلغ الصفحة الأم إن الداتا اتمسحت وتعمل ريفريش للواجهة
export default function RemoveUserCart({ onClear }: { onClear?: () => void }) {
//   const { updateNumOfCartItems } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  async function clearCart() {
    setIsLoading(true);
    try {
      const response = await clearUserCart();
      if (response.success) {
        toast.success("Cart cleared successfully");
        // updateNumOfCartItems(0);
        if(onClear) onClear();
      } else {
        toast.error(response.message || "Failed to clear cart");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={clearCart}
      disabled={isLoading}
      variant="ghost"
      className="group flex items-center gap-2 text-sm font-bold text-slate-400 dark:text-slate-500 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 transition-colors disabled:opacity-50"
    >
      {isLoading ? <Loader2 size={16} className="animate-spin text-red-500" /> : <Trash2 size={16} />}
      <span>{isLoading ? "Clearing..." : "Clear Cart"}</span>
    </Button>
  );
}