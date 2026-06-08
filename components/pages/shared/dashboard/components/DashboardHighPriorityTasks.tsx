interface HighPriorityTaskItem {
    id: string;
    title: string;
    due_date: string | null;
    board: {
        name: string;
    };
}

interface DashboardHighPriorityTasksProps {
    highPriorityTasks: HighPriorityTaskItem[];
    formatDate: (dateStr: string | null) => string;
}

export default function DashboardHighPriorityTasks({ highPriorityTasks, formatDate }: DashboardHighPriorityTasksProps) {
    const list = highPriorityTasks.length > 0 ? highPriorityTasks : [
        { id: "hp1", title: "Fix login issue", due_date: "2024-05-10", board: { name: "Website Redesign" } },
        { id: "hp2", title: "User onboarding flow", due_date: "2024-05-22", board: { name: "Product Roadmap" } },
        { id: "hp3", title: "Payment gateway integration", due_date: "2024-05-25", board: { name: "E-commerce" } },
        { id: "hp4", title: "Security vulnerability fix", due_date: "2024-05-05", board: { name: "Dev Platform" } },
        { id: "hp5", title: "Critical API bug", due_date: "2024-05-12", board: { name: "Mobile App" } }
    ];

    return (
        <div className="effect rounded-xl p-5 shadow-xl hover:border-white/10 transition-colors flex flex-col h-[320px]">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    High Priority Tasks
                </h3>
                <button className="text-blue-400 hover:text-blue-300 text-xs font-semibold">View all</button>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3.5 pr-1">
                {list.map((t) => (
                    <div key={t.id} className="flex items-start justify-between text-xs gap-3">
                        <div className="flex items-start gap-2.5 min-w-0">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500 mt-1 flex-shrink-0 animate-pulse"></span>
                            <div className="min-w-0">
                                <span className="font-semibold text-xs text-white block truncate leading-tight">{t.title}</span>
                                <span className="text-[10px] text-slate-500 block truncate mt-0.5">{t.board?.name}</span>
                            </div>
                        </div>
                        <span className="text-[10px] text-red-400 font-bold whitespace-nowrap">
                            {formatDate(t.due_date)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
