import React, { useState, useEffect } from 'react';
import { Task, UpdateTaskPayload } from '@/types/tasks/tasks.types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import ButtonComponent from '@/components/ui/ButtonComponent';

interface TaskUpdateModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task | null;
    onSave: (payload: UpdateTaskPayload, id: number) => Promise<void>;
}

export default function TaskUpdateModal({
    isOpen,
    onClose,
    task,
    onSave
}: TaskUpdateModalProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [tagsInput, setTagsInput] = useState('');

    useEffect(() => {
        if (isOpen && task) {
            setTitle(task.title);
            setDescription(task.description || '');
            setDueDate(task.due_date);
            setTagsInput(task.tags ? task.tags.join(', ') : '');
        }
    }, [isOpen, task]);

    const handleSave = async () => {
        if (!title || !dueDate) {
            toast.error("Title and due date are required");
            return;
        }

        if (!task) return;

        const tagsArray = tagsInput.split(',').map(t => t.trim()).filter(t => t.length > 0);

        const payload: UpdateTaskPayload = {
            title,
            description,
            due_date: dueDate,
            tags: tagsArray
        };
        await onSave(payload, task.id);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="w-[90%] max-h-[70vh] overflow-y-auto md:max-w-[550px]!">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold tracking-wide">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                            Edit Task
                        </span>
                    </DialogTitle>
                </DialogHeader>
                
                <div className="grid gap-5 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="update-title" className="text-sm font-medium text-gray-300">Title <span className="text-[#F50F0F]">*</span></Label>
                        <Input 
                            id="update-title" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            className="w-full bg-white/5 border-white/10 text-white focus-visible:ring-[#FFB13F]"
                        />
                    </div>
                    
                    <div className="grid gap-2">
                        <Label htmlFor="update-description" className="text-sm font-medium text-gray-300">Description</Label>
                        <Textarea 
                            id="update-description" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            rows={4}
                            className="resize-none bg-white/5 border-white/10 text-white focus-visible:ring-[#FFB13F]"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="update-tags" className="text-sm font-medium text-gray-300">
                            Tags <span className="text-xs text-[#9B98AE] font-normal">(comma separated)</span>
                        </Label>
                        <Input 
                            id="update-tags" 
                            value={tagsInput} 
                            onChange={(e) => setTagsInput(e.target.value)} 
                            className="w-full bg-white/5 border-white/10 text-white focus-visible:ring-[#FFB13F]"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="update-dueDate" className="text-sm font-medium text-gray-300">Due Date <span className="text-[#F50F0F]">*</span></Label>
                        <Input 
                            id="update-dueDate" 
                            type="date" 
                            value={dueDate} 
                            onChange={(e) => setDueDate(e.target.value)}
                            className="bg-white/5 border-white/10 text-white focus-visible:ring-[#FFB13F] [&::-webkit-calendar-picker-indicator]:invert"
                        />
                    </div>
                </div>

                <div className="flex justify-end items-center mt-2 pt-4 border-t border-white/10">
                    <div className="flex gap-3">
                        {/* <Button 
                            variant="outline" 
                            onClick={onClose}
                            className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white"
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={handleSave}
                            className="bg-[#FFB13F] text-black hover:bg-[#FFB13F]/90 shadow-[0_0_15px_rgba(255,177,63,0.3)]"
                        >
                            Save Changes
                        </Button> */}
                        <ButtonComponent varient='red' buttonName='Cancel' onClick={onClose}/>
                        <ButtonComponent varient='yellow' buttonName='Save Changes' onClick={handleSave}/>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
