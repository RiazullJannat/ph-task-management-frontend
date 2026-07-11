"use client";

import React, { useState } from 'react';
import { ProjectImage } from "@/types/annotate/annotate.types";
import { LayoutPanelLeft, Columns } from 'lucide-react';
import CanvasView from './CanvasView';

export default function AnotationClient({ images }: { images: ProjectImage[] }) {
    const [splitView, setSplitView] = useState(false);
    console.log(images)

    return (
        <div className="flex flex-col space-y-4 w-full">
            <div className="flex justify-end">
                <div className="flex  rounded-lg p-1  shadow-sm">  
                    <button 
                        onClick={() => setSplitView(false)}
                        className={`px-4 py-2 rounded-md flex items-center space-x-2 text-sm font-medium transition-all duration-200 ${!splitView ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'}`}
                    >
                        <LayoutPanelLeft size={16} /> 
                        <span>Single View</span>
                    </button>
                    <button 
                        onClick={() => setSplitView(true)}
                        className={`px-4 py-2 rounded-md flex items-center space-x-2 text-sm font-medium transition-all duration-200 ${splitView ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'}`}
                    >
                        <Columns size={16} /> 
                        <span>Split View</span>
                    </button>
                </div>
            </div>
            
            <div className={`grid gap-6 ${splitView ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                <CanvasView images={images} viewId="1" />
                {splitView && <CanvasView images={images} viewId="2" />}
            </div>
        </div>
    );
}
