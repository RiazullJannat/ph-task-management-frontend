import React from 'react';

export default function Loading() {
    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-6 w-full">
            {/* Header Skeleton */}
            <div className="space-y-2 mb-4">
                <div className="h-8 w-64 bg-white/[0.08] rounded-md animate-pulse"></div>
                <div className="h-4 w-96 max-w-full bg-white/[0.05] rounded-md animate-pulse"></div>
            </div>

            <div className="flex flex-col space-y-4 w-full">
                {/* View toggles skeleton */}
                <div className="flex justify-end">
                    <div className="w-64 h-10 bg-white/[0.05] rounded-lg animate-pulse"></div>
                </div>
                
                {/* Canvas Skeleton */}
                <div className="h-[70vh] min-h-[550px] bg-white/[0.02] border border-white/[0.08] rounded-xl flex items-center justify-center relative overflow-hidden">
                    <div className="flex flex-col items-center space-y-4 z-10">
                        <div className="w-10 h-10 border-4 border-[#FFB13F] border-t-transparent rounded-full animate-spin"></div>
                        <div className="text-white/60 font-medium">Loading Workspace...</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
