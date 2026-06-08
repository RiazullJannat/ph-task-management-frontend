/* eslint-disable @typescript-eslint/no-explicit-any */
import { Check } from "lucide-react";
import { RecentActivityItem } from "@/types/dashbaordType/dashboard.type";

interface DashboardRecentActivityProps {
    activityList: RecentActivityItem[];
    getRelativeTime: (dateStr: string) => string;
}

export default function DashboardRecentActivity({ activityList, getRelativeTime }: DashboardRecentActivityProps) {
    const getIconColor = (idx: number) => {
        if (idx === 0) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
        if (idx === 1) return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    };

    return (
        <div className="effect rounded-xl p-5 shadow-xl hover:border-white/10 transition-colors flex flex-col h-[320px]">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Recent Activity
                </h3>
                <button className="text-blue-400 hover:text-blue-300 text-xs font-semibold">View all</button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-1">
                {activityList.map((act, idx) => (
                    <div key={act.id} className="flex items-start justify-between text-xs gap-3">
                        <div className="flex items-start gap-2.5 min-w-0">
                            {/* Checkmark circle */}
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${getIconColor(idx)}`}>
                                <Check size={10} strokeWidth={3} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-slate-300 leading-normal text-[11px]">
                                    <span className="font-bold text-white">{act.user?.name}</span> {act.description}
                                </p>
                            </div>
                        </div>
                        <span className="text-[10px] text-slate-500 font-medium whitespace-nowrap">
                            {getRelativeTime(act.created_at)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
