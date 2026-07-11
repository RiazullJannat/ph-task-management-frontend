/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { usePasswordToggle } from "@/hooks/usePasswordToggle";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Eye, EyeOff, Loader2, MoveRight } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/provider/AuthProvider";
import { login } from "@/service/authService";
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type TLoginData = z.infer<typeof loginSchema>;

const LoginComponent = () => {
  const router = useRouter();
  const { visible, toggle } = usePasswordToggle();
  const [redirect, setRedirect] = useState<string | null>(null);
  const { refetchUser, setIsLoading } = useUser();

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TLoginData>({
    resolver: zodResolver(loginSchema),
  });

  const handleFastLogin = () => {
    setValue('email', 'riazull.jannat@gmail.com');
    setValue('password', 'rjannat77111');
    handleSubmit(onSubmit)();
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectParam = params.get("redirectPath");
    if (redirectParam) {
      Promise.resolve().then(() => setRedirect(redirectParam));
    }
  }, []);

  const onSubmit = async (data: TLoginData) => {
    const toastId = toast.loading("Signing in...");
    try {
      const res = await login(data);
      if (res?.success) {
        setIsLoading(false);
        await refetchUser();
        toast.success(res?.message, { id: toastId, duration: 3000 });
        reset();
        router.push(redirect ? redirect : "/dashboard/tasks");
      } else {
        toast.error(res?.error?.message ?? res?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      toast.error("Something went wrong!", { id: toastId, duration: 3000 });
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-sm mx-auto"
    >
      {/* Card */}
      <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-yellow-400/30 rounded-tl-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-purple-400/20 rounded-br-2xl pointer-events-none" />

        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-yellow-400 rounded-lg flex items-center justify-center shadow-lg shadow-yellow-400/20">
                <div className="w-3 h-3 border-[2.5px] border-[#030115] rotate-45" />
              </div>
              <span className="text-sm font-bold text-white/60 tracking-wide">TaskFlow</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="text-sm text-[#9B98AE]">Sign in to your workspace</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/50 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className={`w-full bg-white/[0.05] border ${
                  errors.email ? "border-red-500/60" : "border-white/[0.08]"
                } rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-yellow-400/40 focus:bg-white/[0.07] transition-all`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-white/50 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={visible ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full bg-white/[0.05] border ${
                    errors.password ? "border-red-500/60" : "border-white/[0.08]"
                  } rounded-xl px-4 py-2.5 pr-11 text-sm text-white placeholder:text-white/20 outline-none focus:border-yellow-400/40 focus:bg-white/[0.07] transition-all`}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={toggle}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {visible ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-400">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full cursor-pointer bg-white/[0.05] rounded-xl py-2.5 flex items-center justify-center gap-2 overflow-hidden text-white text-sm font-medium hover:bg-white/[0.08] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {/* Yellow glow bottom border */}
              <div className="pointer-events-none absolute bottom-0 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2">
                <span className="block h-[1.5px] w-full bg-[linear-gradient(to_right,rgba(255,177,63,0)_0%,#FFB13F_50%,rgba(255,177,63,0)_100%)]" />
              </div>
              {/* Yellow radial glow */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(255,177,63,0.12),transparent_70%)]" />

              {isSubmitting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  <span>Continue</span>
                  <MoveRight size={16} />
                </>
              )}
            </button>

            {/* Fast Login */}
            <button
              type="button"
              onClick={handleFastLogin}
              disabled={isSubmitting}
              className="w-full cursor-pointer bg-[#51A2FF]/10 border border-[#51A2FF]/20 rounded-xl py-2.5 flex items-center justify-center text-[#51A2FF] text-sm font-medium hover:bg-[#51A2FF]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-3"
            >
              Fast Login (Demo)
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-xs text-white/20">or</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Register link */}
          <p className="text-center text-sm text-[#9B98AE]">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginComponent;
