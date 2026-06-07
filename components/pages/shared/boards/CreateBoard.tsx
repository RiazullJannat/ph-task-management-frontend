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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { Plus } from "lucide-react";
import { toast } from 'sonner';
import { createBoard } from '@/service/boardService/board.service';
import { TCreateBoardPayload } from '@/types/baordType/board.type';

export default function CreateBoard({ workspaceId }: { workspaceId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#3B82F6");
  const [visibility, setVisibility] = useState("public");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const toastId = toast.loading("Creating board please wait...");
    
    try {
      const data: TCreateBoardPayload = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        background_color: backgroundColor,
        visibility: visibility,
      };
      
      const res = await createBoard(workspaceId, data);
      if (res?.success) {
        toast.success("Board created successfully", { id: toastId });
        setIsOpen(false);
      } else {
        toast.error(res?.message || "Failed to create board", { id: toastId });
      }
    } catch (error) {
      toast.error("An error occurred", { id: toastId });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 bg-[#FFB13F] text-[#030115] px-4 py-2 rounded-full font-medium hover:bg-[#ffbe5e] transition text-sm">
          <Plus size={18} />
          Create Board
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]! bg-[#030115] text-white border-white/10">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-[#C3C0D8]">Create New Board</DialogTitle>
          <DialogDescription className="text-[#9B98AE]">
            Add a new board to this workspace.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-[#C3C0D8]">
              Board Name <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Marketing Campaign"
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
              placeholder="Describe your board..."
              className="bg-transparent border-[#2C293D] text-[#C3C0D8] placeholder:text-[#514D6A] min-h-[80px]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#C3C0D8]">
              Visibility
            </label>
            <Select value={visibility} onValueChange={setVisibility}>
              <SelectTrigger className="bg-transparent border-[#2C293D] text-[#C3C0D8]">
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="workspace">Workspace</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#C3C0D8]">
              Background Color
            </label>
            <div className="flex gap-2 mt-1">
              {['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#6B7280'].map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-8 h-8 rounded-full transition-all duration-200 ${backgroundColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-[#030115] scale-110' : 'hover:scale-110 opacity-80 hover:opacity-100'}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setBackgroundColor(color)}
                />
              ))}
            </div>
          </div>

          <DialogFooter className="mt-4">
            <ButtonComponent
              type="submit"
              varient="yellow"
              buttonName="Create Board"
              clasName="w-full"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
