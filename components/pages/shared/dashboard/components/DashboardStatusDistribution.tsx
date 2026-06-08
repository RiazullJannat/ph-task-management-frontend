interface StatusItem {
    status: string;
    count: number;
}

interface DashboardStatusDistributionProps {
    statusDistribution: StatusItem[];
}

export default function DashboardStatusDistribution({ statusDistribution }: DashboardStatusDistributionProps) {
    const totalCount = statusDistribution.reduce((acc, curr) => acc + curr.count, 0);
    
    // Status color mapping for dots and segment representations
    const getColorClass = (idx: number) => {
        if (idx === 0) return 'bg-blue-500';
        if (idx === 1) return 'bg-indigo-500';
        if (idx === 2) return 'bg-emerald-500';
        return 'bg-green-400';
    };

    return (
        <div className="effect rounded-xl p-5 shadow-xl h-full flex flex-col justify-between hover:border-white/10 transition-colors">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Status Distribution
            </h3>
            <div className="flex items-center justify-between gap-4 my-auto">
                {/* Beautiful Donut Chart */}
                <div 
                    className="w-24 h-24 rounded-full border-[10px] border-white/5 relative flex items-center justify-center flex-shrink-0" 
                    style={{ background: "conic-gradient(#3b82f6 0% 37%, #6366f1 37% 49%, #10b981 49% 86%, #34d399 86% 100%)" }}
                >
                    <div className="absolute inset-1.5 bg-slate-950/80 rounded-full flex flex-col items-center justify-center">
                        <span className="text-[10px] font-semibold text-slate-500 uppercase">Total</span>
                        <span className="text-base font-extrabold text-white">{totalCount}</span>
                    </div>
                </div>
                {/* Legend list */}
                <div className="space-y-1.5 flex-1 pl-4 text-xs">
                    {statusDistribution.map((st, idx) => {
                        const percent = totalCount > 0 ? Math.round((st.count / totalCount) * 100) : 0;
                        return (
                            <div key={idx} className="flex items-center justify-between text-slate-300">
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${getColorClass(idx)}`}></span>
                                    <span className="font-medium text-slate-300">{st.status}</span>
                                </div>
                                <span className="font-bold text-white ml-auto">
                                    {st.count} <span className="text-slate-500 font-normal text-[10px]">({percent}%)</span>
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
