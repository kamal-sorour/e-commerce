"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fake submit function للتجربة فقط (بما إنها استاتيك)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // هنا ممكن تحط Toast Success Message من Shadcn
      toast.success("Your message has been sent! We'll get back to you soon.");
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Full Name
          </label>
          <Input
            id="name"
            placeholder="John Doe"
            required
            className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            required
            className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-bold text-slate-700 dark:text-slate-300">
          Subject
        </label>
        <Select required>
          <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-emerald-500/20 focus:border-emerald-500">
            <SelectValue placeholder="How can we help you?" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-slate-200 dark:border-slate-800">
            <SelectItem value="general">General Inquiry</SelectItem>
            <SelectItem value="order">Order Support</SelectItem>
            <SelectItem value="shipping">Shipping Question</SelectItem>
            <SelectItem value="returns">Returns & Refunds</SelectItem>
            <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-bold text-slate-700 dark:text-slate-300">
          Message
        </label>
        <Textarea
          id="message"
          placeholder="Tell us everything..."
          required
          rows={6}
          className="resize-none rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500"
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full md:w-auto h-12 px-8 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.98] gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send size={18} />
          </>
        )}
      </Button>
    </form>
  );
}