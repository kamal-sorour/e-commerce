"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Lock,
  Bell,
  Palette,
  Loader2,
  Eye,
  EyeOff,
  Save,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  if (status === "loading") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="animate-spin text-emerald-500" size={40} />
      </div>
    );
  }

  const user = session?.user;

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsChangingPassword(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error("Failed to change password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const themeOptions = [
    { value: "light", label: "Light", description: "Clean bright appearance" },
    { value: "dark", label: "Dark", description: "Easy on the eyes" },
    { value: "system", label: "System", description: "Follow device settings" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/profile"
            className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:border-emerald-500 hover:text-emerald-600 transition-all"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
              Settings
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              Manage your account preferences
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Account Info */}
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <div className="p-6 pb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center">
                <User size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-slate-50">Account Information</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Your personal details</p>
              </div>
            </div>
            <Separator className="bg-slate-100 dark:bg-slate-800" />
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Full Name</label>
                  <div className="h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 flex items-center text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {user?.name || "—"}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Email Address</label>
                  <div className="h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 flex items-center text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {user?.email || "—"}
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Account details are managed by your authentication provider and cannot be changed here.
              </p>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <div className="p-6 pb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center">
                <Lock size={20} className="text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-slate-50">Change Password</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Update your security credentials</p>
              </div>
            </div>
            <Separator className="bg-slate-100 dark:bg-slate-800" />
            <CardContent className="p-6">
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full h-11 px-4 pr-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                    />
                    <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                      {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Min 6 characters"
                        className="w-full h-11 px-4 pr-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                      />
                      <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider">Confirm Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isChangingPassword}
                  className="h-11 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20 transition-all active:scale-95 gap-2"
                >
                  {isChangingPassword ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Save size={16} />
                  )}
                  {isChangingPassword ? "Saving..." : "Update Password"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Theme Preferences */}
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <div className="p-6 pb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/30 flex items-center justify-center">
                <Palette size={20} className="text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-slate-50">Appearance</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Choose your preferred theme</p>
              </div>
            </div>
            <Separator className="bg-slate-100 dark:bg-slate-800" />
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {themeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    className={cn(
                      "relative flex flex-col items-center p-5 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-0.5",
                      (theme === option.value || (!theme && option.value === "system"))
                        ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-lg shadow-emerald-500/10"
                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-950"
                    )}
                  >
                    {(theme === option.value || (!theme && option.value === "system")) && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <Check size={12} className="text-white" strokeWidth={3} />
                      </div>
                    )}
                    <div className={cn(
                      "w-12 h-12 rounded-xl mb-3 flex items-center justify-center",
                      option.value === "light" ? "bg-amber-100 dark:bg-amber-900/30" :
                      option.value === "dark" ? "bg-slate-800 dark:bg-slate-700" :
                      "bg-gradient-to-br from-amber-100 to-slate-800"
                    )}>
                      <Palette size={20} className={cn(
                        option.value === "light" ? "text-amber-600" :
                        option.value === "dark" ? "text-slate-300" :
                        "text-violet-500"
                      )} />
                    </div>
                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{option.label}</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{option.description}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <div className="p-6 pb-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-950/30 flex items-center justify-center">
                <Bell size={20} className="text-pink-600 dark:text-pink-400" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 dark:text-slate-50">Notifications</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Manage your notification preferences</p>
              </div>
            </div>
            <Separator className="bg-slate-100 dark:bg-slate-800" />
            <CardContent className="p-6 space-y-4">
              {[
                { label: "Order Updates", desc: "Get notified about order status changes" },
                { label: "Price Drops", desc: "Alerts when items in your wishlist go on sale" },
                { label: "New Arrivals", desc: "Be first to know about new products" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-slate-100">{item.label}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => toast.info("Notifications feature coming soon!")}
                    className="w-12 h-7 rounded-full bg-emerald-500 relative transition-colors cursor-pointer"
                  >
                    <div className="absolute top-0.5 right-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform" />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
