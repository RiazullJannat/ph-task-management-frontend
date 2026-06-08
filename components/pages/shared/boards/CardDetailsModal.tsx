/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { X, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { TBoardDetails } from "@/types/baordType/board.type";
import { getCardDetails, updateCard, deleteCard } from "@/service/listService/list.service";
import { TComplexCardDetails } from "@/types/cardType/card.type";
import CardComments from "./CardComments";
import CardMetadata from "./CardMetadata";
import CardDescription from "./CardDescription";
import CardChecklists from "./CardChecklists";
import CardQuickActions from "./CardQuickActions";
import CardCustomFields from "./CardCustomFields";

interface CardDetailsModalProps {
    cardId: string;
    board: TBoardDetails;
    projectId: string;
    onClose: () => void;
    onUpdateCard?: (updatedCard: any) => void;
    onDeleteCard?: (cardId: string, listId: string) => void;
}

export default function CardDetailsModal({
    cardId,
    board: initialBoard,
    projectId,
    onClose,
    onUpdateCard,
    onDeleteCard
}: CardDetailsModalProps) {
    const [card, setCard] = useState<TComplexCardDetails>();
    const [board, setBoard] = useState<TBoardDetails>(initialBoard);

    // Editing states
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [cardTitle, setCardTitle] = useState("");

    useEffect(() => {
        const cardDetails = async () => {
            try {
                const res = await getCardDetails(board.id, cardId);
                if (res.success) {
                    setCard(res.data);
                    setCardTitle(res.data.title);
                } else {
                    toast.error("Failed to load card details");
                }
            } catch (error) {
                console.error("Error loading card details:", error);
                toast.error("Failed to load card details");
            }
        };
        cardDetails();
    }, [board.id, cardId]);

    const handleSaveTitle = async () => {
        if (!card || !cardTitle.trim() || cardTitle === card.title) {
            setIsEditingTitle(false);
            return;
        }
        const toastId = toast.loading("Saving card title...");
        try {
            const res = await updateCard(board.id, card.id, { title: cardTitle }, projectId);
            if (res.success) {
                toast.success(res.message || "Card title updated successfully", { id: toastId });
                const updated = { ...card, title: cardTitle };
                setCard(updated);
                if (onUpdateCard) onUpdateCard(updated);
            } else {
                toast.error(res.message || "Failed to save title", { id: toastId });
            }
        } catch (error: any) {
            console.error("Error updating title:", error);
            toast.error(error?.message || "An error occurred", { id: toastId });
        } finally {
            setIsEditingTitle(false);
        }
    };

    const handleLocalUpdate = (updatedCard: any) => {
        setCard(updatedCard);
        if (onUpdateCard) onUpdateCard(updatedCard);
    };

    const handleDeleteCard = async () => {
        if (!card) return;
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

    if (!card) {
        return (
            <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={onClose}>
                <div className="bg-[#1C2126] border border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-white space-y-4">
                    <div className="w-8 h-8 border-4 border-t-blue-500 border-white/10 rounded-full animate-spin"></div>
                    <p className="text-xs text-white/55">Loading card details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="bg-[#1C2126] border border-white/10 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar flex flex-col relative text-white"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Cover section */}
                {card.cover_color && (
                    <div className="h-28 w-full rounded-t-xl relative transition-all duration-300" style={{ backgroundColor: card.cover_color }}>
                        <button
                            onClick={async () => {
                                const toastId = toast.loading("Removing cover color...");
                                try {
                                    const res = await updateCard(board.id, card.id, { cover_color: null }, projectId);
                                    if (res.success) {
                                        toast.success("Cover removed", { id: toastId });
                                        handleLocalUpdate({ ...card, cover_color: null });
                                    } else {
                                        toast.error("Failed to remove cover", { id: toastId });
                                    }
                                } catch (error: any) {
                                    toast.error("Error removing cover", { id: toastId });
                                }
                            }}
                            className="absolute right-12 top-4 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
                            title="Remove cover"
                        >
                            <X size={14} />
                        </button>
                    </div>
                )}

                {/* Topbar of the modal */}
                <div className="px-6 pt-5 pb-2 flex items-center justify-between border-b border-white/5">
                    {/* List selection button */}
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-white/70 bg-white/5 hover:bg-white/10 px-2.5 py-1.5 rounded-md cursor-pointer transition select-none">
                        <span>{board.lists?.find(l => l.id === card.list_id)?.name || "Task List"}</span>
                        <span className="text-[10px]">▼</span>
                    </div>

                    {/* Right-side icon actions */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleDeleteCard}
                            className="flex items-center gap-1.5 bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg text-xs font-semibold hover:text-red-300 transition shadow-sm"
                            title="Delete Card"
                        >
                            <Trash2 size={13} />
                            <span>Delete Card</span>
                        </button>
                        <button onClick={onClose} className="text-white/50 hover:text-white transition p-1 hover:bg-white/5 rounded" title="Close">
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Modal Grid */}
                <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Left Column: Title, Quick Actions, Description, Checklists */}
                    <div className="lg:col-span-3 space-y-6">

                        {/* Title block with circle icon */}
                        <div className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full border-2 border-white/45 flex items-center justify-center text-xs font-bold text-white/45 mt-1 flex-shrink-0">
                            </div>
                            <div className="flex-1">
                                {isEditingTitle ? (
                                    <input
                                        type="text"
                                        value={cardTitle}
                                        onChange={(e) => setCardTitle(e.target.value)}
                                        onBlur={handleSaveTitle}
                                        onKeyDown={(e) => e.key === "Enter" && handleSaveTitle()}
                                        className="w-full bg-[#22272B] border border-blue-500 rounded-lg px-3 py-1.5 text-lg font-semibold text-white focus:outline-none"
                                        autoFocus
                                    />
                                ) : (
                                    <h2
                                        onClick={() => setIsEditingTitle(true)}
                                        className="text-xl font-bold text-white cursor-pointer hover:bg-white/5 px-2 py-1 -ml-2 rounded"
                                    >
                                        {card.title}
                                    </h2>
                                )}
                            </div>
                        </div>

                        {/* Quick Action Buttons Row */}
                        <CardQuickActions
                            card={card}
                            board={board}
                            projectId={projectId}
                            onClose={onClose}
                            onUpdateCard={handleLocalUpdate}
                            onDeleteCard={onDeleteCard}
                        />

                        {/* Metadata display badges */}
                        <CardMetadata card={card} />

                        {/* Description section */}
                        <CardDescription
                            card={card}
                            board={board}
                            projectId={projectId}
                            onUpdateCard={handleLocalUpdate}
                        />

                        {/* Custom fields display/edit */}
                        <CardCustomFields
                            card={card}
                            board={board}
                            projectId={projectId}
                            onUpdateCard={handleLocalUpdate}
                        />

                        {/* Checklists Section */}
                        <CardChecklists
                            card={card}
                            board={board}
                            projectId={projectId}
                            onUpdateCard={handleLocalUpdate}
                        />
                    </div>

                    {/* Right Column: Comments & Activity (takes 2 of 5 columns) */}
                    <div className="lg:col-span-2 space-y-6 border-l border-white/5 pl-0 lg:pl-6">
                        <CardComments
                            card={card as any}
                            boardId={board.id}
                            projectId={projectId}
                            onUpdateCard={handleLocalUpdate}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
