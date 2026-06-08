/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { CheckSquare, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { addChecklistItem, toggleChecklistItem, deleteChecklist } from "@/service/checklistService/checklist.service";
import { TComplexCardDetails } from "@/types/cardType/card.type";
import { TBoardDetails } from "@/types/baordType/board.type";

interface CardChecklistsProps {
    card: TComplexCardDetails;
    board: TBoardDetails;
    projectId: string;
    onUpdateCard?: (updatedCard: any) => void;
}

export default function CardChecklists({ card, board, projectId, onUpdateCard }: CardChecklistsProps) {
    const [newItemTitles, setNewItemTitles] = useState<Record<string, string>>({});

    const handleAddChecklistItem = async (checklistId: string) => {
        const itemTitle = newItemTitles[checklistId];
        if (!itemTitle || !itemTitle.trim()) return;

        const toastId = toast.loading('Adding item...');
        try {
            const res = await addChecklistItem(board.id, checklistId, { title: itemTitle }, projectId);
            if (res.success) {
                toast.success(res.message || "Item added successfully", { id: toastId });
                const newItem = res.data || {
                    id: `item-${Date.now()}`,
                    title: itemTitle,
                    is_completed: false
                };
                const updated = {
                    ...card,
                    checklists: card.checklists?.map((c: any) => c.id === checklistId ? { ...c, items: [...(c.items || []), newItem] } : c)
                };
                if (onUpdateCard) onUpdateCard(updated);
                setNewItemTitles(prev => ({ ...prev, [checklistId]: "" }));
            } else {
                toast.error(res.message || "Failed to add item", { id: toastId });
            }
        } catch (error: any) {
            console.error("Error adding checklist item:", error);
            toast.error(error?.message || "An error occurred", { id: toastId });
        }
    };

    const handleToggleChecklistItem = async (checklistId: string, itemId: string) => {
        const toastId = toast.loading('Toggling item...');
        try {
            const res = await toggleChecklistItem(board.id, checklistId, itemId, projectId);
            if (res.success) {
                toast.success(res.message || "Item updated successfully", { id: toastId });
                const updated = {
                    ...card,
                    checklists: card.checklists?.map((c: any) => {
                        if (c.id !== checklistId) return c;
                        return {
                            ...c,
                            items: c.items?.map((item: any) => {
                                if (item.id === itemId) {
                                    return {
                                        ...item,
                                        is_completed: !item.is_completed,
                                        isCompleted: !item.isCompleted
                                    };
                                }
                                return item;
                            })
                        };
                    })
                };
                if (onUpdateCard) onUpdateCard(updated);
            } else {
                toast.error(res.message || "Failed to toggle item", { id: toastId });
            }
        } catch (error: any) {
            console.error("Error toggling checklist item:", error);
            toast.error(error?.message || "An error occurred", { id: toastId });
        }
    };

    const handleDeleteChecklist = async (checklistId: string) => {
        const toastId = toast.loading('Deleting checklist...');
        try {
            const res = await deleteChecklist(board.id, checklistId, projectId);
            if (res.success) {
                toast.success(res.message || "Checklist deleted successfully", { id: toastId });
                const updated = {
                    ...card,
                    checklists: card.checklists?.filter((c: any) => c.id !== checklistId),
                    checklistsCount: Math.max(((card as any).checklistsCount || 1) - 1, 0)
                };
                if (onUpdateCard) onUpdateCard(updated);
            } else {
                toast.error(res.message || "Failed to delete checklist", { id: toastId });
            }
        } catch (error: any) {
            console.error("Error deleting checklist:", error);
            toast.error(error?.message || "An error occurred", { id: toastId });
        }
    };

    return (
        <div className="space-y-4">
            {card.checklists?.map((checklist: any) => {
                const total = checklist.items?.length || 0;
                const completed = checklist.items?.filter((it: any) => it.isCompleted || it.is_completed).length || 0;
                const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

                return (
                    <div key={checklist.id} className="bg-[#22272B]/30 border border-white/5 p-4 rounded-xl space-y-3 relative">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <CheckSquare size={16} className="text-blue-400" /> {checklist.title}
                            </h3>
                            <button
                                onClick={() => handleDeleteChecklist(checklist.id)}
                                className="text-white/40 hover:text-red-400 p-1 rounded hover:bg-white/5 transition"
                                title="Delete checklist"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>

                        {/* Progress bar */}
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-white/50 w-7">{percent}%</span>
                            <div className="flex-1 h-1.5 bg-[#22272B] rounded-full overflow-hidden border border-white/5">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-300"
                                    style={{ width: `${percent}%` }}
                                />
                            </div>
                        </div>

                        {/* Items */}
                        <div className="space-y-2 mt-2">
                            {checklist.items?.map((item: any) => (
                                <label key={item.id} className="flex items-center gap-3 bg-[#22272B]/40 hover:bg-[#22272B]/60 p-2.5 rounded-lg border border-white/5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={item.isCompleted || item.is_completed || false}
                                        onChange={() => handleToggleChecklistItem(checklist.id, item.id)}
                                        className="w-4 h-4 rounded bg-[#22272B] border-white/10 text-blue-500 focus:ring-0 focus:ring-offset-0"
                                    />
                                    <span className={`text-xs text-white/85 ${(item.isCompleted || item.is_completed) ? 'line-through text-white/40' : ''}`}>{item.title}</span>
                                </label>
                            ))}
                        </div>

                        {/* Add checklist item */}
                        <div className="flex gap-2 mt-3">
                            <input
                                type="text"
                                value={newItemTitles[checklist.id] || ""}
                                onChange={(e) => setNewItemTitles(prev => ({ ...prev, [checklist.id]: e.target.value }))}
                                placeholder="Add checklist item..."
                                className="flex-1 bg-[#22272B] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                            />
                            <button
                                onClick={() => handleAddChecklistItem(checklist.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg transition"
                            >
                                Add Item
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
