"use client";

import React from 'react';
import { ZoomIn, ZoomOut, Maximize, Undo, Trash2 } from 'lucide-react';

interface BottomToolbarProps {
    scale: number;
    setScale: React.Dispatch<React.SetStateAction<number>>;
    setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
    handleUndo: () => void;
    activePointsLength: number;
    handleDeleteAll: () => void;
    hasAnnotationsOrPoints: boolean;
}

export default function BottomToolbar({
    scale,
    setScale,
    setPosition,
    handleUndo,
    activePointsLength,
    handleDeleteAll,
    hasAnnotationsOrPoints,
}: BottomToolbarProps) {
    return (
        <div className="flex items-center justify-between px-5 py-3  backdrop-blur-md border-t border-white/[0.08]">
            {/* Zoom Controls */}
            <div className="flex items-center space-x-1.5">
                <button 
                    onClick={() => setScale(s => s * 1.2)} 
                    className="p-2 hover:bg-white/[0.05] rounded-lg transition text-[#9B98AE] hover:text-white" 
                    title="Zoom In"
                >
                    <ZoomIn size={18} />
                </button>
                <button 
                    onClick={() => setScale(s => s / 1.2)} 
                    className="p-2 hover:bg-white/[0.05] rounded-lg transition text-[#9B98AE] hover:text-white" 
                    title="Zoom Out"
                >
                    <ZoomOut size={18} />
                </button>
                <button 
                    onClick={() => { setScale(1); setPosition({ x: 0, y: 0 }); }} 
                    className="p-2 hover:bg-white/[0.05] rounded-lg transition text-[#9B98AE] hover:text-white" 
                    title="Reset Zoom"
                >
                    <Maximize size={18} />
                </button>
                <div className="h-4 w-px bg-white/[0.08] mx-2"></div>
                <span className="text-xs font-mono font-bold bg-[#13102a] px-2 py-1 rounded border border-white/[0.05] text-[#9B98AE] select-none">
                    {Math.round(scale * 100)}%
                </span>
            </div>

            {/* Edit Controls */}
            <div className="flex items-center space-x-3">
                <button 
                    onClick={handleUndo} 
                    disabled={activePointsLength === 0}
                    className="flex items-center space-x-1.5 px-3.5 py-1.5 hover:bg-white/[0.05] border border-white/[0.05] rounded-lg transition text-[#9B98AE] hover:text-white disabled:opacity-20 font-bold text-xs uppercase tracking-wider"
                    title="Remove Last Point"
                >
                    <Undo size={14} className="stroke-[2.5]" />
                    <span className="text-sm font-sans">Undo</span>
                </button>
                {/* <button 
                    onClick={handleDeleteAll} 
                    disabled={!hasAnnotationsOrPoints}
                    className="flex items-center space-x-1.5 px-3 py-1.5 hover:bg-[#F50F0F]/20 text-[#F50F0F] hover:text-red-400 rounded-lg transition disabled:opacity-30 font-medium"
                    title="Clear Current View"
                >
                    <Trash2 size={16} />
                    <span className="text-sm">Clear</span>
                </button> */}
            </div>
        </div>
    );
}
