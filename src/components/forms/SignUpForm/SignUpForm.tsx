'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { signUpFormDataType } from '@/types/auth';
import { signUp } from '@/actions/auth.actions';



export default function SignUpForm() {
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    getValues,
    reset,
  } = useForm<signUpFormDataType>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
  });

  const onSubmit = async (data: signUpFormDataType) => {
    try {
      await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
        rePassword: data.rePassword,
        phone: data.phone,
      });

      toast.success('Account created successfully! Logging you in...');

      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: '/',
      });
    } catch (error: any) {
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      reset();
    }
  };

  
  const getStrengthColor = (val: number) => {
    if (val === 0) return "bg-slate-200 dark:bg-slate-800";
    if (val < 25) return "bg-red-500";
    if (val < 50) return "bg-orange-500";
    if (val < 75) return "bg-amber-500";
    return "bg-emerald-500";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      
      
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Full Name</label>
        <Input
          placeholder="Ahmed Ali"
          className={`h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 ${errors.name ? 'border-red-500 focus-visible:border-red-500' : ''}`}
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 3, message: 'Name must be at least 3 characters' },
          })}
        />
        {errors.name && <p className="text-xs font-semibold text-red-500 px-1">{errors.name.message}</p>}
      </div>

      
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
        <Input
          type="email"
          placeholder="name@example.com"
          className={`h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 ${errors.email ? 'border-red-500 focus-visible:border-red-500' : ''}`}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.email && <p className="text-xs font-semibold text-red-500 px-1">{errors.email.message}</p>}
      </div>

      
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a strong password"
            className={`h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 pr-12 ${errors.password ? 'border-red-500 focus-visible:border-red-500' : ''}`}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Must be at least 8 characters' },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: 'Needs uppercase, lowercase, number, and symbol',
              }
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
        
        {errors.password && <p className="text-xs font-semibold text-red-500 px-1">{errors.password.message}</p>}
      </div>

      
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Confirm Password</label>
        <div className="relative">
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Repeat your password"
            className={`h-12 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 pr-12 ${errors.rePassword ? 'border-red-500 focus-visible:border-red-500' : ''}`}
            {...register('rePassword', {
              required: 'Please confirm your password',
              validate: (value) => value === getValues('password') || 'Passwords do not match',
            })}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.rePassword && <p className="text-xs font-semibold text-red-500 px-1">{errors.rePassword.message}</p>}
      </div>

      
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Phone Number</label>
        <div className="relative flex items-center">
          <div className="absolute left-0 h-12 px-3 flex items-center justify-center border-r border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/50 rounded-l-xl text-slate-500 text-sm font-bold pointer-events-none">
            +20
          </div>
          <Input
            type="tel"
            placeholder="1xxxxxxxxx"
            className={`h-12 pl-14 rounded-xl bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 ${errors.phone ? 'border-red-500 focus-visible:border-red-500' : ''}`}
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^(?:\+20|20|0)?1[0125][0-9]{8}$/,
                message: 'Invalid Egyptian phone number',
              },
              maxLength: { value: 11, message: 'Must be at most 11 digits' },
            })}
            onKeyDown={(e) => {
              const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
              if (!/^\d$/.test(e.key) && !allowed.includes(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </div>
        {errors.phone && <p className="text-xs font-semibold text-red-500 px-1">{errors.phone.message}</p>}
      </div>


      
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 rounded-xl font-bold text-base bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.98] mt-2 gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Creating Account...
          </>
        ) : (
          <>
            <UserPlus size={20} />
            Create My Account
          </>
        )}
      </Button>
    </form>
  );
}