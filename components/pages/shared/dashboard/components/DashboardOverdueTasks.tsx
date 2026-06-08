/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { Clock } from "lucide-react";

interface OverdueTaskItem {
    id: string;
    title: string;
    due_date: string | null;
    priority: string;
    board: {
        name: string;
    };
    members?: any[];
}

interface DashboardOverdueTasksProps {
    overdueTasksList: OverdueTaskItem[];
    formatDate: (dateStr: string | null) => string;
}

export default function DashboardOverdueTasks({ overdueTasksList, formatDate }: DashboardOverdueTasksProps) {
    const getPriorityColor = (priority: string) => {
        const lower = priority.toLowerCase();
        if (lower.includes('high')) return 'text-red-400 bg-red-500/10 border-red-500/20';
        if (lower.includes('medium')) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    };

    const getBulletColor = (idx: number) => {
        if (idx === 0) return 'bg-red-500';
        if (idx === 1) return 'bg-amber-500';
        if (idx === 2) return 'bg-blue-500';
        return 'bg-emerald-500';
    };

    return (
        <div className="effect rounded-xl p-5 shadow-xl hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Overdue Tasks
                </h3>
                <button className="text-blue-400 hover:text-blue-300 text-xs font-semibold">View all</button>
            </div>
            <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
                {overdueTasksList.map((t, idx) => (
                    <div key={t.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-b-0 gap-3">
                        <div className="flex items-start gap-2.5 flex-1 min-w-0">
                            <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${getBulletColor(idx)}`}></span>
                            <div className="min-w-0">
                                <span className="font-semibold text-xs text-white block truncate">{t.title}</span>
                                <span className="text-[10px] text-slate-400 block truncate">{t.board?.name}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                            <span className="text-[10px] text-red-400 font-bold flex items-center gap-1">
                                <Clock size={10} />
                                {formatDate(t.due_date)}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold capitalize border ${getPriorityColor(t.priority)}`}>
                                {t.priority}
                            </span>
                            {/* Assigned members avatars */}
                            <div className="flex -space-x-1.5 items-center">
                                {t.members && t.members.length > 0 ? (
                                    t.members.slice(0, 2).map((m: any, i: number) => (
                                        <div key={i} className="w-4 h-4 rounded-full bg-slate-700 border border-[#121826] flex items-center justify-center text-[8px] font-bold text-white">
                                            {m.user?.avatar_url ? (
                                                <img src={m.user.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                                            ) : (
                                                m.user?.name?.charAt(0).toUpperCase() || "U"
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="w-4 h-4 rounded-full bg-slate-700 border border-[#121826] flex items-center justify-center text-[8px] font-bold text-white">
                                        D
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
