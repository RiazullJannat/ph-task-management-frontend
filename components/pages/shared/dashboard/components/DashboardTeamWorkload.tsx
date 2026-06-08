/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

interface MemberWorkloadItem {
    id: string;
    name: string;
    avatar_url: string | null;
    role: string;
    cards: {
        total: number;
        completed: number;
        pending: number;
    };
}

interface DashboardTeamWorkloadProps {
    memberWorkload: MemberWorkloadItem[];
}

export default function DashboardTeamWorkload({ memberWorkload }: DashboardTeamWorkloadProps) {
    const getProgressColor = (idx: number) => {
        if (idx === 0) return 'from-emerald-500 to-teal-400';
        if (idx === 1) return 'from-blue-500 to-indigo-400';
        if (idx === 2) return 'from-amber-500 to-yellow-400';
        return 'from-purple-500 to-pink-400';
    };

    return (
        <div className="effect rounded-xl p-5 shadow-xl h-full flex flex-col justify-between hover:border-white/10 transition-colors">
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Team Workload
                    </h3>
                    <button className="text-blue-400 hover:text-blue-300 text-xs font-semibold">View all</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead>
                            <tr className="text-slate-500 uppercase border-b border-white/5 pb-2 text-[10px] tracking-wider">
                                <th className="pb-2 font-bold w-1/2">Member</th>
                                <th className="pb-2 text-right font-bold pr-2">Total</th>
                                <th className="pb-2 text-right font-bold pr-2">Completed</th>
                                <th className="pb-2 text-right font-bold">Pending</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {memberWorkload.map((m, idx) => {
                                const total = m.cards?.total || 0;
                                const completed = m.cards?.completed || 0;
                                const pending = m.cards?.pending || 0;
                                const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

                                return (
                                    <tr key={m.id} className="hover:bg-white/5 transition-colors">
                                        <td className="py-3 flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-indigo-600/40 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                                                {m.avatar_url ? (
                                                    <img src={m.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                                                ) : (
                                                    m.name.charAt(0).toUpperCase()
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-[100px]">
                                                <div className="font-semibold text-white/95 truncate max-w-[80px]">{m.name}</div>
                                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-1">
                                                    <div className={`h-full bg-gradient-to-r ${getProgressColor(idx)} rounded-full`} style={{ width: `${percent}%` }}></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 text-right text-slate-300 font-bold pr-2">{total}</td>
                                        <td className="py-3 text-right text-slate-300 font-bold pr-2">{completed}</td>
                                        <td className="py-3 text-right text-slate-400 font-bold">{pending}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
