import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DateSelectorProps {
    selectedDate: string;
    onChange: (date: string) => void;
}

export default function DateSelector({ selectedDate, onChange }: DateSelectorProps) {
    return (
        <div className="flex items-center gap-3">
            <Input
                id="date-filter"
                type="date"
                value={selectedDate}
                onChange={(e) => onChange(e.target.value)}
                className="w-auto shadow-sm"
            />
        </div>
    );
}
