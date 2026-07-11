/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { TProject } from "@/types/annotate/annotate.types";
import ProjectCard from "./ProjectCard";
import CreateProjectModal from "./CreateProjectModal";
import UpdateProjectModal from "./UpdateProjectModal";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { Plus } from "lucide-react";
import { deleteProject } from "@/service/annotateService/annotate.service";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useFilters from "@/hooks/useFilters";
import ResetButton from "@/components/ui/ResetButton";
import DateSelector from "../tasks/DateSelector";

export default function AllProjects({ projects }: { projects: TProject[] }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [updateProjectState, setUpdateProjectState] = useState<TProject | null>(null);
    const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!deleteProjectId) return;
        setIsDeleting(true);
        try {
            const res = await deleteProject(deleteProjectId);
            if (res?.message || !res?.error) {
                toast.success("Project deleted successfully");
            } else {
                toast.error("Failed to delete project");
            }
        } catch (error) {
            toast.error("An error occurred while deleting project");
        } finally {
            setIsDeleting(false);
            setDeleteProjectId(null);
        }
    }

    const { handleChange, getParam, setShow, setCurrentPage } = useFilters();
    const selectedDate = getParam('date') ?? '';

    return (
        <div className="mt-8">
            <div className="flex xl:flex-row justify-between items-start xl:items-center gap-4 ">
                <div className="w-full xl:w-auto">
                    <Input
                        className="w-full xl:w-64 text-sm bg-transparent"
                        onChange={(e) => handleChange("title", e.target.value)}
                        placeholder="Search projects..."
                    />
                </div>
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center w-full xl:w-auto">
                    <div className="flex md:gap-4 justify-between w-full">
                        <DateSelector selectedDate={selectedDate} onChange={(date) => handleChange('date', date)} />
                        <ResetButton setLimit={setShow} setCurrPage={setCurrentPage} />
                        <ButtonComponent
                            buttonName="Project"
                            hideTextOnMobile={true}
                            varient="yellow"
                            icon={Plus}
                            onClick={() => setIsCreateModalOpen(true)}
                        />
                    </div>
                </div>
            </div>

            {projects?.length > 0 ? (
                <div className="my-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onEdit={(p) => setUpdateProjectState(p)}
                            onDelete={(id) => setDeleteProjectId(id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-xl bg-white/5">
                    <p className="text-white/60 mb-4 text-center max-w-sm">You don't have any annotation projects yet. Create one to get started.</p>
                    <ButtonComponent
                        buttonName="Create Project"
                        icon={Plus}
                        varient="yellow"
                        onClick={() => setIsCreateModalOpen(true)}
                    />
                </div>
            )}

            <CreateProjectModal isOpen={isCreateModalOpen} setIsOpen={setIsCreateModalOpen} />

            <UpdateProjectModal
                project={updateProjectState}
                isOpen={!!updateProjectState}
                setIsOpen={(open) => !open && setUpdateProjectState(null)}
            />

            <Dialog open={!!deleteProjectId} onOpenChange={(open) => !open && setDeleteProjectId(null)}>
                <DialogContent showCloseButton className="w-[90%] md:max-w-md! bg-[#0d0a1f] border-white/10 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-white">Delete Project</DialogTitle>
                        <DialogDescription className="text-white/60 mt-2">
                            Are you sure you want to delete this project? This action cannot be undone and will permanently remove all images and annotations associated with it.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-white/10">
                        <ButtonComponent
                            type="button"
                            buttonName="Cancel"
                            varient="default"
                            onClick={() => setDeleteProjectId(null)}
                            className="text-white/70 hover:bg-white/10"
                        />
                        <ButtonComponent
                            type="button"
                            buttonName={isDeleting ? "Deleting..." : "Delete"}
                            varient="red"
                            disabled={isDeleting}
                            onClick={handleDelete}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
