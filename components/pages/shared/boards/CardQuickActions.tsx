/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
    X, CheckSquare, Tag, Copy, Trash2, ArrowRight, Star, Plus, Check
} from "lucide-react";
import { toast } from "sonner";
import { TComplexCardDetails } from "@/types/cardType/card.type";
import { TBoardDetails } from "@/types/baordType/board.type";
import {
    addMemberToCard,
    unassignMemberFromCard,
    updateCard,
    deleteCard,
    moveCard,
    duplicateCard,
    toggleWatchCard
} from "@/service/listService/list.service";
import { createLabel, assignLabelToCard, unassignLabelFromCard } from "@/service/labelService/label.service";
import { createChecklist } from "@/service/checklistService/checklist.service";

interface CardQuickActionsProps {
    card: TComplexCardDetails;
    board: TBoardDetails;
    projectId: string;
    onClose: () => void;
    onUpdateCard?: (updatedCard: any) => void;
    onDeleteCard?: (cardId: string, listId: string) => void;
}

export default function CardQuickActions({
    card,
    board,
    projectId,
    onClose,
    onUpdateCard,
    onDeleteCard
}: CardQuickActionsProps) {
    const [activePopup, setActivePopup] = useState<"labels" | "members" | "dates" | "move" | "custom_fields" | "cover" | "add_dropdown" | "create_label_form" | "checklist" | null>(null);

    // Initial label creation form
    const [newLabelName, setNewLabelName] = useState("");
    const [newLabelColor, setNewLabelColor] = useState("#3b82f6");

    // Checklist inputs
    const [newChecklistTitle, setNewChecklistTitle] = useState("");

    const handleAssignMember = async (userId: string) => {
        if (!card) return;
        const isAssigned = card.members?.some((m: any) => m.user_id === userId || m.id === userId);
        const toastId = toast.loading(isAssigned ? 'Unassigning member...' : 'Assigning member...');
        try {
            let res;
            if (isAssigned) {
                res = await unassignMemberFromCard(board.id, card.id, userId, projectId);
            } else {
                res = await addMemberToCard(board.id, card.id, userId, projectId);
            }

            if (res.success) {
                toast.success(res.message || (isAssigned ? 'Member unassigned' : 'Member assigned'), { id: toastId });
                let updatedMembers;
                if (isAssigned) {
                    updatedMembers = card.members?.filter((m: any) => m.user_id !== userId && m.id !== userId);
                } else {
                    const boardMember = board.members?.find((bm: any) => bm.user_id === userId);
                    updatedMembers = [...(card.members || []), {
                        id: userId,
                        user_id: userId,
                        user: boardMember?.user || { name: "Team Member" }
                    }];
                }
                const updated = { ...card, members: updatedMembers };
                if (onUpdateCard) onUpdateCard(updated);
            } else {
                toast.error(res.message || 'Action failed', { id: toastId });
            }
        } catch (error: any) {
            toast.error(error?.message || 'Action failed', { id: toastId });
        } finally {
            setActivePopup(null);
        }
    };

    const handleCreateBoardLabel = async () => {
        if (!newLabelName.trim()) return;
        const toastId = toast.loading('Creating label...');
        try {
            const res = await createLabel(board.id, { name: newLabelName, color: newLabelColor }, projectId);
            if (res.success) {
                toast.success(res.message || "Label created successfully", { id: toastId });
                const newLabel = res.data || { id: `lbl-${Date.now()}`, name: newLabelName, color: newLabelColor };
                // Update board labels locally
                if (board) {
                    board.labels = [...(board.labels || []), newLabel];
                }
                setNewLabelName("");
            } else {
                toast.error(res.message || "Failed to create label", { id: toastId });
            }
        } catch (error: any) {
            console.error("Error creating label:", error);
            toast.error(error?.message || "An error occurred", { id: toastId });
        }
    };

    const handleToggleCardLabel = async (label: any) => {
        if (!card) return;
        const hasLabel = card.labels?.some((l: any) => (l.id === label.id || l.label?.id === label.id));
        const labelId = label.id || label.label?.id;

        const toastId = toast.loading(hasLabel ? 'Unassigning label...' : 'Assigning label...');
        try {
            if (hasLabel) {
                const res = await unassignLabelFromCard(board.id, card.id, labelId, projectId);
                if (res.success) {
                    toast.success(res.message || "Label unassigned successfully", { id: toastId });
                    const updatedLabels = card.labels?.filter((l: any) => (l.id !== label.id && l.label?.id !== label.id));
                    const updated = { ...card, labels: updatedLabels };
                    if (onUpdateCard) onUpdateCard(updated);
                } else {
                    toast.error(res.message || "Failed to unassign label", { id: toastId });
                }
            } else {
                const res = await assignLabelToCard(board.id, card.id, { labelId }, projectId);
                if (res.success) {
                    toast.success(res.message || "Label assigned successfully", { id: toastId });
                    const updatedLabels = [...(card.labels || []), { ...label, label: label }];
                    const updated = { ...card, labels: updatedLabels };
                    if (onUpdateCard) onUpdateCard(updated);
                } else {
                    toast.error(res.message || "Failed to assign label", { id: toastId });
                }
            }
        } catch (error: any) {
            console.error("Error toggling label:", error);
            toast.error(error?.message || "An error occurred", { id: toastId });
        }
    };

    const handleSaveDueDate = async (dateStr: string) => {
        const toastId = toast.loading('Saving due date...');
        try {
            const res = await updateCard(board.id, card.id, { due_date: dateStr }, projectId);
            if (res.success) {
                toast.success(res.message || "Due date saved successfully", { id: toastId });
                const updated = { ...card, due_date: dateStr };
                if (onUpdateCard) onUpdateCard(updated);
            } else {
                toast.error(res.message || "Failed to save due date", { id: toastId });
            }
        } catch (error: any) {
            console.error("Error saving due date:", error);
            toast.error(error?.message || "An error occurred", { id: toastId });
        } finally {
            setActivePopup(null);
        }
    };

    const handleCreateChecklist = async () => {
        if (!newChecklistTitle.trim()) return;
        const toastId = toast.loading('Creating checklist...');
        try {
            const res = await createChecklist(board.id, card.id, { title: newChecklistTitle }, projectId);
            if (res.success) {
                toast.success(res.message || "Checklist created successfully", { id: toastId });
                const newChecklist = res.data || {
                    id: `chk-${Date.now()}`,
                    title: newChecklistTitle,
                    items: []
                };
                const updated = {
                    ...card,
                    checklists: [...(card.checklists || []), newChecklist],
                    checklistsCount: ((card as any).checklistsCount || 0) + 1
                };
                if (onUpdateCard) onUpdateCard(updated);
                setNewChecklistTitle("");
            } else {
                toast.error(res.message || "Failed to create checklist", { id: toastId });
            }
        } catch (error: any) {
            console.error("Error creating checklist:", error);
            toast.error(error?.message || "An error occurred", { id: toastId });
        } finally {
            setActivePopup(null);
        }
    };

    const handleUpdateCoverColor = async (color: string | null) => {
        const toastId = toast.loading('Updating cover color...');
        try {
            const res = await updateCard(board.id, card.id, { cover_color: color }, projectId);
            if (res.success) {
                toast.success(res.message || "Cover color updated successfully", { id: toastId });
                const updated = { ...card, cover_color: color };
                if (onUpdateCard) onUpdateCard(updated);
            } else {
                toast.error(res.message || "Failed to update cover color", { id: toastId });
            }
        } catch (error: any) {
            console.error("Error updating cover color:", error);
            toast.error(error?.message || "An error occurred", { id: toastId });
        }
    };

    const handleMoveCard = async (targetListId: string) => {
        const toastId = toast.loading('Moving card...');
        try {
            const res = await moveCard(board.id, card.id, { targetListId }, projectId);
            if (res.success) {
                toast.success(res.message || "Card moved successfully", { id: toastId });
                const updated = { ...card, list_id: targetListId };
                if (onUpdateCard) onUpdateCard(updated);
            } else {
                toast.error(res.message || "Failed to move card", { id: toastId });
            }
        } catch (error: any) {
            console.error("Error moving card:", error);
            toast.error(error?.message || "An error occurred", { id: toastId });
        } finally {
            setActivePopup(null);
        }
    };

    const handleDuplicateCard = async () => {
        const toastId = toast.loading('Duplicating card...');
        try {
            const res = await duplicateCard(board.id, card.id, projectId);
            if (res.success) {
                toast.success(res.message || "Card duplicated successfully", { id: toastId });
                onClose();
            } else {
                toast.error(res.message || "Failed to duplicate card", { id: toastId });
            }
        } catch (error: any) {
            console.error("Error duplicating card:", error);
            toast.error(error?.message || "An error occurred", { id: toastId });
        }
    };

    const handleToggleWatch = async () => {
        const toastId = toast.loading('Updating watch status...');
        try {
            const res = await toggleWatchCard(board.id, card.id, projectId);
            if (res.success) {
                const nextWatchState = !card.isWatching;
                toast.success(res.message || (nextWatchState ? "Watching card" : "Stopped watching card"), { id: toastId });
                const updated = { ...card, isWatching: nextWatchState };
                if (onUpdateCard) onUpdateCard(updated);
            } else {
                toast.error(res.message || "Failed to update watch status", { id: toastId });
            }
        } catch (error: any) {
            console.error("Error toggling watch:", error);
            toast.error(error?.message || "An error occurred", { id: toastId });
        }
    };

    const handleDeleteCard = async () => {
        if (!confirm("Are you sure you want to delete this card?")) return;
        const toastId = toast.loading('Deleting card...');
        try {
            const res = await deleteCard(board.id, card.id, projectId);
            if (res.success) {
                toast.success(res.message || "Card deleted successfully", { id: toastId });
                if (onDeleteCard) onDeleteCard(card.id, card.list_id);
                onClose();
            } else {
                toast.error(res.message || "Failed to delete card", { id: toastId });
            }
        } catch (error: any) {
            console.error("Error deleting card:", error);
            toast.error(error?.message || "An error occurred", { id: toastId });
        }
    };

    return (
        <div className="flex flex-wrap gap-2.5 items-center">
            {/* Add Button Dropdown */}
            <div className="relative">
                <button
                    onClick={() => setActivePopup(activePopup === 'add_dropdown' ? null : 'add_dropdown')}
                    className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white transition shadow-md"
                >
                    <Plus size={13} /> Add
                </button>
                {activePopup === 'add_dropdown' && (
                    <div className="absolute top-full left-0 mt-1 bg-[#282E33] border border-white/10 rounded-lg shadow-xl z-30 p-1.5 w-48">
                        <div className="py-1 px-2 text-[10px] font-bold text-white/45 uppercase tracking-wider">Card Quick Actions</div>
                        <div className="space-y-0.5 mt-1">
                            <button
                                onClick={() => { setActivePopup('move'); }}
                                className="w-full text-left px-2 py-1 text-xs text-white/95 hover:bg-white/5 rounded flex items-center gap-1.5 transition"
                            >
                                <ArrowRight size={12} /> Move Card
                            </button>
                            <button
                                onClick={() => { handleDuplicateCard(); setActivePopup(null); }}
                                className="w-full text-left px-2 py-1 text-xs text-white/95 hover:bg-white/5 rounded flex items-center gap-1.5 transition"
                            >
                                <Copy size={12} /> Duplicate Card
                            </button>
                            <button
                                onClick={() => { handleToggleWatch(); setActivePopup(null); }}
                                className="w-full text-left px-2 py-1 text-xs text-white/95 hover:bg-white/5 rounded flex items-center gap-1.5 transition"
                            >
                                <Check size={12} /> {card.isWatching ? 'Unwatch Card' : 'Watch Card'}
                            </button>
                            <button
                                onClick={() => { setActivePopup('cover'); }}
                                className="w-full text-left px-2 py-1 text-xs text-white/95 hover:bg-white/5 rounded flex items-center gap-1.5 transition"
                            >
                                <Star size={12} /> Cover Color
                            </button>
                            <button
                                onClick={() => { handleDeleteCard(); }}
                                className="w-full text-left px-2 py-1 text-xs text-red-400 hover:bg-red-500/10 rounded flex items-center gap-1.5 transition"
                            >
                                <Trash2 size={12} /> Delete Card
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Labels Button */}
            <div className="relative">
                <button
                    onClick={() => setActivePopup(activePopup === 'labels' ? null : 'labels')}
                    className="flex items-center gap-1.5 bg-[#22272B] hover:bg-[#2C333A] border border-white/5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white/90 transition shadow-sm"
                >
                    <Tag size={13} className="text-white/60" /> Labels
                </button>
                {activePopup === 'labels' && (
                    <div className="absolute top-full left-0 mt-1 bg-[#282E33] border border-white/10 rounded-lg shadow-xl z-30 p-3 w-72 space-y-3">
                        <div className="flex items-center justify-between border-b border-white/5 pb-1">
                            <span className="text-xs font-bold text-white/70">Labels</span>
                            <button onClick={() => setActivePopup(null)} className="text-white/40 hover:text-white">
                                <X size={12} />
                            </button>
                        </div>
                        <input
                            type="text"
                            placeholder="Search labels..."
                            className="w-full bg-[#1C2126] border border-blue-500/50 rounded-md px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />

                        <div className="space-y-1.5 max-h-[160px] overflow-y-auto custom-scrollbar">
                            {board.labels?.map((label: any) => {
                                const isAssigned = card.labels?.some((l: any) => (l.id === label.id || l.label?.id === label.id));
                                return (
                                    <div key={label.id} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={isAssigned || false}
                                            onChange={() => handleToggleCardLabel(label)}
                                            className="w-4 h-4 rounded bg-[#1C2126] border-white/10 text-blue-500 focus:ring-0 focus:ring-offset-0"
                                        />
                                        <div
                                            style={{ backgroundColor: label.color }}
                                            onClick={() => handleToggleCardLabel(label)}
                                            className="flex-1 h-8 rounded-md flex items-center px-3 text-xs font-bold text-white cursor-pointer hover:opacity-90 transition-opacity"
                                        >
                                            {label.name}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="border-t border-white/5 pt-2">
                            <button
                                onClick={() => setActivePopup('create_label_form')}
                                className="w-full bg-white/5 hover:bg-white/10 text-white font-semibold text-xs py-2 rounded-lg transition"
                            >
                                Create a new label
                            </button>
                        </div>
                    </div>
                )}

                {activePopup === 'create_label_form' && (
                    <div className="absolute top-full left-0 mt-1 bg-[#282E33] border border-white/10 rounded-lg shadow-xl z-30 p-3 w-72 space-y-3">
                        <div className="flex items-center justify-between border-b border-white/5 pb-1">
                            <span className="text-xs font-bold text-white/70">Create Label</span>
                            <button onClick={() => setActivePopup('labels')} className="text-white/40 hover:text-white">
                                <X size={12} />
                            </button>
                        </div>
                        <input
                            type="text"
                            value={newLabelName}
                            onChange={(e) => setNewLabelName(e.target.value)}
                            placeholder="New label name..."
                            className="w-full bg-[#1C2126] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                        />
                        <div className="flex gap-1.5 flex-wrap">
                            {['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#dc2626'].map(c => (
                                <button
                                    key={c}
                                    onClick={() => setNewLabelColor(c)}
                                    style={{ backgroundColor: c }}
                                    className={`w-5 h-5 rounded-full border border-white/10 ${newLabelColor === c ? 'ring-2 ring-white scale-110' : ''}`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={() => { handleCreateBoardLabel(); setActivePopup('labels'); }}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-lg"
                        >
                            Create Label
                        </button>
                    </div>
                )}
            </div>

            {/* Dates Button */}
            <div className="relative">
                <button
                    onClick={() => setActivePopup(activePopup === 'dates' ? null : 'dates')}
                    className="flex items-center gap-1.5 bg-[#22272B] hover:bg-[#2C333A] border border-white/5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white/90 transition shadow-sm"
                >
                    <svg className="w-3.5 h-3.5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg> Dates
                </button>
                {activePopup === 'dates' && (
                    <div className="absolute top-full left-0 mt-1 bg-[#282E33] border border-white/10 rounded-lg shadow-xl z-30 p-3 w-64 space-y-3">
                        <div className="flex items-center justify-between border-b border-white/5 pb-1">
                            <span className="text-xs font-bold text-white/70">Dates</span>
                            <button onClick={() => setActivePopup(null)} className="text-white/40 hover:text-white">
                                <X size={12} />
                            </button>
                        </div>
                        <input
                            type="datetime-local"
                            defaultValue={card.due_date ? card.due_date.substring(0, 16) : ""}
                            onChange={(e) => handleSaveDueDate(e.target.value)}
                            className="w-full bg-[#1C2126] border border-white/10 rounded p-2 text-xs text-white focus:outline-none"
                        />
                    </div>
                )}
            </div>

            {/* Checklist Button */}
            <div className="relative">
                <button
                    onClick={() => setActivePopup(activePopup === 'checklist' ? null : 'checklist')}
                    className="flex items-center gap-1.5 bg-[#22272B] hover:bg-[#2C333A] border border-white/5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white/90 transition shadow-sm"
                >
                    <CheckSquare size={13} className="text-white/60" /> Checklist
                </button>
                {activePopup === 'checklist' && (
                    <div className="absolute top-full left-0 mt-1 bg-[#282E33] border border-white/10 rounded-lg shadow-xl z-30 p-3 w-72 space-y-3">
                        <div className="flex items-center justify-between border-b border-white/5 pb-1">
                            <span className="text-xs font-bold text-white/70">Add checklist</span>
                            <button onClick={() => setActivePopup(null)} className="text-white/40 hover:text-white">
                                <X size={12} />
                            </button>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] text-white/50 font-bold uppercase">Title</label>
                            <input
                                type="text"
                                value={newChecklistTitle || "Checklist"}
                                onChange={(e) => setNewChecklistTitle(e.target.value)}
                                placeholder="Checklist"
                                className="w-full bg-[#1C2126] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] text-white/50 font-bold uppercase">Copy items from...</label>
                            <select
                                className="w-full bg-[#1C2126] border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none"
                            >
                                <option value="">(none)</option>
                                {board.lists?.flatMap(l => l.cards || []).flatMap(c => (c as any).checklists || []).map(chk => (
                                    <option key={chk.id} value={chk.id}>{chk.title}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={() => { handleCreateChecklist(); }}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-lg"
                        >
                            Add
                        </button>
                    </div>
                )}
            </div>

            {/* Members Button */}
            <div className="relative">
                <button
                    onClick={() => setActivePopup(activePopup === 'members' ? null : 'members')}
                    className="flex items-center gap-1.5 bg-[#22272B] hover:bg-[#2C333A] border border-white/5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white/90 transition shadow-sm"
                >
                    <svg className="w-3.5 h-3.5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg> Members
                </button>
                {activePopup === 'members' && (
                    <div className="absolute top-full left-0 mt-1 bg-[#282E33] border border-white/10 rounded-lg shadow-xl z-30 p-2.5 w-64 space-y-1.5">
                        <div className="text-[9px] font-bold text-white/40 uppercase mb-1">Board Members</div>
                        {board.members?.map((bm: any) => {
                            const isAssigned = card.members?.some((m: any) => m.user_id === bm.user_id || m.id === bm.user_id);
                            return (
                                <button
                                    key={bm.user_id}
                                    onClick={() => handleAssignMember(bm.user_id)}
                                    className="w-full text-left px-2 py-1.5 text-xs text-white/90 hover:bg-white/5 rounded flex items-center justify-between transition-colors"
                                >
                                    <span>{bm.user?.name}</span>
                                    {isAssigned && <Check size={14} className="text-green-400" />}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Cover popup container */}
            {activePopup === 'cover' && (
                <div className="absolute bg-[#282E33] border border-white/10 rounded-lg shadow-xl z-30 p-2.5 w-64 space-y-2 mt-1">
                    <div className="flex items-center justify-between border-b border-white/5 pb-1">
                        <span className="text-xs font-bold text-white/70">Cover Color</span>
                        <button onClick={() => setActivePopup(null)} className="text-white/40 hover:text-white">
                            <X size={12} />
                        </button>
                    </div>
                    <div className="grid grid-cols-5 gap-1.5">
                        {['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f43f5e', '#64748b', '#000000'].map(c => (
                            <button
                                key={c}
                                onClick={() => { handleUpdateCoverColor(c); setActivePopup(null); }}
                                style={{ backgroundColor: c }}
                                className="w-8 h-8 rounded border border-white/10 hover:scale-110 transition-transform"
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
