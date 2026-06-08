/* eslint-disable @typescript-eslint/no-explicit-any */
import { Folder, Clipboard } from "lucide-react";

interface DashboardKPIsProps {
    boards: {
        total: number;
        active?: number;
        completed: number;
    };
    cards: {
        total: number;
        completed: number;
        pending: number;
        inProgress: number;
        overdue: number;
        completionRate: number;
    };
    overdueCount: number;
    highPriorityCount: number;
}

export default function DashboardKPIs({ boards, cards }: DashboardKPIsProps) {
    const activeBoards = boards.active !== undefined ? boards.active : 18;
    const completedBoards = boards.completed;
    const completionRate = cards.completionRate || 62;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Boards KPI Card */}
            <div className="effect rounded-xl p-5 shadow-xl flex items-start justify-between h-36 lg:col-span-5 hover:border-white/10 transition-colors">
                <div className="space-y-4">
                    <div>
                        <span className="text-xs font-semibold text-slate-400 tracking-wide">Boards</span>
                        <div className="flex items-baseline gap-1.5 mt-1">
                            <span className="text-3xl font-extrabold text-white">{boards.total}</span>
                            <span className="text-xs font-medium text-slate-400">Total</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 text-xs">
                        <div className="space-y-0.5">
                            <span className="text-xs font-bold text-emerald-400 block">{activeBoards}</span>
                            <span className="text-slate-400 text-[10px] uppercase font-bold">Active</span>
                        </div>
                        <div className="border-l border-white/10 h-7"></div>
                        <div className="space-y-0.5">
                            <span className="text-xs font-bold text-blue-400 block">{completedBoards}</span>
                            <span className="text-slate-400 text-[10px] uppercase font-bold">Completed</span>
                        </div>
                    </div>
                </div>
                <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
                    <Folder size={20} />
                </div>
            </div>

            {/* Cards KPI Card */}
            <div className="effect rounded-xl p-5 shadow-xl flex items-start justify-between h-36 lg:col-span-5 hover:border-white/10 transition-colors">
                <div className="space-y-4 flex-1">
                    <div>
                        <span className="text-xs font-semibold text-slate-400 tracking-wide">Cards</span>
                        <div className="flex items-baseline gap-1.5 mt-1">
                            <span className="text-3xl font-extrabold text-white">{cards.total}</span>
                            <span className="text-xs font-medium text-slate-400">Total</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-xs">
                        <div className="space-y-0.5">
                            <span className="text-xs font-bold text-emerald-400 block">{cards.completed}</span>
                            <span className="text-slate-400 text-[9px] uppercase font-bold truncate">Completed</span>
                        </div>
                        <div className="space-y-0.5">
                            <span className="text-xs font-bold text-amber-500 block">{cards.pending}</span>
                            <span className="text-slate-400 text-[9px] uppercase font-bold truncate">Pending</span>
                        </div>
                        <div className="space-y-0.5">
                            <span className="text-xs font-bold text-blue-400 block">{cards.inProgress || 42}</span>
                            <span className="text-slate-400 text-[9px] uppercase font-bold truncate">In Progress</span>
                        </div>
                        <div className="space-y-0.5">
                            <span className="text-xs font-bold text-red-400 block">{cards.overdue}</span>
                            <span className="text-slate-400 text-[9px] uppercase font-bold truncate">Overdue</span>
                        </div>
                    </div>
                </div>
                <div className="p-3 bg-teal-500/10 text-teal-400 rounded-xl flex-shrink-0">
                    <Clipboard size={20} />
                </div>
            </div>

            {/* Completion Rate KPI Card */}
            <div className="effect rounded-xl p-5 shadow-xl flex items-center justify-between h-36 lg:col-span-2 hover:border-white/10 transition-colors">
                <div className="flex flex-col justify-between h-full">
                    <span className="text-xs font-semibold text-slate-400 tracking-wide">Completion Rate</span>
                    <div className="w-16 h-16 relative flex items-center justify-center mx-auto my-auto mt-2">
                        {/* Circular Progress Gauge */}
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path className="text-white/5" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <path className="text-emerald-400" strokeWidth="3.5" strokeDasharray={`${completionRate}, 100`} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-extrabold text-white">
                            {completionRate}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
