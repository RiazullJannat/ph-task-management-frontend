import { Layout } from "lucide-react";

interface ProjectSummaryItem {
    id: string;
    name: string;
    status: string;
    deadline: string | null;
    totalTasks: number;
    completedTasks: number;
    overdueTasks: number;
    progress: number;
}

interface DashboardProjectSummariesProps {
    projectSummaries: ProjectSummaryItem[];
    formatDate: (dateStr: string | null) => string;
}

export default function DashboardProjectSummaries({ projectSummaries, formatDate }: DashboardProjectSummariesProps) {
    return (
        <div className="effect rounded-xl p-5 shadow-xl hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Project Summaries
                </h3>
                <button className="text-blue-400 hover:text-blue-300 text-xs font-semibold">View all</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                    <thead>
                        <tr className="text-slate-500 uppercase border-b border-white/5 pb-2 text-[10px] tracking-wider">
                            <th className="pb-2 font-bold">Project</th>
                            <th className="pb-2 font-bold">Status</th>
                            <th className="pb-2 font-bold">Deadline</th>
                            <th className="pb-2 font-bold">Progress</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {projectSummaries.map((p) => (
                            <tr key={p.id} className="hover:bg-white/5 transition-colors">
                                <td className="py-3 font-semibold text-white/90">{p.name}</td>
                                <td className="py-3">
                                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                        p.status.toLowerCase().includes('progress') ? 'bg-blue-500/10 text-blue-400 border border-blue-500/10' :
                                        p.status.toLowerCase().includes('todo') ? 'bg-slate-500/10 text-slate-400 border border-slate-500/10' :
                                        'bg-purple-500/10 text-purple-400 border border-purple-500/10'
                                    }`}>
                                        {p.status}
                                    </span>
                                </td>
                                <td className="py-3 text-slate-400">{formatDate(p.deadline)}</td>
                                <td className="py-3 min-w-[100px]">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: `${p.progress}%` }}></div>
                                        </div>
                                        <span className="text-[10px] text-slate-400 font-bold">{p.progress}%</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
