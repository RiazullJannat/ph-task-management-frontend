import React from 'react';
import { Task } from '@/types/tasks/tasks.types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2, Tag } from 'lucide-react';
import ButtonComponent from '@/components/ui/ButtonComponent';

interface TaskViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task | null;
    onDelete: (id: number) => Promise<void>;
    onSwitchToEdit: () => void;
}

export default function TaskViewModal({
    isOpen,
    onClose,
    task,
    onDelete,
    onSwitchToEdit
}: TaskViewModalProps) {
    if (!task) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="w-[90%] max-h-[70vh] overflow-y-auto md:max-w-[550px]!">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold tracking-wide flex justify-between items-center pr-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                            Task Details
                        </span>
                        <Button variant="ghost" size="icon" onClick={onSwitchToEdit} title="Edit Task" className="h-8 w-8 ml-auto hover:bg-white/10">
                            <Edit2 className="w-4 h-4 text-gray-400 hover:text-white" />
                        </Button>
                    </DialogTitle>
                </DialogHeader>
                
                <div className="grid gap-6 py-4">
                    <div>
                        <h4 className="text-xs font-semibold text-[#9B98AE] uppercase tracking-wider mb-1.5">Title</h4>
                        <p className="text-white font-medium text-lg leading-tight">{task.title}</p>
                    </div>
                    <div>
                        <h4 className="text-xs font-semibold text-[#9B98AE] uppercase tracking-wider mb-1.5">Description</h4>
                        <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-gray-300 whitespace-pre-wrap min-h-[80px]">
                            {task.description || <span className="italic text-gray-500">No description provided</span>}
                        </div>
                    </div>
                    
                    {task.tags && task.tags.length > 0 && (
                        <div>
                            <h4 className="text-xs font-semibold text-[#9B98AE] uppercase tracking-wider mb-2">Tags</h4>
                            <div className="flex flex-wrap gap-2">
                                {task.tags.map((tag, idx) => (
                                    <span key={idx} className="flex items-center gap-1.5 text-xs bg-[#DC3FFF]/10 text-[#DC3FFF] border border-[#DC3FFF]/20 px-2 py-1 rounded-md font-medium">
                                        <Tag className="w-3 h-3" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
                        <div>
                            <h4 className="text-xs font-semibold text-[#9B98AE] uppercase tracking-wider mb-1.5">Due Date</h4>
                            <p className="text-white font-medium">{task.due_date}</p>
                        </div>
                        <div>
                            <h4 className="text-xs font-semibold text-[#9B98AE] uppercase tracking-wider mb-1.5">Priority</h4>
                            <div className={`inline-flex items-center gap-1.5 text-xs uppercase font-bold px-2.5 py-1 rounded-md ${
                                task.priority === 'HIGH' ? 'bg-red-500/20 text-red-400' : 
                                task.priority === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' : 
                                'bg-green-500/20 text-green-400'
                            }`}>
                                {task.priority}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xs font-semibold text-[#9B98AE] uppercase tracking-wider mb-1.5">Status</h4>
                            <div className="text-white font-medium px-2.5 py-1 bg-white/10 inline-block rounded-md text-sm">
                                {task.status.replace('_', ' ')}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-2 pt-4 border-t border-white/10">
                    <div>
                        <ButtonComponent buttonName='Delete' varient='red' onClick={() => onDelete(task.id)}/>
                    </div>
                    <div className="flex gap-3">
                        <ButtonComponent buttonName='Close' onClick={onClose}/>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}