/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { AlignLeft, Plus, CheckSquare, UserPlus, Paperclip, MessageSquare, X } from "lucide-react";
import { toast } from "sonner";
import { addMemberToCard } from "@/service/listService/list.service";
import { TBoardDetails } from "@/types/baordType/board.type";

interface CardDetailsModalProps {
    card: any;
    board: TBoardDetails;
    projectId: string;
    onClose: () => void;
}

export default function CardDetailsModal({ card, board, projectId, onClose }: CardDetailsModalProps) {
    const [isAssigningMember, setIsAssigningMember] = useState(false);

    const handleAssignMember = async (userId: string) => {
        if (!card) return;
        const toastId = toast.loading('Assigning member...');
        try {
            const res = await addMemberToCard(board?.id, card.id, userId, projectId);
            if (res.success) {
                toast.success(res.message, { id: toastId });
            } else {
                toast.error(res.message || 'Failed to assign member', { id: toastId });
            }
        } catch (error) {
            toast.error('Failed to assign member', { id: toastId });
        } finally {
            setIsAssigningMember(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
            <div 
                className="bg-[#323940] w-full max-w-4xl max-h-full overflow-y-auto rounded-xl shadow-2xl flex flex-col relative border border-white/10"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/50 hover:text-white p-1 hover:bg-white/10 rounded transition z-10"
                >
                    <X size={20} />
                </button>

                {/* Top Section - Template Banner Example */}
                {card.is_template && (
                    <div className="bg-[#1A2C42] p-4 flex items-center justify-between border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-400 p-1.5 rounded"><AlignLeft size={16} className="text-white" /></div>
                            <span className="text-white font-medium">This is a Template card.</span>
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-medium transition flex items-center gap-2">
                            <Plus size={14} /> Create card from template
                        </button>
                    </div>
                )}

                <div className="flex flex-col md:flex-row p-6 gap-6">
                    {/* Left Column */}
                    <div className="flex-1 space-y-8">
                        {/* Title Area */}
                        <div className="flex items-start gap-4">
                            <div className="mt-1 text-white/70"><AlignLeft size={24} /></div>
                            <div className="flex-1">
                                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">{card.title}</h2>
                                <p className="text-sm text-white/60">in list <span className="underline cursor-pointer">{board.lists?.find(l => l.id === card.list_id)?.name || "Unknown List"}</span></p>
                            </div>
                        </div>

                        {/* Action Buttons Row */}
                        <div className="flex flex-wrap gap-2 pl-10">
                            <button className="flex items-center gap-2 bg-transparent border border-white/20 hover:bg-white/10 text-white/90 px-3 py-1.5 rounded text-sm transition">
                                <Plus size={16} /> Add
                            </button>
                            <button className="flex items-center gap-2 bg-transparent border border-white/20 hover:bg-white/10 text-white/90 px-3 py-1.5 rounded text-sm transition">
                                <AlignLeft size={16} /> Labels
                            </button>
                            <button className="flex items-center gap-2 bg-transparent border border-white/20 hover:bg-white/10 text-white/90 px-3 py-1.5 rounded text-sm transition">
                                <CheckSquare size={16} /> Checklist
                            </button>
                            
                            {/* Members Dropdown */}
                            <div className="relative">
                                <button 
                                    onClick={() => setIsAssigningMember(!isAssigningMember)}
                                    className="flex items-center gap-2 bg-transparent border border-white/20 hover:bg-white/10 text-white/90 px-3 py-1.5 rounded text-sm transition"
                                >
                                    <UserPlus size={16} /> Members
                                </button>
                                
                                {isAssigningMember && (
                                    <div className="absolute top-full left-0 mt-2 w-64 bg-[#282E33] border border-white/10 rounded-lg shadow-xl z-20 py-2">
                                        <div className="px-3 pb-2 mb-2 border-b border-white/10 flex justify-between items-center">
                                            <h4 className="text-sm font-semibold text-white/80">Members</h4>
                                            <button onClick={() => setIsAssigningMember(false)} className="text-white/50 hover:text-white"><X size={14} /></button>
                                        </div>
                                        <div className="max-h-64 overflow-y-auto custom-scrollbar px-2 space-y-1">
                                            {board.members?.map((member) => (
                                                <button 
                                                    key={member.user_id}
                                                    onClick={() => handleAssignMember(member.user_id)}
                                                    className="w-full flex items-center gap-3 text-left text-sm text-white/90 hover:bg-white/10 p-2 rounded transition"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold overflow-hidden flex-shrink-0">
                                                        {member.user.avatar_url ? (
                                                            <img src={member.user.avatar_url} alt="" className="w-full h-full object-cover" />
                                                        ) : (
                                                            member.user.name.charAt(0).toUpperCase()
                                                        )}
                                                    </div>
                                                    <span className="truncate">{member.user.name}</span>
                                                    {card.members?.some((m: any) => m.id === member.user_id || m.user_id === member.user_id) && (
                                                        <CheckSquare size={14} className="ml-auto text-blue-400 flex-shrink-0" />
                                                    )}
                                                </button>
                                            ))}
                                            {(!board.members || board.members.length === 0) && (
                                                <p className="text-white/50 text-xs px-2 py-1">No members found on this board.</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            <button className="flex items-center gap-2 bg-transparent border border-white/20 hover:bg-white/10 text-white/90 px-3 py-1.5 rounded text-sm transition">
                                <Paperclip size={16} /> Attachment
                            </button>
                        </div>

                        {/* Description Area */}
                        <div className="flex items-start gap-4">
                            <div className="mt-1 text-white/70"><AlignLeft size={24} /></div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-lg font-semibold text-white">Description</h3>
                                </div>
                                <textarea 
                                    className="w-full bg-[#22272B] hover:bg-[#2C3338] focus:bg-[#22272B] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 border border-white/10 text-white/90 rounded-lg p-3 text-sm min-h-[100px] transition resize-y"
                                    placeholder="Add a more detailed description..."
                                    defaultValue={card.description || ""}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Comments and Activity */}
                    <div className="w-full md:w-80 flex flex-col border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2 text-white/90">
                                <MessageSquare size={18} />
                                <h3 className="font-semibold">Comments and activity</h3>
                            </div>
                            <button className="bg-white/10 hover:bg-white/20 text-white/80 px-2.5 py-1 rounded text-xs transition">
                                Show details
                            </button>
                        </div>
                        
                        <div className="flex gap-3 mb-6">
                            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                                U
                            </div>
                            <div className="flex-1">
                                <textarea 
                                    className="w-full bg-[#22272B] border border-white/10 text-white/90 rounded-lg p-2.5 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 transition h-10 hover:bg-[#2C3338] focus:h-20"
                                    placeholder="Write a comment..."
                                />
                            </div>
                        </div>

                        {/* Example Activity */}
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                                    RJ
                                </div>
                                <div className="text-sm text-white/90">
                                    <span className="font-bold">Riazull Jannat</span> added this card to {board.lists?.find(l => l.id === card.list_id)?.name || "list"}
                                    <div className="text-xs text-white/50 mt-0.5">Jun 6, 2026, 7:42 PM</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
