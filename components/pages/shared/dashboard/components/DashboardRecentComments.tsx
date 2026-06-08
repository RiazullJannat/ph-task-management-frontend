/* eslint-disable @next/next/no-img-element */

interface RecentCommentItem {
    id: string;
    content: string;
    created_at: string;
    user: {
        id: string;
        name: string;
        avatar_url: string | null;
    };
    card: {
        id: string;
        title: string;
        board: {
            id: string;
            name: string;
        };
    };
}

interface DashboardRecentCommentsProps {
    commentsList: RecentCommentItem[];
    getRelativeTime: (dateStr: string) => string;
}

export default function DashboardRecentComments({ commentsList, getRelativeTime }: DashboardRecentCommentsProps) {
    return (
        <div className="effect rounded-xl p-5 shadow-xl hover:border-white/10 transition-colors flex flex-col h-[300px]">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Recent Comments
                </h3>
                <button className="text-blue-400 hover:text-blue-300 text-xs font-semibold">View all</button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3.5 pr-1">
                {commentsList.map((c) => (
                    <div key={c.id} className="flex items-start justify-between text-xs gap-3">
                        <div className="flex items-start gap-2.5 min-w-0">
                            <div className="w-5.5 h-5.5 rounded-full bg-slate-700 border border-[#121826] flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0 mt-0.5">
                                {c.user?.avatar_url ? (
                                    <img src={c.user.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    c.user?.name?.charAt(0).toUpperCase() || "U"
                                )}
                            </div>
                            <div className="min-w-0">
                                <p className="text-slate-300 leading-normal text-[11px]">
                                    {c.content}
                                </p>
                                <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                                    on &ldquo;{c.card?.title || 'Card'}&rdquo;
                                </span>
                            </div>
                        </div>
                        <span className="text-[10px] text-slate-500 font-medium whitespace-nowrap">
                            {getRelativeTime(c.created_at)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
