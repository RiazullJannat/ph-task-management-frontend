interface PriorityItem {
    priority: string;
    count: number;
}

interface DashboardPriorityBreakdownProps {
    priorityBreakdown: PriorityItem[];
}

export default function DashboardPriorityBreakdown({ priorityBreakdown }: DashboardPriorityBreakdownProps) {
    const totalCount = priorityBreakdown.reduce((acc, curr) => acc + curr.count, 0);

    const getPriorityColor = (priority: string) => {
        const lower = priority.toLowerCase();
        if (lower.includes('high')) return 'bg-red-500';
        if (lower.includes('medium')) return 'bg-amber-500';
        return 'bg-emerald-500';
    };

    // Calculate dynamic conic-gradient segments
    // Default fallback to 25%, 51%, 24% if totalCount is 0
    let gradient = "conic-gradient(#ef4444 0% 25%, #f59e0b 25% 76%, #10b981 76% 100%)";
    if (totalCount > 0) {
        let currentPct = 0;
        const parts = priorityBreakdown.map(p => {
            const pct = Math.round((p.count / totalCount) * 100);
            const start = currentPct;
            currentPct += pct;
            return {
                color: p.priority.toLowerCase().includes('high') ? '#ef4444' : p.priority.toLowerCase().includes('medium') ? '#f59e0b' : '#10b981',
                start,
                end: currentPct
            };
        });
        gradient = `conic-gradient(${parts.map(p => `${p.color} ${p.start}% ${p.end}%`).join(', ')})`;
    }

    return (
        <div className="effect rounded-xl p-5 shadow-xl h-full flex flex-col justify-between hover:border-white/10 transition-colors">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Priority Breakdown
            </h3>
            <div className="flex items-center justify-between gap-4 my-auto">
                {/* Beautiful Donut Chart */}
                <div 
                    className="w-24 h-24 rounded-full border-[10px] border-white/5 relative flex items-center justify-center flex-shrink-0" 
                    style={{ background: gradient }}
                >
                    <div className="absolute inset-1.5 bg-slate-950/80 rounded-full flex flex-col items-center justify-center">
                        <span className="text-[10px] font-semibold text-slate-500 uppercase">Total</span>
                        <span className="text-base font-extrabold text-white">{totalCount}</span>
                    </div>
                </div>
                {/* Legend list */}
                <div className="space-y-1.5 flex-1 pl-4 text-xs">
                    {priorityBreakdown.map((pr, idx) => {
                        const percent = totalCount > 0 ? Math.round((pr.count / totalCount) * 100) : 0;
                        return (
                            <div key={idx} className="flex items-center justify-between text-slate-300">
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${getPriorityColor(pr.priority)}`}></span>
                                    <span className="font-medium text-slate-300 capitalize">{pr.priority}</span>
                                </div>
                                <span className="font-bold text-white ml-auto">
                                    {pr.count} <span className="text-slate-500 font-normal text-[10px]">({percent}%)</span>
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
