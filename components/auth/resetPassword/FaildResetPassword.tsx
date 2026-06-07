import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const FaildResetPassword = () => {
  return (
    <div className="bg-[#ffffff] dark:bg-gray-800 p-8 lg:w-[30vw] space-y-6 text-center rounded-xl shadow-md dark:shadow-none">
      <div className="w-[30vw] lg:w-[8vw] mx-auto">
        <Image
          src={`https://optilux.com.bd/OptiluxImage/OptiluxBD-Png%20(logo).png`}
          height={500}
          width={500}
          alt="brand logo"
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-red-600">
          Verification Failed
        </h2>
        <p className="text-sm text-gray-400">
          Sorry, your verification link is invalid or expired.
        </p>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <Button
          className="w-full bg-yellow-500 hover:bg-[#ffc500] text-white"
          asChild
        >
          <Link href="/forgot-password">Return</Link>
        </Button>

        <p className="text-gray-400 text-sm">
          or{" "}
          <Link
            className="border-b border-[#ffc500] text-yellow-600"
            href="/login"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FaildResetPassword;
