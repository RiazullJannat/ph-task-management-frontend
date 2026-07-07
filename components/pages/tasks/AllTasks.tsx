"use client";

import React, { useState } from 'react';
import { CreateTaskPayload, Task, TaskStatus, UpdateTaskPayload } from '@/types/tasks/tasks.types';
import { updateTask, createTasks, deleteTask } from '@/service/task_service/task.service';
import { Button } from '@/components/ui/button';
import { Plus, } from 'lucide-react';
import { toast } from 'sonner';

import DateSelector from './DateSelector';
import Column from './Column';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import useFilters from '@/hooks/useFilters';

export default function AllTasks({ tasks: initialTasks }: { tasks: Task[] }) {
    const [tasks, setTasks] = useState<Task[]>(initialTasks || []);
    const [draggedTask, setDraggedTask] = useState<Task | null>(null);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'CREATE' | 'VIEW' | 'EDIT'>('CREATE');
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const COLUMNS: { id: TaskStatus; label: string }[] = [
        { id: 'TODO', label: 'To Do' },
        { id: 'IN_PROGRESS', label: 'In Progress' },
        { id: 'DONE', label: 'Done' }
    ];

    const openCreateModal = () => {
        setModalMode('CREATE');
        setSelectedTask(null);
        setIsModalOpen(true);
    };

    const openViewModal = (task: Task) => {
        setModalMode('VIEW');
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const switchToEditMode = () => {
        setModalMode('EDIT');
    };


    const { handleChange, getParam } = useFilters();
    const selectedDate = getParam('date') ?? '';
    const filteredTasks = selectedDate ? tasks.filter(t => t.due_date === selectedDate) : tasks;

    const handleModalSave = async (payload: UpdateTaskPayload | CreateTaskPayload, id?: number) => {
        if (modalMode === 'CREATE') {
            try {
                const res = await createTasks(payload as CreateTaskPayload);
                if (res?.data) {
                    setTasks([...tasks, res.data]);
                    toast.success("Task created successfully");
                } else {
                    toast.error("Failed to create task");
                }
                setIsModalOpen(false);
            } catch (error) {
                toast.error("An error occurred while creating the task");
            }
        } else if (modalMode === 'EDIT' && id) {
            try {
                const res = await updateTask(payload, id);
                if (res?.data) {
                    setTasks(tasks.map(t => t.id === id ? res.data : t));
                } else {
                    setTasks(tasks.map(t => t.id === id ? { ...t, ...payload } : t));
                }
                toast.success("Task updated successfully");
                setIsModalOpen(false);
            } catch (error) {
                toast.error("An error occurred while updating the task");
            }
        }
    };

    const handleDelete = async () => {
        if (!selectedTask) return;
        try {
            await deleteTask(selectedTask.id);
            setTasks(tasks.filter(t => t.id !== selectedTask.id));
            toast.success("Task deleted successfully");
            setIsModalOpen(false);
        } catch (error) {
            toast.error("Failed to delete task");
        }
    };

    // Drag and Drop Logic
    const handleDragStart = (e: React.DragEvent, task: Task) => {
        setDraggedTask(task);
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => {
            const el = e.target as HTMLElement;
            el.classList.add('opacity-50');
        }, 0);
    };

    const handleDragEnd = (e: React.DragEvent) => {
        const el = e.target as HTMLElement;
        el.classList.remove('opacity-50');
        setDraggedTask(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleColumnDrop = async (e: React.DragEvent, newStatus: TaskStatus) => {
        e.preventDefault();
        if (!draggedTask) return;

        if (draggedTask.status !== newStatus) {
            const updatedTask = { ...draggedTask, status: newStatus };
            setTasks(tasks.map(t => t.id === draggedTask.id ? updatedTask : t));

            try {
                await updateTask({ status: newStatus }, draggedTask.id);
                toast.success("Task moved");
            } catch (error) {
                setTasks(tasks.map(t => t.id === draggedTask.id ? draggedTask : t));
                toast.error("Failed to move task");
            }
        }
        setDraggedTask(null);
    };

    const handleTaskDrop = async (e: React.DragEvent, targetTask: Task) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent column drop from firing

        if (!draggedTask) return;
        if (draggedTask.id === targetTask.id) {
            setDraggedTask(null);
            return;
        }

        const newPos = targetTask.position;
        const oldPos = draggedTask.position;
        const newStatus = targetTask.status;

        const updatedTasks = tasks.map(t => {
            if (t.id === draggedTask.id) return { ...t, status: newStatus, position: newPos };
            if (t.id === targetTask.id) return { ...t, position: oldPos };
            return t;
        });

        setTasks(updatedTasks);

        const currentDraggedId = draggedTask.id;
        const currentTargetId = targetTask.id;

        setDraggedTask(null);

        try {
            await updateTask({ status: newStatus, position: newPos }, currentDraggedId);
            await updateTask({ position: oldPos }, currentTargetId);
            toast.success("Tasks rearranged successfully");
        } catch (error) {
            setTasks(tasks);
            toast.error("Failed to rearrange tasks");
        }
    };

    const handleInlineStatusChange = async (task: Task, newStatus: TaskStatus) => {
        const updatedTask = { ...task, status: newStatus };
        setTasks(tasks.map(t => t.id === task.id ? updatedTask : t));

        try {
            await updateTask({ status: newStatus }, task.id);
            toast.success("Status updated");
        } catch (error) {
            setTasks(tasks.map(t => t.id === task.id ? task : t));
            toast.error("Failed to update status");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <DateSelector selectedDate={selectedDate} onChange={(date) => handleChange('date', date)} />

                <Button onClick={openCreateModal} className="gap-2 shadow-sm">
                    <Plus className="w-4 h-4" />
                    Create Task
                </Button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 items-start">
                {COLUMNS.map(col => {
                    const columnTasks = filteredTasks.filter(t => t.status === col.id).sort((a, b) => a.position - b.position);
                    return (
                        <Column
                            key={col.id}
                            status={col.id}
                            label={col.label}
                            tasks={columnTasks}
                            onDragOver={handleDragOver}
                            onDrop={handleColumnDrop}
                        >
                            {columnTasks.map(task => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onDragStart={handleDragStart}
                                    onDragEnd={handleDragEnd}
                                    onDragOver={handleDragOver}
                                    onDrop={handleTaskDrop}
                                    onClick={openViewModal}
                                    onStatusChange={handleInlineStatusChange}
                                />
                            ))}
                        </Column>
                    );
                })}
            </div>

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                mode={modalMode}
                task={selectedTask}
                initialDate={selectedDate}
                onSave={handleModalSave}
                onDelete={handleDelete}
                onSwitchToEdit={switchToEditMode}
            />
        </div>
    );
}