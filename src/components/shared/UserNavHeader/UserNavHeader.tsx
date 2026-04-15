"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner"; 
import { User, UserPlus, LogOut, Loader2 } from "lucide-react";


export default function UserNavHeader() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const res = await signOut();

      if (res?.success) {
        toast.success("Logged out successfully");
        router.refresh();
      } else {
        toast.error("Something went wrong during logout.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  // يمنع الـ Layout Shift أثناء تحميل حالة الجلسة
  if (status === "loading") {
    return (
      <div className="flex items-center gap-4 animate-pulse">
        <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 text-[13px] font-medium">
      {status === "authenticated" && session?.user ? (
        /* ================= Authenticated State ================= */
        <>
          <Link
            href="/profile/address"
            className="group flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <User
              size={14}
              className="text-emerald-600 dark:text-emerald-500"
            />
            <span className="truncate max-w-30">
              Hi, {session.user.name?.split(" ")[0]}
            </span>
          </Link>

          {/* Divider */}
          <div className="w-px h-3.5 bg-slate-300 dark:bg-slate-700" />

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="group flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingOut ? (
              <Loader2 size={14} className="animate-spin text-red-500" />
            ) : (
              <LogOut
                size={14}
                className="group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors"
              />
            )}
            <span>Logout</span>
          </button>
        </>
      ) : (
        /* ================= Unauthenticated State ================= */
        <>
          <Link
            href="/login"
            className="group flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <User
              size={14}
              className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
            />
            <span>Sign In</span>
          </Link>

          {/* Divider */}
          <div className="w-px h-3.5 bg-slate-300 dark:bg-slate-700" />

          <Link
            href="/register"
            className="group flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <UserPlus
              size={14}
              className="text-emerald-600 dark:text-emerald-500"
            />
            <span>Sign Up</span>
          </Link>
        </>
      )}
    </div>
  );
}
