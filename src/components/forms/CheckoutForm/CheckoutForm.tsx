"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { 
  MapPin, Building2, Hash, Phone, ShieldCheck,
  CreditCard, Banknote, Loader2, ArrowRight 
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { createOrder } from "@/actions/order.actions";

import { cn } from "@/lib/utils";

interface CheckoutFormProps {
  cartId: string;
}

type CheckoutFormData = {
  details: string;
  city: string;
  postalCode: string;
  phone: string;
  paymentMethod: "cash" | "card";
};

export default function CheckoutForm({ cartId }: CheckoutFormProps) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    mode: "onChange",
    defaultValues: {
      details: "",
      city: "",
      postalCode: "",
      phone: "",
      paymentMethod: "card", 
    },
  });

  async function onSubmit(data: CheckoutFormData) {
    setIsSubmitting(true);
    try {
      const resp = await createOrder(cartId, data);
      
      if (resp.status) {
        if (data.paymentMethod === "cash") {
          toast.success(resp.message || "Order placed successfully!");
        
          router.push("/orders");
        } else {
          
          window.open(resp.session.url, "_self");
        }
      } else {
        toast.error(resp.error?.message || "Failed to place order.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      
      {/* ----------------- Shipping Address ----------------- */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
          Shipping Information
        </h2>

        {/* Details / Address */}
        <div className="space-y-2">
          <Label htmlFor="details" className="text-slate-700 dark:text-slate-300 font-bold">Full Address Details</Label>
          <div className="relative">
            <Input
              id="details"
              placeholder="e.g. 123 Main Street, Apartment 4B"
              className={cn("h-12 pl-11 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500", errors.details && "border-red-500 focus-visible:border-red-500")}
              {...register("details", { required: "Address details are required" })}
            />
            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          {errors.details && <p className="text-xs font-semibold text-red-500">{errors.details.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city" className="text-slate-700 dark:text-slate-300 font-bold">City</Label>
            <div className="relative">
              <Input
                id="city"
                placeholder="e.g. Cairo"
                className={cn("h-12 pl-11 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500", errors.city && "border-red-500 focus-visible:border-red-500")}
                {...register("city", { required: "City is required" })}
              />
              <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
            {errors.city && <p className="text-xs font-semibold text-red-500">{errors.city.message}</p>}
          </div>

          {/* Postal Code */}
          <div className="space-y-2">
            <Label htmlFor="postalCode" className="text-slate-700 dark:text-slate-300 font-bold">Postal Code</Label>
            <div className="relative">
              <Input
                id="postalCode"
                placeholder="e.g. 11511"
                className={cn("h-12 pl-11 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500", errors.postalCode && "border-red-500 focus-visible:border-red-500")}
                {...register("postalCode", { required: "Postal code is required" })}
              />
              <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
            {errors.postalCode && <p className="text-xs font-semibold text-red-500">{errors.postalCode.message}</p>}
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-slate-700 dark:text-slate-300 font-bold">Phone Number</Label>
          <div className="relative flex items-center">
            <div className="absolute left-0 h-12 px-4 flex items-center justify-center border-r border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/50 rounded-l-xl text-slate-500 text-sm font-bold pointer-events-none">
              +20
            </div>
            <Input
              id="phone"
              type="tel"
              placeholder="1xxxxxxxxx"
              className={cn("h-12 pl-16 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500", errors.phone && "border-red-500 focus-visible:border-red-500")}
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^(?:\+20|20|0)?1[0125][0-9]{8}$/,
                  message: "Invalid Egyptian phone number",
                },
              })}
              onKeyDown={(e) => {
                const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
                if (!/^\d$/.test(e.key) && !allowed.includes(e.key)) {
                  e.preventDefault();
                }
              }}
            />
            <Phone size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
          {errors.phone && <p className="text-xs font-semibold text-red-500">{errors.phone.message}</p>}
        </div>
      </div>

      {/* ----------------- Payment Method ----------------- */}
      <div className="space-y-6 pt-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
          Payment Method
        </h2>

        <Controller
          name="paymentMethod"
          control={control}
          rules={{ required: "Please select a payment method" }}
          render={({ field }) => (
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {/* Card Payment Option */}
              <Label
                htmlFor="card"
                className={cn(
                  "cursor-pointer flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all",
                  field.value === "card"
                    ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400"
                )}
              >
                <RadioGroupItem value="card" id="card" className="sr-only" />
                <CreditCard size={32} className={field.value === "card" ? "text-emerald-600 dark:text-emerald-500" : "text-slate-400"} />
                <span className="font-bold text-lg">Credit Card</span>
                <span className="text-xs font-medium opacity-70">Pay securely via Stripe</span>
              </Label>

              {/* Cash Payment Option */}
              <Label
                htmlFor="cash"
                className={cn(
                  "cursor-pointer flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all",
                  field.value === "cash"
                    ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400"
                )}
              >
                <RadioGroupItem value="cash" id="cash" className="sr-only" />
                <Banknote size={32} className={field.value === "cash" ? "text-emerald-600 dark:text-emerald-500" : "text-slate-400"} />
                <span className="font-bold text-lg">Cash on Delivery</span>
                <span className="text-xs font-medium opacity-70">Pay when you receive</span>
              </Label>
            </RadioGroup>
          )}
        />
        {errors.paymentMethod && <p className="text-xs font-semibold text-red-500">{errors.paymentMethod.message}</p>}
      </div>

      {/* ----------------- Submit Button ----------------- */}
      <div className="pt-6">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 rounded-2xl font-bold text-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.98] gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={22} className="animate-spin" />
              Processing Order...
            </>
          ) : (
            <>
              Complete Purchase <ArrowRight size={20} />
            </>
          )}
        </Button>
        <p className="text-center text-xs text-slate-400 dark:text-slate-500 font-medium mt-4 flex items-center justify-center gap-1.5">
          <ShieldCheck size={14} className="text-emerald-500" /> All transactions are secure and encrypted.
        </p>
      </div>
    </form>
  );
}