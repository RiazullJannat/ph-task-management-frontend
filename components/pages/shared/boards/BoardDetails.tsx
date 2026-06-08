/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { TBoardDetails } from "@/types/baordType/board.type";
import {
    MoreHorizontal, Plus, Filter,
    MessageSquare, Paperclip, CheckSquare,
    Clock, UserPlus, Share2, Star, AlignLeft, X,
    Settings, Trash2, Copy, Edit, Compass
} from "lucide-react";
import { createList, createCard, updateList, deleteList } from "@/service/listService/list.service";
import CardDetailsModal from "./CardDetailsModal";
import AddBoardMemberModal from "./AddBoardMemberModal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { WorkspaceMember } from "@/types/projectType/project.type";

export default function BoardDetails({ board: initialBoard, projectId, users }: { board: TBoardDetails, projectId: string, users: WorkspaceMember[] }) {
    const router = useRouter();
    const [board, setBoard] = useState<TBoardDetails>(initialBoard);

    useEffect(() => {
        setBoard(initialBoard);
    }, [initialBoard]);

    const [isAddingList, setIsAddingList] = useState(false);
    const [newListName, setNewListName] = useState("");
    const [isSubmittingList, setIsSubmittingList] = useState(false);

    // Card states
    const [addingCardToListId, setAddingCardToListId] = useState<string | null>(null);
    const [newCardTitle, setNewCardTitle] = useState("");
    const [isSubmittingCard, setIsSubmittingCard] = useState(false);

    // Editing states for Board
    const [isEditingBoardName, setIsEditingBoardName] = useState(false);
    const [boardName, setBoardName] = useState(board.name);
    const [isBoardSettingsOpen, setIsBoardSettingsOpen] = useState(false);
    const [boardDesc, setBoardDesc] = useState(board.description || "");
    const [boardVisibility, setBoardVisibility] = useState(board.visibility);
    const [boardStatus, setBoardStatus] = useState(board.status || "active");

    // Editing states for Lists
    const [editingListId, setEditingListId] = useState<string | null>(null);
    const [editingListName, setEditingListName] = useState("");
    const [activeListMenuId, setActiveListMenuId] = useState<string | null>(null);

    // Modal states
    const [selectedCard, setSelectedCard] = useState<any>(null);
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
    const [isManageBoardMembersOpen, setIsManageBoardMembersOpen] = useState(false);

    // KEEP WORKING: List Creation
    const handleCreateList = async () => {
        if (!newListName.trim()) return;
        setIsSubmittingList(true);
        const toastId = toast.loading('Creating list...')
        try {
            const res = await createList(board?.id, { name: newListName }, projectId);
            if (res.success) {
                toast.success(res.message, { id: toastId });
                router.refresh();
            } else {
                toast.error(res.message, { id: toastId });
            }
        } catch (error) {
            toast.error('Failed to create list', { id: toastId });
        } finally {
            setIsSubmittingList(false);
            setIsAddingList(false);
            setNewListName("");
        }
    };

    // KEEP WORKING: Card Creation
    const handleCreateCard = async (listId: string) => {
        if (!newCardTitle.trim()) return;
        setIsSubmittingCard(true);
        const toastId = toast.loading('Creating card...');
        try {
            const res = await createCard(board?.id, listId, { title: newCardTitle }, projectId);
            if (res.success) {
                toast.success(res.message, { id: toastId });
                setAddingCardToListId(null);
                setNewCardTitle("");
                router.refresh();
            } else {
                toast.error(res.message || 'Failed to create card', { id: toastId });
            }
        } catch (error) {
            toast.error('Failed to create card', { id: toastId });
        } finally {
            setIsSubmittingCard(false);
        }
    };

    // MOCK UI & CONSOLE LOGS

    const handleSaveBoardName = async () => {
        if (!boardName.trim() || boardName === board.name) {
            setIsEditingBoardName(false);
            return;
        }
        const toastId = toast.loading("Updating board name...");
        
        console.log("INTEGRATION: Service: boardService/board.service.ts -> updateBoard(boardId, workspaceId, data), Endpoint: PATCH /boards/${boardId}");

        setTimeout(() => {
            setBoard(prev => ({ ...prev, name: boardName }));
            toast.success("Board name updated (MOCK)", { id: toastId });
            setIsEditingBoardName(false);
            router.refresh();
        }, 500);
    };

    const handleSaveBoardSettings = async () => {
        const toastId = toast.loading("Saving board settings...");

        console.log("INTEGRATION: Service: boardService/board.service.ts -> updateBoard(boardId, workspaceId, data), Endpoint: PATCH /boards/${boardId}");

        setTimeout(() => {
            setBoard(prev => ({ 
                ...prev, 
                description: boardDesc, 
                visibility: boardVisibility, 
                status: boardStatus 
            }));
            toast.success("Board settings updated (MOCK)", { id: toastId });
            setIsBoardSettingsOpen(false);
            router.refresh();
        }, 500);
    };

    const handleToggleStar = async () => {
        const toastId = toast.loading("Updating star...");

        console.log("INTEGRATION: Service: boardService/board.service.ts -> toggleStarBoard(boardId, workspaceId), Endpoint: POST /boards/${boardId}/star");

        setTimeout(() => {
            const nextStarState = !board.isStarred;
            setBoard(prev => ({ ...prev, isStarred: nextStarState }));
            toast.success(nextStarState ? "Starred board (MOCK)" : "Removed from Starred (MOCK)", { id: toastId });
            router.refresh();
        }, 500);
    };

    const handleCopyBoard = async () => {
        const toastId = toast.loading("Copying board...");

        console.log("INTEGRATION: Service: boardService/board.service.ts -> copyBoard(boardId, workspaceId), Endpoint: POST /boards/${boardId}/copy");

        setTimeout(() => {
            toast.success("Board copied successfully (MOCK)", { id: toastId });
            router.push(`/projects/${projectId}`);
            router.refresh();
        }, 500);
    };

    const handleDeleteBoard = async () => {
        if (!confirm("Are you sure you want to delete this board? This cannot be undone.")) return;
        const toastId = toast.loading("Deleting board...");

        console.log("INTEGRATION: Service: boardService/board.service.ts -> deleteBoard(boardId, workspaceId), Endpoint: DELETE /boards/${boardId}");

        setTimeout(() => {
            toast.success("Board deleted successfully (MOCK)", { id: toastId });
            router.push(`/projects/${projectId}`);
            router.refresh();
        }, 500);
    };

    const handleRenameList = async (listId: string) => {
        if (!editingListName.trim()) return;
        const toastId = toast.loading("Renaming list...");
        try {
            const res = await updateList(board.id, listId, { name: editingListName }, projectId);
            if (res.success) {
                toast.success(res.message || "List renamed successfully", { id: toastId });
                setBoard(prev => ({
                    ...prev,
                    lists: prev.lists?.map(l => l.id === listId ? { ...l, name: editingListName } : l)
                }));
                setEditingListId(null);
                router.refresh();
            } else {
                toast.error(res.message || "Failed to rename list", { id: toastId });
            }
        } catch (error: any) {
            console.error("Error renaming list:", error);
            toast.error(error?.message || "An error occurred", { id: toastId });
        }
    };

    const handleDeleteList = async (listId: string) => {
        if (!confirm("Are you sure you want to delete this list?")) return;
        const toastId = toast.loading("Deleting list...");
        try {
            const res = await deleteList(board.id, listId, projectId);
            if (res.success) {
                toast.success(res.message || "List deleted successfully", { id: toastId });
                setBoard(prev => ({
                    ...prev,
                    lists: prev.lists?.filter(l => l.id !== listId)
                }));
                setActiveListMenuId(null);
                router.refresh();
            } else {
                toast.error(res.message || "Failed to delete list", { id: toastId });
            }
        } catch (error: any) {
            console.error("Error deleting list:", error);
            toast.error(error?.message || "An error occurred", { id: toastId });
        }
    };

    const handleSortCards = async (listId: string, sortBy: string) => {
        const toastId = toast.loading(`Sorting cards by ${sortBy}...`);

        console.log("INTEGRATION: Service: listService/list.service.ts -> (Frontend sort helper), Endpoint: N/A (Sorted in UI state)");

        setTimeout(() => {
            setBoard(prev => ({
                ...prev,
                lists: prev.lists?.map(l => {
                    if (l.id !== listId) return l;
                    const sorted = [...(l.cards || [])].sort((a, b) => {
                        if (sortBy === "title") return a.title.localeCompare(b.title);
                        if (sortBy === "due_date") {
                            const dateA = a.due_date ? new Date(a.due_date).getTime() : Infinity;
                            const dateB = b.due_date ? new Date(b.due_date).getTime() : Infinity;
                            return dateA - dateB;
                        }
                        if (sortBy === "priority") {
                            const pMap: Record<string, number> = { high: 1, medium: 2, low: 3 };
                            return (pMap[a.priority] || 4) - (pMap[b.priority] || 4);
                        }
                        return 0;
                    });
                    return { ...l, cards: sorted };
                })
            }));
            toast.success("Cards sorted (MOCK)", { id: toastId });
            setActiveListMenuId(null);
            router.refresh();
        }, 500);
    };

    const handleUpdateBoardMemberRole = async (userId: string, role: string) => {
        const toastId = toast.loading("Updating member role...");

        console.log("INTEGRATION: Service: boardService/board.service.ts -> updateBoardMemberRole(boardId, userId, workspaceId, data), Endpoint: PATCH /boards/${boardId}/members/${userId}");

        setTimeout(() => {
            setBoard(prev => ({
                ...prev,
                members: prev.members?.map(m => m.user_id === userId ? { ...m, role } : m)
            }));
            toast.success("Member role updated (MOCK)", { id: toastId });
            router.refresh();
        }, 500);
    };

    const handleRemoveMemberFromBoard = async (userId: string) => {
        if (!confirm("Remove this member from the board?")) return;
        const toastId = toast.loading("Removing member...");

        console.log("INTEGRATION: Service: boardService/board.service.ts -> removeMemberFromBoard(boardId, userId, workspaceId), Endpoint: DELETE /boards/${boardId}/members/${userId}");

        setTimeout(() => {
            setBoard(prev => ({
                ...prev,
                members: prev.members?.filter(m => m.user_id !== userId)
            }));
            toast.success("Member removed (MOCK)", { id: toastId });
            router.refresh();
        }, 500);
    };

    const handleUpdateBackgroundColor = async (color: string) => {
        const toastId = toast.loading("Updating background color...");

        console.log("INTEGRATION: Service: boardService/board.service.ts -> updateBoard(boardId, workspaceId, data), Endpoint: PATCH /boards/${boardId}");

        setTimeout(() => {
            setBoard(prev => ({ ...prev, background_color: color }));
            toast.success("Background color updated (MOCK)", { id: toastId });
            router.refresh();
        }, 500);
    };

    // Prop update trigger for CardDetailsModal changes
    const handleUpdateCardInBoardState = (updatedCard: any) => {
        setBoard(prev => ({
            ...prev,
            lists: prev.lists?.map(l => l.id === updatedCard.list_id ? {
                ...l,
                cards: l.cards?.map(c => c.id === updatedCard.id ? updatedCard : c)
            } : l)
        }));
    };

    // Prop delete trigger for CardDetailsModal changes
    const handleDeleteCardInBoardState = (cardId: string, listId: string) => {
        setBoard(prev => ({
            ...prev,
            lists: prev.lists?.map(l => l.id === listId ? {
                ...l,
                cards: l.cards?.filter(c => c.id !== cardId)
            } : l)
        }));
    };

    return (
        <div className="flex flex-col font-sans h-[calc(100vh-100px)] relative">
            
            {/* Board Header */}
            <div className="bg-black/30 backdrop-blur-sm px-4 py-3 flex flex-wrap items-center justify-between z-10 sticky top-0 gap-3 border-b border-white/5">
                <div className="flex items-center gap-2 flex-wrap">
                    {isEditingBoardName ? (
                        <input
                            type="text"
                            value={boardName}
                            onChange={(e) => setBoardName(e.target.value)}
                            onBlur={handleSaveBoardName}
                            onKeyDown={(e) => e.key === "Enter" && handleSaveBoardName()}
                            className="bg-[#22272B] text-white border border-blue-500 rounded px-2 py-0.5 text-sm focus:outline-none"
                            autoFocus
                        />
                    ) : (
                        <h1 
                            onClick={() => setIsEditingBoardName(true)}
                            className="text-lg font-bold text-white px-3 py-1 rounded bg-white/10 hover:bg-white/20 transition cursor-pointer"
                        >
                            {board.name}
                        </h1>
                    )}

                    <button 
                        onClick={handleToggleStar}
                        className="text-white/70 hover:text-white p-1.5 rounded hover:bg-white/10 transition"
                        title="Toggle Star"
                    >
                        <Star size={18} className={board.isStarred ? "fill-yellow-400 text-yellow-400" : ""} />
                    </button>

                    <button 
                        onClick={() => setIsBoardSettingsOpen(true)}
                        className="text-sm font-medium text-white px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 transition capitalize flex items-center gap-1.5"
                    >
                        <Settings size={14} />
                        <span>Settings</span>
                    </button>

                    <div className="w-[1px] h-4 bg-white/30 mx-1"></div>

                    {/* Board Members list */}
                    <div className="flex items-center">
                        <div 
                            className="flex -space-x-2 cursor-pointer"
                            onClick={() => setIsManageBoardMembersOpen(true)}
                            title="Manage Board Members"
                        >
                            {board.members?.slice(0, 5).map((member, i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold ring-2 ring-[#1C2126] hover:ring-white/50 transition z-10 hover:z-20">
                                    {member.user?.avatar_url ? (
                                        <img src={member.user.avatar_url} alt={member.user.name} className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        member.user?.name?.charAt(0).toUpperCase() || 'U'
                                    )}
                                </div>
                            ))}
                            {(board.members?.length || 0) > 5 && (
                                <div className="w-8 h-8 rounded-full bg-[#2C293D] flex items-center justify-center text-xs text-white ring-2 ring-[#1C2126] font-medium z-10">
                                    +{board.members.length - 5}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => setIsAddMemberModalOpen(true)}
                            className="ml-2 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition ring-2 ring-transparent"
                            title="Add Member to Board"
                        >
                            <UserPlus size={14} />
                        </button>
                    </div>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-2">
                    <button 
                        onClick={handleCopyBoard}
                        className="flex items-center gap-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition"
                        title="Copy entire board"
                    >
                        <Copy size={16} />
                        <span>Copy Board</span>
                    </button>
                    <button 
                        onClick={handleDeleteBoard}
                        className="flex items-center gap-2 text-sm font-medium text-red-200 bg-red-600/20 hover:bg-red-600/30 border border-red-500/20 px-3 py-1.5 rounded transition"
                        title="Delete board permanently"
                    >
                        <Trash2 size={16} />
                        <span>Delete Board</span>
                    </button>
                </div>
            </div>

            {/* Board Canvas */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden p-4">
                <div className="flex items-start gap-4 h-full pb-4">
                    {board.lists?.map((list) => (
                        <div
                            key={list.id}
                            className="bg-[#101204]/95 backdrop-blur-md rounded-xl w-72 flex-shrink-0 max-h-full flex flex-col border border-white/5 shadow-2xl relative"
                        >
                            {/* List Header */}
                            <div className="p-3 pb-2 flex items-center justify-between cursor-pointer group">
                                {editingListId === list.id ? (
                                    <input 
                                        type="text"
                                        value={editingListName}
                                        onChange={(e) => setEditingListName(e.target.value)}
                                        onBlur={() => handleRenameList(list.id)}
                                        onKeyDown={(e) => e.key === "Enter" && handleRenameList(list.id)}
                                        className="bg-[#22272B] text-white border border-blue-500 rounded px-2 py-0.5 text-sm focus:outline-none w-full mr-2"
                                        autoFocus
                                    />
                                ) : (
                                    <h3 
                                        onClick={() => { setEditingListId(list.id); setEditingListName(list.name); }}
                                        className="font-semibold text-white/90 text-sm px-2 py-1 rounded hover:bg-white/5 w-full mr-2 truncate"
                                    >
                                        {list.name}
                                    </h3>
                                )}
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-white/50 bg-[#22272B] px-2 py-0.5 rounded-full">{list.cards?.length || 0}</span>
                                    
                                    {/* List Actions Trigger */}
                                    <div className="relative">
                                        <button 
                                            onClick={() => setActiveListMenuId(activeListMenuId === list.id ? null : list.id)}
                                            className="text-white/50 hover:text-white transition p-1.5 hover:bg-white/10 rounded"
                                        >
                                            <MoreHorizontal size={16} />
                                        </button>

                                        {activeListMenuId === list.id && (
                                            <div className="absolute right-0 mt-2 w-48 bg-[#1C2126] border border-white/10 rounded-lg shadow-xl z-30 py-2">
                                                <div className="px-3 py-1 mb-1 border-b border-white/10 text-xs font-bold text-white/50 uppercase">List Actions (MOCK)</div>
                                                
                                                <button 
                                                    onClick={() => { setEditingListId(list.id); setEditingListName(list.name); setActiveListMenuId(null); }}
                                                    className="w-full text-left px-3 py-1.5 text-xs text-white/90 hover:bg-white/5 flex items-center gap-2"
                                                >
                                                    <Edit size={14} /> Rename List
                                                </button>
                                                
                                                <button 
                                                    onClick={() => handleSortCards(list.id, "title")}
                                                    className="w-full text-left px-3 py-1.5 text-xs text-white/90 hover:bg-white/5 flex items-center gap-2"
                                                >
                                                    <Compass size={14} /> Sort by Title
                                                </button>

                                                <button 
                                                    onClick={() => handleSortCards(list.id, "due_date")}
                                                    className="w-full text-left px-3 py-1.5 text-xs text-white/90 hover:bg-white/5 flex items-center gap-2"
                                                >
                                                    <Clock size={14} /> Sort by Due Date
                                                </button>

                                                <button 
                                                    onClick={() => handleSortCards(list.id, "priority")}
                                                    className="w-full text-left px-3 py-1.5 text-xs text-white/90 hover:bg-white/5 flex items-center gap-2"
                                                >
                                                    <Filter size={14} /> Sort by Priority
                                                </button>

                                                <div className="border-t border-white/10 my-1" />
                                                
                                                <button 
                                                    onClick={() => handleDeleteList(list.id)}
                                                    className="w-full text-left px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                                                >
                                                    <Trash2 size={14} /> Archive/Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Cards Container */}
                            <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-2 custom-scrollbar">
                                {list.cards?.map((card) => (
                                    <div
                                        key={card.id}
                                        onClick={() => setSelectedCard(card)}
                                        className="bg-[#22272B] hover:bg-[#2C3338] hover:ring-2 hover:ring-blue-500/50 text-white p-3 rounded-lg shadow-sm border border-white/5 cursor-pointer group transition-all duration-200"
                                    >
                                        {/* Cover Image */}
                                        {card.cover_image_url && (
                                            <div className="h-32 -mx-3 -mt-3 mb-2 rounded-t-lg bg-cover bg-center" style={{ backgroundImage: `url(${card.cover_image_url})` }}></div>
                                        )}

                                        {/* Cover Color */}
                                        {card.cover_color && !card.cover_image_url && (
                                            <div className="h-8 -mx-3 -mt-3 mb-2 rounded-t-lg" style={{ backgroundColor: card.cover_color }}></div>
                                        )}

                                        {/* Labels */}
                                        {card.labels && card.labels.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mb-2">
                                                {card.labels.map((label, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="h-2 w-10 rounded-full"
                                                        style={{ backgroundColor: label.color || label.label?.color || '#4ade80' }}
                                                        title={label.name || label.label?.name}
                                                    ></div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex items-start gap-2 mb-3">
                                            <p className="text-sm text-white/90 leading-snug">{card.title}</p>
                                        </div>

                                        {/* Badges */}
                                        <div className="flex items-center justify-between text-white/50 text-xs">
                                            <div className="flex items-center gap-3">
                                                {card.description && (
                                                    <div className="flex items-center hover:text-white/80 transition" title="This card has a description">
                                                        <AlignLeft size={14} />
                                                    </div>
                                                )}
                                                {card.commentsCount > 0 && (
                                                    <div className="flex items-center gap-1 hover:text-white/80 transition">
                                                        <MessageSquare size={14} />
                                                        <span>{card.commentsCount}</span>
                                                    </div>
                                                )}
                                                {card.attachmentsCount > 0 && (
                                                    <div className="flex items-center gap-1 hover:text-white/80 transition">
                                                        <Paperclip size={14} />
                                                        <span>{card.attachmentsCount}</span>
                                                    </div>
                                                )}
                                                {card.checklistsCount > 0 && (
                                                    <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded hover:bg-green-500/30 transition">
                                                        <CheckSquare size={12} />
                                                        <span>{card.checklistsCount}</span>
                                                    </div>
                                                )}
                                                {card.due_date && (
                                                    <div className="flex items-center gap-1 bg-white/5 text-white/70 px-1.5 py-0.5 rounded hover:bg-white/10 transition">
                                                        <Clock size={12} />
                                                        <span>{new Date(card.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Members */}
                                            {card.members && card.members.length > 0 && (
                                                <div className="flex -space-x-1">
                                                    {card.members.map((member, idx) => (
                                                        <div key={idx} className="w-6 h-6 rounded-full bg-indigo-600 border border-[#22272B] flex items-center justify-center text-[10px] font-bold z-10 hover:z-20 transition-transform hover:scale-110">
                                                            {member.avatar_url || member.user?.avatar_url ? (
                                                                <img src={member.avatar_url || member.user?.avatar_url} alt="member" className="w-full h-full rounded-full object-cover" />
                                                            ) : (
                                                                (member.name || member.user?.name || 'U').charAt(0).toUpperCase()
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Add Card Button / Form */}
                            {addingCardToListId === list.id ? (
                                <div className="p-2 pt-1">
                                    <textarea
                                        value={newCardTitle}
                                        onChange={(e) => setNewCardTitle(e.target.value)}
                                        placeholder="Enter a title for this card..."
                                        className="w-full bg-[#22272B] text-white/90 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 border border-white/10 resize-none"
                                        autoFocus
                                        rows={2}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleCreateCard(list.id);
                                            }
                                            if (e.key === 'Escape') {
                                                setAddingCardToListId(null);
                                                setNewCardTitle("");
                                            }
                                        }}
                                    />
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleCreateCard(list.id)}
                                            disabled={isSubmittingCard || !newCardTitle.trim()}
                                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1.5 rounded transition disabled:opacity-50"
                                        >
                                            {isSubmittingCard ? "Adding..." : "Add card"}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setAddingCardToListId(null);
                                                setNewCardTitle("");
                                            }}
                                            className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded transition"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-2 pt-1">
                                    <button
                                        onClick={() => setAddingCardToListId(list.id)}
                                        className="flex items-center gap-2 text-sm text-white/60 hover:text-white hover:bg-white/10 w-full p-2 rounded-lg transition-colors group"
                                    >
                                        <Plus size={16} />
                                        <span>Add a card</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Add List Button / Form */}
                    {isAddingList ? (
                        <div className="w-72 flex-shrink-0 bg-[#101204]/95 backdrop-blur-md rounded-xl p-2 border border-white/5 h-fit">
                            <input
                                type="text"
                                value={newListName}
                                onChange={(e) => setNewListName(e.target.value)}
                                placeholder="Enter list title..."
                                className="w-full bg-[#22272B] text-white/90 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 border border-white/10"
                                autoFocus
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleCreateList();
                                    if (e.key === 'Escape') {
                                        setIsAddingList(false);
                                        setNewListName("");
                                    }
                                }}
                            />
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleCreateList}
                                    disabled={isSubmittingList || !newListName.trim()}
                                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1.5 rounded transition disabled:opacity-50"
                                >
                                    {isSubmittingList ? "Adding..." : "Add list"}
                                </button>
                                <button
                                    onClick={() => {
                                        setIsAddingList(false);
                                        setNewListName("");
                                    }}
                                    className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded transition"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="w-72 flex-shrink-0">
                            <button
                                onClick={() => setIsAddingList(true)}
                                className="flex items-center gap-2 text-sm text-white bg-white/10 hover:bg-white/20 backdrop-blur w-full p-3 rounded-xl transition-colors font-medium border border-white/5"
                            >
                                <Plus size={18} />
                                Add another list
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Board Settings Modal */}
            {isBoardSettingsOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsBoardSettingsOpen(false)}>
                    <div className="bg-[#1C2126] border border-white/10 rounded-xl shadow-2xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        <div className="p-4 border-b border-white/10 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Settings size={18} /> Board Settings (MOCK)
                            </h2>
                            <button onClick={() => setIsBoardSettingsOpen(false)} className="text-white/50 hover:text-white p-1 rounded hover:bg-white/10"><X size={18} /></button>
                        </div>
                        <div className="p-4 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-white/85 mb-1.5">Description</label>
                                <textarea 
                                    value={boardDesc}
                                    onChange={(e) => setBoardDesc(e.target.value)}
                                    placeholder="Add description..."
                                    className="w-full bg-[#22272B] border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500 h-24"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/85 mb-1.5">Visibility</label>
                                <select 
                                    value={boardVisibility}
                                    onChange={(e) => setBoardVisibility(e.target.value)}
                                    className="w-full bg-[#22272B] border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="workspace">Workspace</option>
                                    <option value="private">Private</option>
                                    <option value="public">Public</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/85 mb-1.5">Status</label>
                                <select 
                                    value={boardStatus}
                                    onChange={(e) => setBoardStatus(e.target.value)}
                                    className="w-full bg-[#22272B] border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                    <option value="active">Active</option>
                                    <option value="archived">Archived</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white/85 mb-1.5">Change Background Color</label>
                                <div className="flex flex-wrap gap-2">
                                    {['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#1e293b', '#000000'].map((color) => (
                                        <button 
                                            key={color}
                                            onClick={() => handleUpdateBackgroundColor(color)}
                                            style={{ backgroundColor: color }}
                                            className={`w-8 h-8 rounded-lg border border-white/20 hover:scale-110 transition-transform ${board.background_color === color ? 'ring-2 ring-white' : ''}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t border-white/10 flex justify-end gap-2 bg-[#101204]/50">
                            <button 
                                onClick={() => setIsBoardSettingsOpen(false)}
                                className="px-4 py-2 text-sm text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleSaveBoardSettings}
                                className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                            >
                                Save Settings
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Manage Board Members Modal */}
            {isManageBoardMembersOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsManageBoardMembersOpen(false)}>
                    <div className="bg-[#1C2126] border border-white/10 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        <div className="p-4 border-b border-white/10 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-white">Board Members ({board.members?.length || 0})</h2>
                            <button onClick={() => setIsManageBoardMembersOpen(false)} className="text-white/50 hover:text-white p-1 rounded hover:bg-white/10"><X size={18} /></button>
                        </div>
                        <div className="p-4 max-h-[300px] overflow-y-auto space-y-3 custom-scrollbar">
                            {board.members?.map((member) => (
                                <div key={member.id} className="flex items-center justify-between bg-[#22272B]/30 border border-white/5 p-3 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white">
                                            {member.user?.avatar_url ? (
                                                <img src={member.user.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                                            ) : (
                                                member.user?.name?.charAt(0).toUpperCase()
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
                                            onChange={(e) => handleUpdateBoardMemberRole(member.user_id, e.target.value)}
                                            className="bg-[#22272B] border border-white/10 text-white rounded px-2 py-1 text-xs focus:outline-none"
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="member">Member</option>
                                            <option value="observer">Observer</option>
                                        </select>
                                        <button 
                                            onClick={() => handleRemoveMemberFromBoard(member.user_id)}
                                            className="text-white/40 hover:text-red-400 p-1 rounded hover:bg-white/5 transition"
                                            title="Remove member from board"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Scrollbar Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
                
                /* For the main board scrollbar */
                ::-webkit-scrollbar {
                    height: 12px;
                    width: 12px;
                }
                ::-webkit-scrollbar-track {
                    background: rgba(0,0,0,0.2);
                    border-radius: 8px;
                }
                ::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.4);
                    border-radius: 8px;
                    border: 3px solid transparent;
                    background-clip: padding-box;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: rgba(255,255,255,0.6);
                    border: 3px solid transparent;
                    background-clip: padding-box;
                }
            `}} />

            {/* Card Details Modal */}
            {selectedCard && (
                <CardDetailsModal
                    cardId={selectedCard.id}
                    board={board}
                    projectId={projectId}
                    onClose={() => setSelectedCard(null)}
                    onUpdateCard={handleUpdateCardInBoardState}
                    onDeleteCard={handleDeleteCardInBoardState}
                />
            )}

            {/* Add Member Modal */}
            <AddBoardMemberModal
                isOpen={isAddMemberModalOpen}
                onClose={() => setIsAddMemberModalOpen(false)}
                boardId={board?.id}
                workspaceId={board?.workspace_id}
                users={users}
            />
        </div>
    )
}
