"use client";

import { useState } from "react";
import { UserPlus, X } from "lucide-react";
import { toast } from "sonner";
import { addMemberToWorkspace } from "@/service/workspaceService/workspace.service";
import { User, UserList } from "@/types/userType/user.type";

export default function AddWorkspaceMember({ workspaceId, users }: { workspaceId: string, users: UserList }) {
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState("");
    const [selectedRole, setSelectedRole] = useState("member");
    const [isSubmittingMember, setIsSubmittingMember] = useState(false);

    const handleAddMember = async () => {
        if (!selectedEmail) return;
        setIsSubmittingMember(true);
        const toastId = toast.loading('Adding member...');
        try {
            const res = await addMemberToWorkspace(workspaceId, { email: selectedEmail, role: selectedRole });
            console.log(res);
            if (res.success) {
                toast.success(res.message || 'Member added successfully', { id: toastId });
                setIsAddMemberModalOpen(false);
                setSelectedEmail("");
                setSelectedRole("member");
            } else {
                toast.error(res.message || 'Failed to add member', { id: toastId });
            }
        } catch (error) {
            toast.error('Failed to add member', { id: toastId });
        } finally {
            setIsSubmittingMember(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsAddMemberModalOpen(true)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition text-sm font-medium border border-white/5"
            >
                <UserPlus size={16} />
                Add Member
            </button>

            {isAddMemberModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#1C2126] border border-white/10 rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="p-4 border-b border-white/10 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-white">Add Member to Workspace</h2>
                            <button
                                onClick={() => setIsAddMemberModalOpen(false)}
                                className="text-white/60 hover:text-white transition p-1 rounded hover:bg-white/10"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-1.5">User</label>
                                <div className="relative">
                                    <select
                                        value={selectedEmail}
                                        onChange={(e) => setSelectedEmail(e.target.value)}
                                        className="w-full bg-[#22272B] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-10"
                                    >
                                        <option value="">Select a user...</option>
                                        {users?.map((user: User) => (
                                            <option key={user.id} value={user.email}>{user.name} ({user.email})</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white/50">
                                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-1.5">Role</label>
                                <div className="relative">
                                    <select
                                        value={selectedRole}
                                        onChange={(e) => setSelectedRole(e.target.value)}
                                        className="w-full bg-[#22272B] border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-10"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="member">Member</option>
                                        <option value='owner'>Owner</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-white/50">
                                        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t border-white/10 flex justify-end gap-2 bg-[#101204]/50">
                            <button
                                onClick={() => setIsAddMemberModalOpen(false)}
                                className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white bg-transparent hover:bg-white/5 rounded-lg transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddMember}
                                disabled={!selectedEmail || isSubmittingMember}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 rounded-lg transition"
                            >
                                {isSubmittingMember ? 'Adding...' : 'Add Member'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
