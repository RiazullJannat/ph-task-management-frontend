import React from 'react';
import { Task, TaskStatus } from '@/types/tasks/tasks.types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GripVertical, Calendar, Flag, Tag } from 'lucide-react';

interface TaskCardProps {
    task: Task;
    onDragStart: (e: React.DragEvent, task: Task) => void;
    onDragEnd: (e: React.DragEvent) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDrop: (e: React.DragEvent, task: Task) => void;
    onClick: (task: Task) => void;
    onStatusChange: (task: Task, newStatus: TaskStatus) => void;
}

export default function TaskCard({
    task,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDrop,
    onClick,
    onStatusChange
}: TaskCardProps) {
    const handleStatusChange = (newStatus: TaskStatus) => {
        onStatusChange(task, newStatus);
    };

    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, task)}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, task)}
            onClick={() => onClick(task)}
            className="bg-white/[0.03] p-4 rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white/[0.08] backdrop-blur-[20px] cursor-pointer hover:border-white/[0.15] hover:-translate-y-0.5 transition-all duration-300 group flex flex-col gap-3 relative effect"
        >
            <div className="flex items-start justify-between gap-2">
                <h4 className="font-semibold text-[1.125rem] text-white leading-tight group-hover:text-[#51A2FF] transition-colors">
                    {task.title}
                </h4>
                <GripVertical className="w-4 h-4 text-white/30 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 cursor-grab active:cursor-grabbing" />
            </div>

            {/* Inline Status Dropdown */}
            <div onClick={(e) => e.stopPropagation()} className="w-full">
                <Select value={task.status} onValueChange={handleStatusChange}>
                    <SelectTrigger className="h-7 text-xs bg-white/5 border-white/10 text-gray-300 focus:ring-[#FFB13F]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#13102a] border-white/10 text-white">
                        <SelectItem value="TODO" className="focus:bg-white/10 focus:text-white">To Do</SelectItem>
                        <SelectItem value="IN_PROGRESS" className="focus:bg-white/10 focus:text-white">In Progress</SelectItem>
                        <SelectItem value="DONE" className="focus:bg-white/10 focus:text-white">Done</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {task.tags && task.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                    {task.tags.map((tag, idx) => (
                        <span key={idx} className="flex items-center gap-1 text-[10px] bg-[#DC3FFF]/10 text-[#DC3FFF] border border-[#DC3FFF]/20 px-1.5 py-0.5 rounded-md font-medium">
                            <Tag className="w-2.5 h-2.5" />
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            <div className="flex items-center justify-between mt-1 pt-3 border-t border-white/[0.08]">
                <div className="flex items-center gap-1.5 text-xs text-[#9B98AE]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{task.due_date}</span>
                </div>
                <div className={`flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                    task.priority === 'HIGH' ? 'bg-[#F50F0F]/20 text-[#F50F0F]' : 
                    task.priority === 'MEDIUM' ? 'bg-[#FFB13F]/20 text-[#FFB13F]' : 
                    'bg-[#05DF72]/20 text-[#05DF72]'
                }`}>
                    <Flag className="w-3 h-3" />
                    <span>{task.priority}</span>
                </div>
            </div>
        </div>
    );
}
