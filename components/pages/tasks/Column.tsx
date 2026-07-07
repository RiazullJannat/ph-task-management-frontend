import React from 'react';
import { Task, TaskStatus } from '@/types/tasks/tasks.types';

interface ColumnProps {
    status: TaskStatus;
    label: string;
    tasks: Task[];
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent, status: TaskStatus) => void;
    children: React.ReactNode;
}

export default function Column({
    status,
    label,
    tasks,
    onDragOver,
    onDrop,
    children
}: ColumnProps) {
    const getBorderTopColor = () => {
        if (status === 'TODO') return 'border-t-[#51A2FF]';
        if (status === 'IN_PROGRESS') return 'border-t-[#FFB13F]';
        if (status === 'DONE') return 'border-t-[#05DF72]';
        return 'border-t-white/10';
    };

    return (
        <div 
            className={`flex-1 bg-white/[0.03] rounded-xl p-4 min-h-[500px] border border-white/[0.08] backdrop-blur-[20px] transition-colors border-t-4 ${getBorderTopColor()}`}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, status)}
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white tracking-wide">{label}</h3>
                <span className="bg-white/10 text-gray-300 text-xs px-2.5 py-0.5 rounded-full font-medium border border-white/[0.08]">
                    {tasks.length}
                </span>
            </div>
            
            <div className="space-y-3">
                {children}
                
                {tasks.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-white/10 rounded-lg bg-white/[0.02] text-[#9B98AE] space-y-2">
                        <span className="text-sm font-medium">No tasks</span>
                        <span className="text-xs">Drag and drop here</span>
                    </div>
                )}
            </div>
        </div>
    );
}
