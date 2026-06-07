
"use client";

import { usePasswordToggle } from "@/hooks/usePasswordToggle";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import logo from "../../../public/images/OptiluxBD.png";
import Image from "next/image";
import { Eye, EyeOff, MoveRight, X } from "lucide-react";
import Link from "next/link";
import { IoLogoGoogle } from "react-icons/io5";
import LargeYellowSvg from "@/components/svgIcon/LargeYellowSvg";
import { useState } from "react";
import SubmissionSuccess from "./SubmissionSuccess";
import { signIn } from "next-auth/react";

export const passwordRules = [
  { label: "Min 8 characters", regex: /^.{8,}$/ },
  { label: "At least 1 uppercase letter", regex: /[A-Z]/ },
  { label: "At least 1 lowercase letter", regex: /[a-z]/ },
  { label: "At least 1 number", regex: /[0-9]/ },
  { label: "At least 1 special character", regex: /[!@#$%^&*(),.?\":{}|<>]/ },
];

const registrationSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  // phone: z
  //   .string()
  //   .min(11, "please enter a valid phone number")
  //   .regex(/^01\d{9}$/, "please enter a valid phone number"),
  name: z.string().min(1, "Please enter your name"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must include at least one uppercase letter")
    .regex(/[a-z]/, "Must include at least one lowercase letter")
    .regex(/[0-9]/, "Must include at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Must include at least one special character",
    ),
});

export type TRegisterForm = z.infer<typeof registrationSchema>;

const RegisterComponent = () => {
  const { visible, toggle } = usePasswordToggle();
  const [passwordtext, setPasswordText] = useState("");
  const [touched, setTouched] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterForm>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: TRegisterForm) => {
    // data.phone = `+88${data.phone}`;
    // try {
    //   const res = await registration(data).unwrap();
    //   if (res?.success) {
    //     toast.success(res?.message, { duration: 3000 });
    //     setOpen(true);
    //     reset();
    //   }
    // } catch (error: any) {
    //   const errorInfo =
    //     error?.error ||
    //     error?.data?.errors[0]?.message ||
    //     error?.data?.message ||
    //     "Something went wrong!";
    //   toast.error(errorInfo, { duration: 3000 });
    // }
  };

  const handleSocialLogin = () => {
    signIn("google", {
      callbackUrl: "http://localhost:3000",
    });
  };

  return (
    <>
      {open ? (
        <SubmissionSuccess
          title="Check Your Email Inbox"
          content="we have sent a verification link to your email Please check your inbox "
          path="/verify-email"
          buttonName="send again"
          buttonTitle="Didn`t get any Email ?"
        />
      ) : (
        <div className="rounded-lg bg-[linear-gradient(331deg,rgba(238,235,255,0.04)_-7.38%,rgba(238,235,255,0.02)_-7.37%,rgba(238,235,255,0.08)_107.38%)] px-4 py-4 max-w-sm relative ">
          {/* top and bottom border */}
          <div className="absolute top-0 left-0 inset-2 border-l border-t border-[#221F33] rounded-tl-lg pointer-events-none" />
          <div className="absolute bottom-0 right-0 inset-2 border-r border-b border-[#221F33] rounded-br-lg pointer-events-none" />

          <div className="space-y-4">
            <div className="space-y-5">
              <div className="flex items-center justify-start">
                <Link href="/">
                  <Image src={logo} height={100} width={100} alt="brand logo" />
                </Link>
              </div>

              <div className="space-y-1">
                <h1 className="text-2xl font-medium text-[#C3C0D8]">
                  Sign Up for free
                </h1>
                <p className="text-[#9B98AE]">Complete the form to start</p>
              </div>

              <button
                onClick={handleSocialLogin}
                className="font-medium py-2 w-full rounded-full flex items-center justify-center text-[#C3C0D8] border border-[#2C293D] gap-2 cursor-pointer hover:bg-white/5 duration-300"
              >
                <IoLogoGoogle /> Sign Up with Google
              </button>

              <div className="flex items-center gap-2 px-6 py-1">
                <div className="border border-[#2C293D] w-full" />
                <span>OR</span>
                <div className="border border-[#2C293D] w-full" />
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
              {/* name */}
              <input
                id="name"
                type="text"
                placeholder="Enter your Name"
                className={`${
                  errors.email && "border-red-500 dark:border-red-400"
                } bg-transparent text-[#514D6A] placeholder:text-[#514D6A] placeholder:text-sm outline-none border border-[#2C293D] py-2 px-5 rounded-full w-full`}
                {...register("name", { required: "Name is required" })}
              />
              {/* email */}
              <input
                id="email"
                type="email"
                placeholder="Email Address"
                className={`${
                  errors.email && "border-red-500 dark:border-red-400"
                } bg-transparent text-[#514D6A] placeholder:text-[#514D6A] placeholder:text-sm outline-none border border-[#2C293D] py-2 px-5 rounded-full w-full`}
                {...register("email", { required: "Email is required" })}
              />
              {/* <input
                id="phone"
                type="phone"
                placeholder="Phone Number"
                className={`${
                  errors.email && "border-red-500 dark:border-red-400"
                } bg-transparent text-[#514D6A] placeholder:text-[#514D6A] placeholder:text-sm outline-none border border-[#2C293D] py-2 px-5 rounded-full w-full`}
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^01\d{9}$/,
                    message: "please enter a valid phone number",
                  },
                })}
              /> */}
              {/* Password */}

              <div className="relative space-y-1">
                <input
                  id="password"
                  type={visible ? "text" : "password"}
                  placeholder="Password"
                  className={`${
                    errors.password && "border-red-500 dark:border-red-400"
                  } bg-transparent text-[#514D6A] placeholder:text-[#514D6A] placeholder:text-sm outline-none border border-[#2C293D] py-2 px-5 rounded-full w-full`}
                  {...register("password", {
                    required: "Password is required",
                    onChange: (e) => {
                      setPasswordText(e.target.value);
                      setTouched(true);
                    },
                    onBlur: () => setTouched(true),
                  })}
                />
                <button
                  type="button"
                  onClick={toggle}
                  className="absolute right-4 top-3 text-[#514D6A] "
                >
                  {visible ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>

                {touched && (
                  <div className=" space-y-1">
                    {passwordRules
                      .filter((rule) => !rule.regex.test(passwordtext || ""))
                      .map((rule) => (
                        <div
                          key={rule.label}
                          className="flex items-center gap-2 text-sm transition-all duration-200 ease-in-out"
                        >
                          <X size={14} className="text-red-700" />
                          <span className="text-[#514D6A]">{rule.label}</span>
                        </div>
                      ))}
                  </div>
                )}
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
                  <span className="text-sm">Create An Account</span>
                  <MoveRight />
                </p>
              </button>
            </form>

            {/* Registration Link */}
            <p className="flex justify-center gap-1 text-[#9B98AE]">
              Already have an account?
              <Link
                className="bg-linear-to-b from-[#C3C0D8] to-[#4E0C73] bg-clip-text text-transparent underline underline-offset-2 decoration-[#4E0C73]"
                href="/login"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterComponent;
