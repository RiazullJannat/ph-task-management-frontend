"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { Plus } from "lucide-react";
import { toast } from 'sonner';
import { createWorkspace } from '@/service/workspaceService/workspace.service';

export default function AddProject() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const toastId = toast.loading("Project creating please wait...")
    try {
      const data = {
        name: formData.get("title") as string,
        description: formData.get("description") as string
      }
      const res = await createWorkspace(data)
      if (res?.success) {
        toast.success("Project created successfully", { id: toastId });
        setIsOpen(false);
      } else {
        toast.error(res?.message || "Failed to create project", { id: toastId });
      }
    } catch (error) {
      toast.error("Failed to create project", { id: toastId });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 bg-[#FFB13F] text-[#030115] px-4 py-2 rounded-full font-medium hover:bg-[#ffbe5e] transition text-sm">
          <Plus size={18} />
          Create Project
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]! bg-[#030115] text-white border-white/10">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-[#C3C0D8]">Create New Project</DialogTitle>
          <DialogDescription className="text-[#9B98AE]">
            Add a new project to your workspace. Set the title and description below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-medium text-[#C3C0D8]">
              Project Title <span className="text-red-500">*</span>
            </label>
            <Input
              id="title"
              name="title"
              placeholder="e.g. Website Redesign"
              required
              className="bg-transparent border-[#2C293D] text-[#C3C0D8] placeholder:text-[#514D6A]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-medium text-[#C3C0D8]">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your project..."
              className="bg-transparent border-[#2C293D] text-[#C3C0D8] placeholder:text-[#514D6A] min-h-[120px]"
            />
          </div>
          <DialogFooter className="mt-4">
            <ButtonComponent
              type="submit"
              varient="yellow"
              buttonName="Save Project"
              clasName="w-full"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
