/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { createComment, getCardComments } from "@/service/commentService/comment.service";
import { TCardDetails } from "@/types/cardType/card.type";
import { TCommentItem } from "@/types/commentType/comment.type";

interface CardCommentsProps {
    card: TCardDetails & { comments?: any[] };
    boardId: string;
    projectId: string;
    onUpdateCard: (updatedCard: any) => void;
}

export default function CardComments({
    card,
    boardId,
    projectId,
    onUpdateCard
}: CardCommentsProps) {
    const [comments, setComments] = useState<TCommentItem[]>(card.comments || []);
    const [newComment, setNewComment] = useState("");
    const [replyToId, setReplyToId] = useState<string | null>(null);
    const [replyContent, setReplyContent] = useState("");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await getCardComments(boardId, card.id);
                if (res.success) {
                    setComments(res.data || []);
                }
            } catch (err) {
                console.error("Failed to fetch comments", err);
            }
        };
        fetchComments();
    }, [boardId, card.id]);

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        const toastid = toast.loading('Adding comment...');
        try {
            const res = await createComment(boardId, card.id, { content: newComment }, projectId);
            if (res.success) {
                toast.success(res.message, { id: toastid });
                const updatedComments = [res.data, ...comments];
                setComments(updatedComments);
                const updated = {
                    ...card,
                    comments: updatedComments,
                    commentsCount: updatedComments.length
                };
                onUpdateCard(updated);
            } else {
                toast.error(res.message || 'Failed to add comment', { id: toastid });
            }
        } catch (error) {
            toast.error('Failed to add comment', { id: toastid });
        } finally {
            setNewComment("");
        }
    };

    const handleAddReply = async (parentId: string) => {
        if (!replyContent.trim()) return;
        const toastid = toast.loading('Adding reply...');
        try {
            const res = await createComment(boardId, card.id, { content: replyContent, parentId }, projectId);
            if (res.success) {
                toast.success(res.message, { id: toastid });
                const updatedComments = comments.map((c: any) => {
                    if (c.id !== parentId) return c;
                    return {
                        ...c,
                        replies: [...(c.replies || []), res.data]
                    };
                });
                setComments(updatedComments);
                const updated = {
                    ...card,
                    comments: updatedComments
                };
                onUpdateCard(updated);
            } else {
                toast.error(res.message || 'Failed to add reply', { id: toastid });
            }
        } catch (error) {
            toast.error('Failed to add reply', { id: toastid });
        } finally {
            setReplyContent("");
            setReplyToId(null);
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-md font-semibold text-white flex items-center gap-2">
                <MessageSquare size={16} /> Conversation
            </h3>
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white uppercase">CU</div>
                <div className="flex-1 space-y-2">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="w-full bg-[#22272B] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500 h-20"
                    />
                    <button
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg transition disabled:opacity-50"
                    >
                        Send Comment
                    </button>
                </div>
            </div>

            {/* Comments list */}
            <div className="space-y-4 pt-4 border-t border-white/5">
                {comments.map((comment: any) => (
                    <div key={comment.id} className="space-y-2.5">
                        <div className="flex items-start gap-3">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                                {comment.user?.name?.charAt(0) || "U"}
                            </div>
                            <div className="flex-1 bg-[#22272B]/50 border border-white/5 p-3 rounded-xl">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-bold text-white/90">{comment.user?.name}</span>
                                    <span className="text-[10px] text-white/40">{new Date(comment.created_at).toLocaleString()}</span>
                                </div>
                                <p className="text-xs text-white/80 leading-relaxed">{comment.content}</p>

                                <div className="flex items-center gap-3 mt-2">
                                    <button
                                        onClick={() => setReplyToId(replyToId === comment.id ? null : comment.id)}
                                        className="text-[10px] font-semibold text-white/50 hover:text-white"
                                    >
                                        Reply
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Reply input */}
                        {replyToId === comment.id && (
                            <div className="flex gap-2 pl-10">
                                <input
                                    type="text"
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    placeholder="Write a reply..."
                                    className="flex-1 bg-[#22272B] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                                />
                                <button
                                    onClick={() => handleAddReply(comment.id)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-3 py-1.5 rounded-lg transition"
                                >
                                    Reply
                                </button>
                            </div>
                        )}

                        {/* Threaded replies list */}
                        {comment.replies?.map((rep: any) => (
                            <div key={rep.id} className="flex items-start gap-3 pl-10">
                                <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-[9px] font-bold text-white uppercase">
                                    {rep.user?.name?.charAt(0) || "R"}
                                </div>
                                <div className="flex-1 bg-[#22272B]/30 border border-white/5 p-2.5 rounded-xl">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-bold text-white/80">{rep.user?.name}</span>
                                        <span className="text-[9px] text-white/40">{new Date(rep.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-xs text-white/75">{rep.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
