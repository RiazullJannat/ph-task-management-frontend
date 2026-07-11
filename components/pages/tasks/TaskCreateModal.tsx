import React, { useState, useEffect } from 'react';
import { TaskStatus, TaskPriority, CreateTaskPayload } from '@/types/tasks/tasks.types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface TaskCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialDate: string;
    onSave: (payload: CreateTaskPayload) => Promise<void>;
}

export default function TaskCreateModal({
    isOpen,
    onClose,
    initialDate,
    onSave
}: TaskCreateModalProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<TaskStatus>('TODO');
    const [priority, setPriority] = useState<TaskPriority>('MEDIUM');
    const [dueDate, setDueDate] = useState('');
    const [tagsInput, setTagsInput] = useState('');

    useEffect(() => {
        if (isOpen) {
            setTitle('');
            setDescription('');
            setStatus('TODO');
            setPriority('MEDIUM');
            setDueDate(initialDate || '');
            setTagsInput('');
        }
    }, [isOpen, initialDate]);

    const handleSave = async () => {
        if (!title || !dueDate) {
            toast.error("Title and due date are required");
            return;
        }

        const tagsArray = tagsInput.split(',').map(t => t.trim()).filter(t => t.length > 0);

        const payload: CreateTaskPayload = {
            title,
            description,
            status,
            priority,
            due_date: dueDate,
            tags: tagsArray
        };
        await onSave(payload);
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-[550px]! bg-[#13102a] border border-white/10 text-white shadow-2xl backdrop-blur-3xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold tracking-wide">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                            Create New Task
                        </span>
                    </DialogTitle>
                </DialogHeader>
                
                <div className="grid gap-5 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="create-title" className="text-sm font-medium text-gray-300">Title <span className="text-[#F50F0F]">*</span></Label>
                        <Input 
                            id="create-title" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder="E.g. Write API Documentation" 
                            className="w-full bg-white/5 border-white/10 text-white focus-visible:ring-[#FFB13F]"
                        />
                    </div>
                    
                    <div className="grid gap-2">
                        <Label htmlFor="create-description" className="text-sm font-medium text-gray-300">Description</Label>
                        <Textarea 
                            id="create-description" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            placeholder="Add more details about this task..." 
                            rows={4}
                            className="resize-none bg-white/5 border-white/10 text-white focus-visible:ring-[#FFB13F]"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="create-tags" className="text-sm font-medium text-gray-300">
                            Tags <span className="text-xs text-[#9B98AE] font-normal">(comma separated)</span>
                        </Label>
                        <Input 
                            id="create-tags" 
                            value={tagsInput} 
                            onChange={(e) => setTagsInput(e.target.value)} 
                            placeholder="e.g. backend, urgent, docs" 
                            className="w-full bg-white/5 border-white/10 text-white focus-visible:ring-[#FFB13F]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label className="text-sm font-medium text-gray-300">Status</Label>
                            <Select value={status} onValueChange={(v: TaskStatus) => setStatus(v)}>
                                <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-[#FFB13F]">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#13102a] border-white/10 text-white">
                                    <SelectItem value="TODO" className="focus:bg-white/10 focus:text-white">To Do</SelectItem>
                                    <SelectItem value="IN_PROGRESS" className="focus:bg-white/10 focus:text-white">In Progress</SelectItem>
                                    <SelectItem value="DONE" className="focus:bg-white/10 focus:text-white">Done</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <div className="grid gap-2">
                            <Label className="text-sm font-medium text-gray-300">Priority</Label>
                            <Select value={priority} onValueChange={(v: TaskPriority) => setPriority(v)}>
                                <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-[#FFB13F]">
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#13102a] border-white/10 text-white">
                                    <SelectItem value="LOW" className="focus:bg-white/10 focus:text-white">Low</SelectItem>
                                    <SelectItem value="MEDIUM" className="focus:bg-white/10 focus:text-white">Medium</SelectItem>
                                    <SelectItem value="HIGH" className="focus:bg-white/10 focus:text-white">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="create-dueDate" className="text-sm font-medium text-gray-300">Due Date <span className="text-[#F50F0F]">*</span></Label>
                        <Input 
                            id="create-dueDate" 
                            type="date" 
                            min={today}
                            value={dueDate} 
                            onChange={(e) => setDueDate(e.target.value)}
                            className="bg-white/5 border-white/10 text-white focus-visible:ring-[#FFB13F] [&::-webkit-calendar-picker-indicator]:invert"
                        />
                    </div>
                </div>

                <div className="flex justify-end items-center mt-2 pt-4 border-t border-white/10">
                    <div className="flex gap-3">
                        <Button 
                            variant="outline" 
                            onClick={onClose}
                            className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white"
                        >
                            Close
                        </Button>
                        <Button 
                            onClick={handleSave}
                            className="bg-[#FFB13F] text-black hover:bg-[#FFB13F]/90 shadow-[0_0_15px_rgba(255,177,63,0.3)]"
                        >
                            Create Task
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
