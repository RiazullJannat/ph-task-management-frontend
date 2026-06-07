/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { TBoardDetails } from "@/types/baordType/board.type";
import {
    MoreHorizontal, Plus, Filter,
    MessageSquare, Paperclip, CheckSquare,
    Clock, UserPlus, Share2, Star, AlignLeft, X
} from "lucide-react";
import { createList } from "@/service/listService/list.service";
import { toast } from "sonner";

export default function BoardDetails({ board, projectId }: { board: TBoardDetails, projectId: string }) {
    const [isAddingList, setIsAddingList] = useState(false);
    const [newListName, setNewListName] = useState("");
    const [isSubmittingList, setIsSubmittingList] = useState(false);


    const handleCreateList = async () => {
        if (!newListName.trim()) return;
        const toastId = toast.loading('Creating list...')
        try {
            const res = await createList(board?.id, { name: newListName }, projectId);
            console.log(res)
            if (res.success) {
                toast.success(res.message, { id: toastId })
            }
            else {
                toast.error(res.message, { id: toastId })
            }

        } catch (error) {
            toast.error('Failed to create list', { id: toastId })
        } finally {
            setIsSubmittingList(false);
        }
    };

    return (
        <div
            className="flex flex-col  font-sans h-[calc(100vh-100px)]"

        >
            {/* Board Header */}
            <div className="bg-black/30 backdrop-blur-sm px-4 py-3 flex flex-wrap items-center justify-between z-10 sticky top-0 gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-lg font-bold text-white px-3 py-1 rounded bg-white/10 hover:bg-white/20 transition cursor-pointer">
                        {board.name}
                    </h1>
                    <button className="text-white/70 hover:text-white p-1.5 rounded hover:bg-white/10 transition">
                        <Star size={18} className={board.isStarred ? "fill-yellow-400 text-yellow-400" : ""} />
                    </button>

                    <button className="text-sm font-medium text-white px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 transition capitalize">
                        {board.visibility || 'Workspace'}
                    </button>

                    <button className="text-sm font-medium text-white px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 transition">
                        Board
                    </button>

                    <div className="w-[1px] h-4 bg-white/30 mx-1"></div>

                    <div className="flex items-center">
                        <div className="flex -space-x-2">
                            {board.members?.slice(0, 5).map((member, i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold ring-2 ring-transparent hover:ring-white/50 transition cursor-pointer z-10 hover:z-20">
                                    {member.user?.avatar_url ? (
                                        <img src={member.user.avatar_url} alt={member.user.name} className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        member.user?.name?.charAt(0).toUpperCase() || 'U'
                                    )}
                                </div>
                            ))}
                        </div>
                        <button className="ml-2 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition ring-2 ring-transparent">
                            <UserPlus size={14} />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 text-sm font-medium text-black bg-white/90 hover:bg-white px-3 py-1.5 rounded transition">
                        <Share2 size={16} />
                        Share
                    </button>
                    <button className="p-1.5 text-white/80 hover:text-white rounded bg-white/10 hover:bg-white/20 transition flex items-center gap-2 px-3">
                        <Filter size={16} />
                        <span className="text-sm hidden sm:inline">Filter</span>
                    </button>
                    <button className="p-1.5 text-white/80 hover:text-white rounded bg-white/10 hover:bg-white/20 transition">
                        <MoreHorizontal size={18} />
                    </button>
                </div>
            </div>

            {/* Board Canvas */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden p-4">
                <div className="flex items-start gap-4 h-full pb-4">
                    {board.lists?.map((list) => (
                        <div
                            key={list.id}
                            className="bg-[#101204]/95 backdrop-blur-md rounded-xl w-72 flex-shrink-0 max-h-full flex flex-col border border-white/5 shadow-2xl"
                        >
                            {/* List Header */}
                            <div className="p-3 pb-2 flex items-center justify-between cursor-pointer group">
                                <h3 className="font-semibold text-white/90 text-sm px-2 py-1 rounded focus:bg-[#22272B] focus:outline-none w-full mr-2">
                                    {list.name}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-white/50 bg-[#22272B] px-2 py-0.5 rounded-full">{list.cards?.length || 0}</span>
                                    <button className="text-white/50 hover:text-white transition p-1.5 hover:bg-white/10 rounded">
                                        <MoreHorizontal size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Cards Container */}
                            <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-2 custom-scrollbar">
                                {list.cards?.map((card) => (
                                    <div
                                        key={card.id}
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
                                                        style={{ backgroundColor: label.color || '#4ade80' }}
                                                        title={label.name}
                                                    ></div>
                                                ))}
                                            </div>
                                        )}

                                        <p className="text-sm text-white/90 mb-3 leading-snug">{card.title}</p>

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
                                                            {member.avatar_url ? (
                                                                <img src={member.avatar_url} alt="member" className="w-full h-full rounded-full object-cover" />
                                                            ) : (
                                                                member.name?.charAt(0).toUpperCase() || 'U'
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Add Card Button */}
                            <div className="p-2 pt-1">
                                <button className="flex items-center gap-2 text-sm text-white/60 hover:text-white hover:bg-white/10 w-full p-2 rounded-lg transition-colors group">
                                    <Plus size={16} />
                                    <span>Add a card</span>
                                    <div className="ml-auto opacity-0 group-hover:opacity-100 p-1 hover:bg-white/20 rounded">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                                    </div>
                                </button>
                            </div>
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
        </div>
    )
}
