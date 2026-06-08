/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { usePasswordToggle } from "@/hooks/usePasswordToggle";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import logo from "../../../public/images/OptiluxBD.png";
import Image from "next/image";
import { Eye, EyeOff, MoveRight } from "lucide-react";
import Link from "next/link";
import LargeYellowSvg from "@/components/svgIcon/LargeYellowSvg";
import { useUser } from "@/provider/AuthProvider";
import { login } from "@/service/authService";

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
    formState: { errors, isSubmitting },
  } = useForm<TLoginData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectParam = params.get("redirectPath");
    if (redirectParam) {
      Promise.resolve().then(() => {
        setRedirect(redirectParam);
      });
    }
  }, []);

  const onSubmit = async (data: TLoginData) => {
    const toastId = toast.loading("logging in");
    try {
     const res = await login(data);
      if (res?.success) {
        setIsLoading(false);
        await refetchUser();
        toast.success(res?.message, { id: toastId, duration: 3000 });
        reset();  
        // router.push(redirect ? redirect : "/dashboard/profile");
      } else {
        toast.error(res?.error?.messae, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      toast.error("Something went wrong!", { id: toastId, duration: 3000 });
      console.log(error);
    }
  };

  const handleAdmin = async (data: { email: string; password: string }) => {
    const toastId = toast.loading("logging in");
    try {
      const res = await login(data);
      console.log(res)
      if (res?.success) {
        setIsLoading(false);
        await refetchUser();
        toast.success(res?.message, { id: toastId, duration: 3000 });
        reset();
        router.push(redirect ? redirect : "/dashboard");
      } else {
        toast.error(res?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      toast.error("Something went wrong!", { id: toastId, duration: 3000 });
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto sm:mx-0 rounded-lg bg-[linear-gradient(331deg,rgba(238,235,255,0.04)_-7.38%,rgba(238,235,255,0.02)_-7.37%,rgba(238,235,255,0.08)_107.38%)] px-5 py-6 effect-no-bg">
      <div className="space-y-6">
        <div className="space-y-5">
          <div className="flex items-center justify-start">
            <Link href="/">
              <Image
                src={logo}
                height={80}
                width={100}
                alt="brand logo"
                className="h-auto w-24"
              />
            </Link>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-medium text-[#C3C0D8]">
              Welcome Back
            </h1>
            <p className="text-[#9B98AE] text-sm">
              Sign in to your account for access
            </p>
          </div>

          {/* Quick Login Buttons */}
          <div className="space-y-1.5 p-2.5 rounded-lg bg-white/5 border border-white/10 text-[10px]">
            <span className="text-slate-400 font-bold uppercase block mb-1">Quick Login Demo Accounts:</span>
            <div className="grid grid-cols-3 gap-1">
              <button
                type="button"
                onClick={() => handleAdmin({ email: 'rjannat1@gmail.com', password: 'rjannat77111' })}
                className="bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/20 text-blue-300 py-1 px-1 rounded transition text-center font-bold"
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => handleAdmin({ email: 'project@manager.com', password: 'projectmanager@123' })}
                className="bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/20 text-purple-300 py-1 px-1 rounded transition text-center font-bold"
              >
                Manager
              </button>
              <button
                type="button"
                onClick={() => handleAdmin({ email: 'team@member.com', password: 'teammember@123' })}
                className="bg-emerald-600/20 hover:bg-emerald-600/40 border border-emerald-500/20 text-emerald-300 py-1 px-1 rounded transition text-center font-bold"
              >
                Member
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 py-1">
            <div className="border border-[#2C293D] w-full" />
            <span className="text-xs text-white/40">OR</span>
            <div className="border border-[#2C293D] w-full" />
          </div>
        </div>



        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          {/* Email */}
          <input
            id="email"
            type="email"
            placeholder="Email Address"
            className={`${
              errors.email && "border-red-500 dark:border-red-400"
            } bg-transparent text-[#514D6A] placeholder:text-[#514D6A] placeholder:text-sm outline-none border border-[#2C293D] py-2 px-5 rounded-full w-full`}
            {...register("email", { required: "Email is required" })}
          />

          {/* Password */}

          <div className="relative space-y-3">
            <input
              id="password"
              type={visible ? "text" : "password"}
              placeholder="Password"
              className={`${
                errors.password && "border-red-500 dark:border-red-400"
              } bg-transparent text-[#514D6A] placeholder:text-[#514D6A] placeholder:text-sm outline-none border border-[#2C293D] py-2 px-5 rounded-full w-full`}
              {...register("password", { required: "Password is required" })}
            />
            <button
              type="button"
              onClick={toggle}
              className="absolute right-4 top-3 text-[#514D6A] "
            >
              {visible ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
            <Link
              href="/forgot-password"
              className=" text-sm bg-[linear-gradient(180deg,#C3C0D8_0%,#7361E5_100%)] bg-clip-text text-transparent underline underline-offset-2 decoration-[#7361E5]"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="relative cursor-pointer bg-white/5 rounded-xl py-2 flex items-center justify-center px-4 overflow-hidden w-full text-white"
          >
            {/* top and bottom line */}
            <div className="absolute top-0 left-0 inset-3 border-l border-t border-white/20 rounded-tl-xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 inset-3 border-r border-b border-white/20 rounded-br-xl pointer-events-none" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 z-20">
              <span className="block h-[1.5px] w-full bg-[linear-gradient(to_right,rgba(255,177,63,0)_0%,#FFB13F_50%,rgba(255,177,63,0)_100%)]" />
            </div>
            <div className="pointer-events-none">
              <LargeYellowSvg />
            </div>

            {/* Button text */}
            <p className="flex items-center gap-2">
              <span className="text-sm">Continue</span>
              <MoveRight />
            </p>
          </button>
        </form>

        {/* Registration Link */}
        <p className="flex justify-center gap-1 text-[#9B98AE]">
          New here ?
          <Link
            className="bg-linear-to-b from-[#C3C0D8] to-[#4E0C73] bg-clip-text text-transparent underline underline-offset-2 decoration-[#4E0C73]"
            href="/register"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
