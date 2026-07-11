"use client";

import React from 'react';
import { ChevronLeft, ChevronRight, PenTool } from 'lucide-react';
import ButtonComponent from '@/components/ui/ButtonComponent';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TopBarControlsProps {
    viewId: string;
    selectedClass: string;
    setSelectedClass: (val: string) => void;
    currentIndex: number;
    totalImages: number;
    handlePrev: () => void;
    handleNext: () => void;
    hideAnnotations: boolean;
    setHideAnnotations: (val: boolean) => void;
    applyCTWindow: boolean;
    setApplyCTWindow: (val: boolean) => void;
    isSegmentationMode: boolean;
    toggleSegmentationMode: () => void;
}

export default function TopBarControls({
    viewId,
    selectedClass,
    setSelectedClass,
    currentIndex,
    totalImages,
    handlePrev,
    handleNext,
    hideAnnotations,
    setHideAnnotations,
    applyCTWindow,
    setApplyCTWindow,
    isSegmentationMode,
    toggleSegmentationMode,
}: TopBarControlsProps) {
    return (
        <div className="flex flex-col xl:flex-row items-center justify-between px-5 py-3.5 backdrop-blur-md border-b border-white/[0.08] gap-4">
            {/* Classification Options */}
            <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                    <Select
                        value={selectedClass}
                        onValueChange={(e) => setSelectedClass(e)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Class" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Tumor">Tumor (Red)</SelectItem>
                            <SelectItem value="Lesion">Lesion (Orange)</SelectItem>
                            <SelectItem value="Healthy">Healthy (Green)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center space-x-3 effect px-3.5 py-1.5 rounded-lg border border-white/[0.08]">
                <ButtonComponent icon={ChevronLeft} onClick={handlePrev} disabled={currentIndex === 0}/>
                <span className="text-xs font-mono font-bold tracking-wider text-white min-w-[90px] text-center uppercase">
                    View {viewId}: {currentIndex + 1} / {totalImages}
                </span>
                <ButtonComponent icon={ChevronRight} onClick={handleNext} disabled={currentIndex === totalImages - 1}/>
            </div>

            {/* Toggles & Drawing Mode */}
            <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 text-xs cursor-pointer group">
                    <input 
                        type="checkbox" 
                        checked={hideAnnotations} 
                        onChange={(e) => setHideAnnotations(e.target.checked)}
                        className="rounded border-white/[0.15] bg-[#13102a] text-[#DC3FFF] focus:ring-[#DC3FFF] w-4 h-4 cursor-pointer transition"
                    />
                    <span className="text-[#9B98AE] group-hover:text-white transition">Hide Marks</span>
                </label>
                {/* <label className="flex items-center space-x-2 text-xs cursor-pointer group">
                    <input 
                        type="checkbox" 
                        checked={applyCTWindow} 
                        onChange={(e) => setApplyCTWindow(e.target.checked)}
                        className="rounded border-white/[0.15] bg-[#13102a] text-[#51A2FF] focus:ring-[#51A2FF] w-4 h-4 cursor-pointer transition"
                    />
                    <span className="text-[#9B98AE] group-hover:text-white transition">CT Window</span>
                </label> */}
                <div className="w-px h-6 bg-white/[0.08] mx-1"></div>
                <ButtonComponent buttonName={isSegmentationMode ? 'Stop Drawing' : 'Draw Shape'} varient='yellow' onClick={toggleSegmentationMode} icon={PenTool} />
            </div>
        </div>
    );
}
