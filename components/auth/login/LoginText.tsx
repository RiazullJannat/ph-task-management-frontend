import Image from "next/image";
import logo from "../../../public/images/OptiluxBD.png";
import { Check } from "lucide-react";

const LoginText = () => {
  const texts = [
    "Personalized recommendations and actionable insights",
    "Enhance sales performance and team productivity",
    "Engineered from your leads, orders, and customer data",
  ];
  return (
    <div className="space-y-8 px-4">
      <div className="flex items-center gap-2">
        <Image src={logo} height={100} width={100} alt="logo" />
        <h1 className="text-2xl font-semibold">Optilux</h1>
      </div>
      <div className="space-y-4">
        <h1 className="font-poppins text-2xl md:text-[32px] font-medium leading-tight md:leading-[42px] bg-linear-to-b from-[#C3C0D8] to-[#4E0C73] bg-clip-text text-transparent">
          Unlock Smarter Business Operations <br /> with OptiluxBD CRM
        </h1>
        <p className="font-poppins text-sm md:text-[16px] font-normal leading-relaxed text-[#9B98AE] self-stretch max-w-lg">
          Discover the power of smart CRM with data-driven insights, 
          crafted from your leads, orders, and team activities.
        </p>
      </div>

      <div className="space-y-3">
        {texts.map((text, i) => (
          <p key={i} className="flex items-start gap-2">
            <span className="text-[#9A8DEC] shrink-0 mt-1">
              <Check size={18} />
            </span>{" "}
            <span className="text-[#EEEBFF] text-sm md:text-base">{text}</span>
          </p>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-sm md:text-base leading-6 text-[#9B98AE]">
          Trusted by Growing Teams
        </h2>
        <Image
          src="https://res.cloudinary.com/dbb6nen3p/image/upload/v1766492541/suggestions_x7mozp.png"
          height={50}
          width={500}
          alt="suggestion"
          className="w-full max-w-[400px] h-auto opacity-80"
        />
      </div>
    </div>
  );
};

export default LoginText;
