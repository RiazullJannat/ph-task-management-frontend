interface TeamProductivityItem {
    period: string;
    completedTasks: number;
}

interface DashboardTeamProductivityProps {
    teamProductivity: TeamProductivityItem[];
}

export default function DashboardTeamProductivity({ teamProductivity }: DashboardTeamProductivityProps) {
    const list = teamProductivity.length > 0 ? teamProductivity : [
        { period: "May 12", completedTasks: 20 },
        { period: "May 13", completedTasks: 45 },
        { period: "May 14", completedTasks: 55 },
        { period: "May 15", completedTasks: 50 },
        { period: "May 16", completedTasks: 75 },
        { period: "May 17", completedTasks: 60 },
        { period: "May 18", completedTasks: 70 }
    ];

    // Helper coordinates for line graph plotting inside SVG 500x200
    // X goes from 40 to 460
    // Y goes from 160 (value 0) to 30 (value 100)
    const points = list.map((item, index) => {
        const x = 40 + (index * 70);
        const y = 160 - ((item.completedTasks / 100) * 130);
        return { x, y, label: item.period, value: item.completedTasks };
    });

    const pathD = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    // Area fill D
    const areaD = `${pathD} L ${points[points.length - 1].x} 160 L ${points[0].x} 160 Z`;

    return (
        <div className="effect rounded-xl p-5 shadow-xl hover:border-white/10 transition-colors h-full flex flex-col justify-between">
            <div>
                <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Team Productivity
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 bg-white/5 hover:bg-white/10 px-2 py-1.5 rounded-md cursor-pointer transition select-none">
                        <span>Last 7 Days</span>
                        <span className="text-[9px]">▼</span>
                    </div>
                </div>

                {/* Vector SVG Line Chart */}
                <div className="w-full h-40">
                    <svg className="w-full h-full" viewBox="0 0 500 180" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        {/* Horizontal Gridlines */}
                        {[0, 20, 40, 60, 80, 100].map((val) => {
                            const y = 160 - ((val / 100) * 130);
                            return (
                                <g key={val}>
                                    <line x1="30" y1={y} x2="480" y2={y} stroke="#1E293B" strokeWidth="0.5" strokeDasharray="3 3" />
                                    <text x="10" y={y + 3} fill="#64748B" className="text-[8px] font-bold">{val}</text>
                                </g>
                            );
                        })}

                        {/* Chart Area Fill */}
                        <path d={areaD} fill="url(#chartFill)" />

                        {/* Chart Line */}
                        <path d={pathD} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />

                        {/* Markers & Labels */}
                        {points.map((p, idx) => (
                            <g key={idx}>
                                <circle cx={p.x} cy={p.y} r="3.5" fill="#3b82f6" stroke="#121826" strokeWidth="1.5" />
                                <text x={p.x} y="176" fill="#64748B" textAnchor="middle" className="text-[7.5px] font-semibold">{p.label}</text>
                            </g>
                        ))}
                    </svg>
                </div>
            </div>
        </div>
    );
}
