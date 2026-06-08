/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { AlignLeft } from "lucide-react";
import { toast } from "sonner";
import { updateCard } from "@/service/listService/list.service";
import { TComplexCardDetails } from "@/types/cardType/card.type";
import { TBoardDetails } from "@/types/baordType/board.type";

interface CardDescriptionProps {
    card: TComplexCardDetails;
    board: TBoardDetails;
    projectId: string;
    onUpdateCard?: (updatedCard: any) => void;
}

export default function CardDescription({ card, board, projectId, onUpdateCard }: CardDescriptionProps) {
    const [isEditingDesc, setIsEditingDesc] = useState(false);
    const [cardDesc, setCardDesc] = useState(card.description || "");

    useEffect(() => {
        setCardDesc(card.description || "");
    }, [card.description]);

    const handleSaveDescription = async () => {
        const toastId = toast.loading('Saving description...');
        try {
            const res = await updateCard(board.id, card.id, { description: cardDesc }, projectId);
            if (res.success) {
                toast.success(res.message || "Description saved successfully", { id: toastId });
                if (onUpdateCard) {
                    onUpdateCard({ ...card, description: cardDesc });
                }
                setIsEditingDesc(false);
            } else {
                toast.error(res.message || 'Failed to save description', { id: toastId });
            }
        } catch (error: any) {
            console.error("Error saving description:", error);
            toast.error(error?.message || 'Failed to save description', { id: toastId });
        }
    };

    return (
        <div className="space-y-2.5 pt-4 border-t border-white/5">
            <h3 className="text-md font-semibold text-white flex items-center gap-2">
                <AlignLeft size={16} /> Description
            </h3>
            {isEditingDesc ? (
                <div className="space-y-2">
                    <textarea
                        value={cardDesc}
                        onChange={(e) => setCardDesc(e.target.value)}
                        placeholder="Add a more detailed description..."
                        className="w-full bg-[#22272B] border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 h-28"
                        autoFocus
                    />
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleSaveDescription}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded transition"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditingDesc(false)}
                            className="text-white/60 hover:text-white text-xs font-semibold px-3 py-1.5 rounded hover:bg-white/5 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <p
                    onClick={() => setIsEditingDesc(true)}
                    className="text-sm text-white/75 bg-[#22272B]/50 hover:bg-[#22272B] border border-white/5 rounded-lg p-3 cursor-pointer min-h-[60px]"
                >
                    {card.description || <span className="text-white/40 italic">Add details about this card...</span>}
                </p>
            )}
        </div>
    );
}
