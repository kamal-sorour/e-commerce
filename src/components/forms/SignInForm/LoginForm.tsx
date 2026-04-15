"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm, Controller, set } from "react-hook-form";
import { toast } from "sonner"; // Shadcn toast
import { Eye, EyeOff, Mail, Loader2, LogIn } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formDataType } from "@/types/auth"; // تأكد من المسار

// دالة حماية الـ URL الداخلي
const isSafeUrl = (url: string | null): boolean => {
  if (!url) return false;
  try {
    // URL آمن فقط إذا كان يبدأ بـ "/" ولا يبدأ بـ "//" (لمنع الـ Open Redirects)
    return url.startsWith("/") && !url.startsWith("//");
  } catch {
    return false;
  }
};

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const error = searchParams.get("error");
  const router = useRouter();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
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
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        router.push("/"); 
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please check your connection.");
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Email Input */}
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
          Email Address
        </label>
        <div className="relative">
          <Input
            type="email"
            placeholder="name@example.com"
            className={`h-12 rounded-xl pl-11 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 ${errors.email ? "border-red-500 focus-visible:border-red-500" : ""}`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>
        {errors.email && (
          <p className="text-xs font-semibold text-red-500 px-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password Input */}
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
          Password
        </label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className={`h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 pr-12 ${errors.password ? "border-red-500 focus-visible:border-red-500" : ""}`}
            {...register("password", {
              required: "Password is required",
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs font-semibold text-red-500 px-1">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 mt-4 rounded-xl font-bold text-base bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.98] gap-2"
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
