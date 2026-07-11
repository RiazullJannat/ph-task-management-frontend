/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from 'react';
import { CreateTaskPayload, Task, TaskStatus, UpdateTaskPayload } from '@/types/tasks/tasks.types';
import { updateTask, createTasks, deleteTask } from '@/service/task_service/task.service';
// Removed unused Button import to fix lint warning
import { Plus, } from 'lucide-react';
import { toast } from 'sonner';

import DateSelector from './DateSelector';
import Column from './Column';
import TaskCard from './TaskCard';
import TaskCreateModal from './TaskCreateModal';
import TaskUpdateModal from './TaskUpdateModal';
import TaskViewModal from './TaskViewModal';
import useFilters from '@/hooks/useFilters';
import ResetButton from '@/components/ui/ResetButton';
import { Input } from '@/components/ui/input';
import ButtonComponent from '@/components/ui/ButtonComponent';

export default function AllTasks({ tasks: initialTasks }: { tasks: Task[] }) {
    const [tasks, setTasks] = useState<Task[]>(initialTasks || []);

    // Keep local tasks in sync when parent/server provides new initialTasks (e.g., on search)
    useEffect(() => {
        setTasks(initialTasks || []);
    }, [initialTasks]);
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


    const { handleChange, getParam, setShow, setCurrentPage } = useFilters();
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
            const targetColumnTasks = tasks.filter(t => t.status === newStatus);
            const maxPos = targetColumnTasks.length > 0 ? Math.max(...targetColumnTasks.map(t => t.position || 0)) : 0;
            const newPos = maxPos + 1;

            const updatedTask = { ...draggedTask, status: newStatus, position: newPos };
            setTasks(tasks.map(t => t.id === draggedTask.id ? updatedTask : t));

            try {
                await updateTask({ status: newStatus, position: newPos }, draggedTask.id);
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

        const newStatus = targetTask.status;
        
        // Get all tasks in target column except the dragged one
        const targetColumnTasks = tasks
            .filter(t => t.status === newStatus && t.id !== draggedTask.id)
            .sort((a, b) => (a.position || 0) - (b.position || 0));
        
        // Find the index of the target task
        const targetIndex = targetColumnTasks.findIndex(t => t.id === targetTask.id);
        
        // Insert dragged task at the target index
        targetColumnTasks.splice(targetIndex >= 0 ? targetIndex : 0, 0, { ...draggedTask, status: newStatus });
        
        // Re-assign positions sequentially for this column
        const updatedTargetTasks = targetColumnTasks.map((t, index) => ({
            ...t,
            position: index + 1
        }));
        
        // Create final tasks array with updated positions
        const updatedTasks = tasks.map(t => {
            const ut = updatedTargetTasks.find(x => x.id === t.id);
            return ut || t;
        });

        setTasks(updatedTasks);

        // Find which tasks actually changed to minimize API calls
        const tasksToUpdate = updatedTargetTasks.filter(t => {
            const oldT = tasks.find(ot => ot.id === t.id);
            return !oldT || oldT.position !== t.position || oldT.status !== t.status;
        });

        setDraggedTask(null);

        try {
            await Promise.all(tasksToUpdate.map(t => updateTask({ status: t.status, position: t.position }, t.id)));
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
                <div>
                    <Input
                        className="w-full lg:w-64 text-sm bg-transparent"
                        onChange={(e) => handleChange("title", e.target.value)}
                        placeholder="Search tasks..."
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <DateSelector selectedDate={selectedDate} onChange={(date) => handleChange('date', date)} />
                    <ResetButton setLimit={setShow} setCurrPage={setCurrentPage} />

                    <ButtonComponent varient='yellow' icon={Plus}
                        buttonName="Create Task" onClick={openCreateModal} />
                </div>
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

            <TaskCreateModal
                isOpen={isModalOpen && modalMode === 'CREATE'}
                onClose={() => setIsModalOpen(false)}
                initialDate={selectedDate}
                onSave={(payload) => handleModalSave(payload)}
            />

            <TaskUpdateModal
                isOpen={isModalOpen && modalMode === 'EDIT'}
                onClose={() => setIsModalOpen(false)}
                task={selectedTask}
                onSave={(payload, id) => handleModalSave(payload, id)}
            />

            <TaskViewModal
                isOpen={isModalOpen && modalMode === 'VIEW'}
                onClose={() => setIsModalOpen(false)}
                task={selectedTask}
                onDelete={handleDelete}
                onSwitchToEdit={switchToEditMode}
            />
        </div>
    );
}