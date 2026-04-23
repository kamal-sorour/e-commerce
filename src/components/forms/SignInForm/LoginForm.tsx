"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner"; 
import { Eye, EyeOff, Mail, Loader2, LogIn, Lock } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formDataType } from "@/types/auth"; 

const isSafeUrl = (url: string | null): boolean => {
  if (!url) return false;
  return url.startsWith("/") && !url.startsWith("//");
};

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const error = searchParams.get("error");
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formDataType>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (error === "CredentialsSignin") {
      toast.error("Invalid email or password. Please try again.");
    } else if (error) {
      toast.error("An error occurred during login.");
    }
  }, [error]);

  const onSubmit = async (data: formDataType) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid email or password. Please try again.");
        return;
      }

      if (result?.ok) {
        toast.success("Login successful! Redirecting...");
        const redirectTo = isSafeUrl(callbackUrl) ? callbackUrl! : "/";
        router.push(redirectTo);
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong. Please check your connection.");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="login-email" className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <Mail size={14} className="text-emerald-500" aria-hidden="true" />
          Email Address
        </label>
        <div className="relative group">
          <Input
            id="login-email"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            aria-describedby={errors.email ? "login-email-error" : undefined}
            aria-invalid={!!errors.email}
            className={`h-13 rounded-2xl pl-5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 text-base font-medium transition-all ${errors.email ? "border-red-500 focus-visible:border-red-500" : ""}`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
          />
        </div>
        {errors.email && (
          <p id="login-email-error" className="text-xs font-semibold text-red-500 px-1 flex items-center gap-1" role="alert">
            <span className="w-1 h-1 rounded-full bg-red-500 shrink-0" />
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="login-password" className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <Lock size={14} className="text-emerald-500" aria-hidden="true" />
            Password
          </label>
          <Link 
            href="/forgot-password" 
            className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative group">
          <Input
            id="login-password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            autoComplete="current-password"
            aria-describedby={errors.password ? "login-password-error" : undefined}
            aria-invalid={!!errors.password}
            className={`h-13 rounded-2xl pl-5 pr-12 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 text-base font-medium transition-all ${errors.password ? "border-red-500 focus-visible:border-red-500" : ""}`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-500 transition-colors p-1 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
          </button>
        </div>
        {errors.password && (
          <p id="login-password-error" className="text-xs font-semibold text-red-500 px-1 flex items-center gap-1" role="alert">
            <span className="w-1 h-1 rounded-full bg-red-500 shrink-0" />
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-14 mt-2 rounded-2xl font-bold text-base bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white shadow-xl shadow-emerald-600/25 hover:shadow-emerald-500/40 transition-all active:scale-[0.98] gap-2 border-0"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Signing In...
          </>
        ) : (
          <>
            <LogIn size={20} />
            Sign In
          </>
        )}
      </Button>
    </form>
  );
}
