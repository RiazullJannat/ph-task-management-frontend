"use client";

import ButtonComponent from "@/components/ui/ButtonComponent";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { register } from "@/service/authService";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function OrganizationRegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleRegister = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    const res = await register(formData);
    if(res?.success){
      toast.success("Register success");
      router.push("/login")
    }else{
      toast.error(res?.message ?? "Register failed");
    }
    setLoading(false);
  }

  return (
    <div className="effect p-6 rounded-2xl my-6 border bg-card shadow-sm">
      <div className="space-y-5">
        <div className="flex items-center justify-start">
          <span className="text-xl font-bold">Smart Project Kanban</span>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-medium text-[#C3C0D8]">
            Sign Up for free
          </h1>
          <p className="text-[#9B98AE]">Create your team workspace</p>
        </div>

        <div className="flex items-center gap-2 px-6 py-1">
          <div className="border border-[#2C293D] w-full" />
          <span>OR</span>
          <div className="border border-[#2C293D] w-full" />
        </div>
      </div>

      <form className="space-y-6 mt-6" onSubmit={handleRegister}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Name <span className="text-red-500">*</span></label>
            <Input 
              required
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              placeholder="Enter name" 
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email <span className="text-red-500">*</span></label>
            <Input 
              required
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              type="email" 
              placeholder="Enter email address" 
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password <span className="text-red-500">*</span></label>
            <div className="relative">
              <Input 
                required
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                type={showPassword ? "text" : "password"} 
                placeholder="Create a password" 
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Role <span className="text-red-500">*</span></label>
            <Select 
              required
              value={formData.role} 
              onValueChange={(val) => setFormData({...formData, role: val})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="team_member">Team Member</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="project_manager">Project Manager</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <ButtonComponent
          type="submit"
          clasName="w-full h-11"
          varient="yellow"
          buttonName={loading ? "Registering..." : "Register"}
          disable={loading}
          onClick={() => handleRegister()}
        />
      </form>
      <p className="flex justify-center gap-1 text-[#9B98AE] mt-4">
        Already have an account?
        <Link
          className="bg-linear-to-b from-[#C3C0D8] to-[#4E0C73] bg-clip-text text-transparent underline underline-offset-2 decoration-[#4E0C73]"
          href="/login"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
