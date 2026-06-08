/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Settings, X, Trash2, Save } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Workspace } from "@/types/projectType/project.type";

interface WorkspaceSettingsProps {
    workspace: Workspace;
}

export default function WorkspaceSettings({ workspace: initialWorkspace }: WorkspaceSettingsProps) {
    const router = useRouter();
    const [workspace, setWorkspace] = useState<Workspace>(initialWorkspace);
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState(workspace.name);
    const [description, setDescription] = useState(workspace.description || "");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState<"general" | "members">("general");

    const handleSaveWorkspace = async () => {
        if (!name.trim()) return;
        setIsSubmitting(true);
        const toastId = toast.loading("Updating workspace...");
        
        console.log("INTEGRATION: Service: workspaceService/workspace.service.ts -> updateWorkspace(workspaceId, data), Endpoint: PATCH /workspaces/${workspaceId}");

        setTimeout(() => {
            setWorkspace(prev => ({ ...prev, name, description }));
            toast.success("Workspace updated successfully (MOCK)", { id: toastId });
            setIsSubmitting(false);
            router.refresh();
        }, 600);
    };

    const handleDeleteWorkspace = async () => {
        if (!confirm("Are you sure you want to delete this workspace? This will delete all its boards and cards. This action cannot be undone.")) return;
        const toastId = toast.loading("Deleting workspace...");
        
        console.log("INTEGRATION: Service: workspaceService/workspace.service.ts -> deleteWorkspace(workspaceId), Endpoint: DELETE /workspaces/${workspaceId}");

        setTimeout(() => {
            toast.success("Workspace deleted successfully (MOCK)", { id: toastId });
            setIsOpen(false);
            router.push("/dashboard/projects");
            router.refresh();
        }, 600);
    };

    const handleUpdateMemberRole = async (userId: string, role: "admin" | "owner" | "member") => {
        const toastId = toast.loading("Updating member role...");
        
        console.log("INTEGRATION: Service: workspaceService/workspace.service.ts -> updateWorkspaceMemberRole(workspaceId, userId, { role }), Endpoint: PATCH /workspaces/${workspaceId}/members/${userId}");

        setTimeout(() => {
            setWorkspace(prev => ({
                ...prev,
                members: prev.members?.map(m => m.user_id === userId ? { ...m, role } : m)
            }));
            toast.success("Role updated successfully (MOCK)", { id: toastId });
            router.refresh();
        }, 600);
    };

    const handleRemoveMember = async (userId: string) => {
        if (!confirm("Are you sure you want to remove this member from the workspace?")) return;
        const toastId = toast.loading("Removing member...");
        
        console.log("INTEGRATION: Service: workspaceService/workspace.service.ts -> removeWorkspaceMember(workspaceId, userId), Endpoint: DELETE /workspaces/${workspaceId}/members/${userId}");

        setTimeout(() => {
            setWorkspace(prev => ({
                ...prev,
                members: prev.members?.filter(m => m.user_id !== userId)
            }));
            toast.success("Member removed successfully (MOCK)", { id: toastId });
            router.refresh();
        }, 600);
    };

    return (
        <>
            <button 
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 text-sm font-medium text-white px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition"
                title="Workspace Settings"
            >
                <Settings size={16} />
                <span className="hidden sm:inline">Settings</span>
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
                    <div className="bg-[#1C2126] border border-white/10 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                        
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Settings size={18} /> Workspace Settings (MOCK)
                            </h2>
                            <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white p-1 rounded hover:bg-white/10">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-white/10">
                            <button 
                                onClick={() => setActiveTab("general")}
                                className={`flex-1 py-2.5 text-sm font-medium transition ${activeTab === 'general' ? 'border-b-2 border-blue-500 text-blue-400 bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                            >
                                General Settings
                            </button>
                            <button 
                                onClick={() => setActiveTab("members")}
                                className={`flex-1 py-2.5 text-sm font-medium transition ${activeTab === 'members' ? 'border-b-2 border-blue-500 text-blue-400 bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                            >
                                Members ({workspace.members?.length || 0})
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="p-6 overflow-y-auto flex-1 space-y-4 custom-scrollbar">
                            {activeTab === "general" ? (
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="block text-sm font-medium text-white/80">Workspace Name</label>
                                        <input 
                                            type="text" 
                                            value={name} 
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter name..."
                                            className="w-full bg-[#22272B] border border-white/10 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="block text-sm font-medium text-white/80">Description</label>
                                        <textarea 
                                            value={description} 
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Enter description..."
                                            className="w-full bg-[#22272B] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                                        />
                                    </div>

                                    <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                                        <button 
                                            onClick={handleDeleteWorkspace}
                                            className="flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-4 py-2 rounded-lg transition"
                                        >
                                            <Trash2 size={16} />
                                            Delete Workspace
                                        </button>
                                        <button 
                                            onClick={handleSaveWorkspace}
                                            disabled={isSubmitting || !name.trim()}
                                            className="flex items-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition disabled:opacity-50"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {workspace.members?.map((member) => (
                                        <div key={member.id} className="flex items-center justify-between bg-[#22272B]/30 border border-white/5 p-3 rounded-xl">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white uppercase">
                                                    {member.user?.avatar_url ? (
                                                        <img src={member.user.avatar_url} alt="" className="w-full h-full object-cover rounded-full" />
                                                    ) : (
                                                        member.user?.name?.charAt(0) || "U"
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold text-white">{member.user?.name}</div>
                                                    <div className="text-xs text-white/50">{member.user?.email}</div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center gap-2">
                                                <select 
                                                    value={member.role}
                                                    onChange={(e) => handleUpdateMemberRole(member.user_id, e.target.value as "admin" | "owner" | "member")}
                                                    className="bg-[#22272B] border border-white/10 text-white rounded px-2.5 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                >
                                                    <option value="owner">Owner</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="member">Member</option>
                                                </select>
                                                <button 
                                                    onClick={() => handleRemoveMember(member.user_id)}
                                                    className="text-white/40 hover:text-red-400 p-1.5 rounded hover:bg-white/5 transition"
                                                    title="Remove from Workspace"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {(!workspace.members || workspace.members.length === 0) && (
                                        <p className="text-sm text-white/40 text-center py-4 italic">No members in this workspace.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
