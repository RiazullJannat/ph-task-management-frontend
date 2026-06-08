import { Calendar } from "lucide-react";

interface UpcomingTaskItem {
    id: string;
    title: string;
    due_date: string | null;
    priority: string;
    board: {
        name: string;
    };
}

interface DashboardUpcomingDeadlinesProps {
    upcomingDeadlines: UpcomingTaskItem[];
    formatDate: (dateStr: string | null) => string;
}

export default function DashboardUpcomingDeadlines({ upcomingDeadlines, formatDate }: DashboardUpcomingDeadlinesProps) {
    const getPriorityColor = (priority: string) => {
        const lower = priority.toLowerCase();
        if (lower.includes('high')) return 'text-red-400 bg-red-500/10 border-red-500/20';
        if (lower.includes('medium')) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    };

    const getBulletColor = (idx: number) => {
        if (idx === 0) return 'bg-amber-500';
        if (idx === 1) return 'bg-blue-500';
        if (idx === 2) return 'bg-purple-500';
        return 'bg-emerald-500';
    };

    return (
        <div className="effect rounded-xl p-5 shadow-xl hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Upcoming Deadlines
                </h3>
                <button className="text-blue-400 hover:text-blue-300 text-xs font-semibold">View all</button>
            </div>
            <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
                {upcomingDeadlines.map((t, idx) => (
                    <div key={t.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-b-0 gap-3">
                        <div className="flex items-start gap-2.5 flex-1 min-w-0">
                            <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${getBulletColor(idx)}`}></span>
                            <div className="min-w-0">
                                <span className="font-semibold text-xs text-white block truncate">{t.title}</span>
                                <span className="text-[10px] text-slate-400 block truncate">{t.board?.name}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                            <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                <Calendar size={10} className="text-slate-500" />
                                {formatDate(t.due_date)}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold capitalize border ${getPriorityColor(t.priority)}`}>
                                {t.priority}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
