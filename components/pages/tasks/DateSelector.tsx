import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Calendar } from 'lucide-react';

interface DateSelectorProps {
    selectedDate: string;
    onChange: (date: string) => void;
}

export default function DateSelector({ selectedDate, onChange }: DateSelectorProps) {
    return (
        <div className="relative flex items-center">
            {/* Custom Icon for Mobile */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none sm:hidden text-white/70 bg-transparent border border-white/20 rounded-md h-10 w-10">
                <Calendar size={18} />
                {/* Show a small indicator if date is selected */}
                {selectedDate && (
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                )}
            </div>
            
            <Input
                id="date-filter"
                type="date"
                value={selectedDate}
                onChange={(e) => onChange(e.target.value)}
                className="w-10 sm:w-auto h-10 p-0 sm:px-3 sm:py-2 opacity-0 sm:opacity-100 shadow-sm cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer bg-transparent border-white/20 text-white"
            />
        </div>
    );
}
