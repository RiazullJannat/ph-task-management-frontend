"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { updateProject } from "@/service/annotateService/annotate.service";
import { TProject } from "@/types/annotate/annotate.types";
import { toast } from "sonner";

export default function UpdateProjectModal({
  project,
  isOpen,
  setIsOpen,
}: {
  project: TProject | null;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setTitle(project.title || "");
      setDescription(project.description || "");
    }
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;
    if (!title) {
      toast.error("Title is required");
      return;
    }

    setLoading(true);
    try {
      const res = await updateProject({ title, description }, project.id);
      if (res?.message || res?.data || !res?.error) { 
        toast.success("Project updated successfully");
        setIsOpen(false);
      } else {
        toast.error("Failed to update project");
      }
    } catch (error) {
      toast.error("An error occurred while updating project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent showCloseButton className="w-[90%] max-h-[85vh] overflow-y-auto md:max-w-2xl! bg-[#0d0a1f] border-white/10 text-white custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white mb-2">Update Project</DialogTitle>
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
              buttonName={loading ? "Updating..." : "Update Project"}
              varient="yellow"
              disabled={loading}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
