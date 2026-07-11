import React from 'react';

export default function Loading() {
    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-6 w-full">
            {/* Header Skeleton */}
            <div className="space-y-2 mb-8">
                <div className="h-8 w-48 bg-white/[0.08] rounded-md animate-pulse"></div>
                <div className="h-4 w-96 bg-white/[0.05] rounded-md animate-pulse"></div>
            </div>

            {/* Toolbar Skeleton */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-8">
                <div className="w-full xl:w-64 h-10 bg-white/[0.08] rounded-md animate-pulse"></div>
                <div className="flex gap-4 w-full xl:w-auto">
                    <div className="w-full xl:w-32 h-10 bg-white/[0.08] rounded-md animate-pulse"></div>
                    <div className="w-full xl:w-24 h-10 bg-white/[0.08] rounded-md animate-pulse"></div>
                </div>
            </div>

            {/* Kanban Columns Skeleton */}
            <div className="flex flex-col md:flex-row gap-6">
                {[1, 2, 3].map((col) => (
                    <div key={col} className="w-full md:w-1/3 bg-white/[0.03] rounded-xl p-4 min-h-[500px] border border-white/[0.08]">
                        <div className="flex justify-between items-center mb-6">
                            <div className="h-6 w-24 bg-white/[0.08] rounded animate-pulse"></div>
                            <div className="h-6 w-8 bg-white/[0.08] rounded-full animate-pulse"></div>
                        </div>
                        <div className="space-y-4">
                            {[1, 2, 3].map((card) => (
                                <div key={card} className="h-32 bg-white/[0.05] rounded-xl animate-pulse"></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
