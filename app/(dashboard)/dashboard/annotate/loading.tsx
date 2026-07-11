import React from 'react';

export default function Loading() {
    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-6 w-full">
            {/* Header Skeleton */}
            <div className="space-y-2 mb-8">
                <div className="h-8 w-56 bg-white/[0.08] rounded-md animate-pulse"></div>
                <div className="h-4 w-72 bg-white/[0.05] rounded-md animate-pulse"></div>
            </div>

            {/* Toolbar Skeleton */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-8">
                <div className="w-full xl:w-64 h-10 bg-white/[0.08] rounded-md animate-pulse"></div>
                <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
                    <div className="w-full sm:w-48 h-10 bg-white/[0.08] rounded-md animate-pulse"></div>
                    <div className="w-full sm:w-24 h-10 bg-white/[0.08] rounded-md animate-pulse"></div>
                </div>
            </div>

            {/* Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <div key={item} className="h-48 bg-white/[0.05] rounded-xl animate-pulse border border-white/[0.08]"></div>
                ))}
            </div>
        </div>
    );
}
