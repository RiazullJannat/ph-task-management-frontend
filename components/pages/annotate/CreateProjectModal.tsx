"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { createProject } from "@/service/annotateService/annotate.service";
import { toast } from "sonner";
import { X, UploadCloud, ImageIcon } from "lucide-react";

export default function CreateProjectModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Creating project...");
    if (!title) {
      toast.error("Title is required", { id: toastId });
      return;
    }
    if (images.length === 0) {
      toast.error("Please select at least one image", { id: toastId });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      images.forEach((img) => formData.append("images", img));

      const res = await createProject(formData);
      if (res?.message) {
        toast.success(res.message || "Project created successfully", { id: toastId });
        setIsOpen(false);
        setTitle("");
        setDescription("");
        setImages([]);
      } else {
        toast.error("Failed to create project", { id: toastId });
      }
    } catch (error) {
      toast.error("An error occurred while creating project", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent showCloseButton className="max-w-2xl! bg-[#0d0a1f] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white mb-2">Create Annotation Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Project Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Medical Image Dataset"
              className="bg-black/20 border-white/10 text-white placeholder:text-white/30"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief description of this project..."
              className="bg-black/20 border-white/10 text-white placeholder:text-white/30 min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Images</label>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:bg-white/5 transition-colors cursor-pointer relative">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <UploadCloud className="w-10 h-10 text-white/40 mx-auto mb-3" />
              <p className="text-sm text-white/60">Click or drag images to upload</p>
            </div>
            
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {images.map((file, index) => (
                  <div key={index} className="relative group rounded-lg overflow-hidden border border-white/10 bg-black/20 flex items-center p-2">
                     <ImageIcon className="w-5 h-5 text-white/50 mr-2 flex-shrink-0" />
                     <span className="text-xs text-white/70 truncate flex-1">{file.name}</span>
                     <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="ml-2 text-white/50 hover:text-[var(--accent-red)] opacity-0 group-hover:opacity-100 transition-opacity"
                     >
                       <X className="w-4 h-4" />
                     </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
            <ButtonComponent
              type="button"
              buttonName="Cancel"
              varient="red"
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:bg-white/10"
            />
            <ButtonComponent
              type="submit"
              buttonName={loading ? "Creating..." : "Create Project"}
              varient="yellow"
              disabled={loading}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
