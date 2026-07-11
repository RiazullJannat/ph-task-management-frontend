import React from 'react';

export default function Loading() {
    return (
        <main className="min-h-screen bg-[#030115] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                {/* Hero Section Skeleton */}
                <div className="flex flex-col items-center text-center space-y-8">
                    {/* Badge */}
                    <div className="h-8 w-48 bg-white/[0.05] rounded-full animate-pulse border border-white/[0.08]"></div>
                    
                    {/* Main Title */}
                    <div className="space-y-4 w-full max-w-4xl flex flex-col items-center">
                        <div className="h-16 w-[80%] md:w-[90%] bg-white/[0.05] rounded-xl animate-pulse"></div>
                        <div className="h-16 w-[60%] md:w-[70%] bg-white/[0.05] rounded-xl animate-pulse"></div>
                    </div>
                    
                    {/* Subtitle */}
                    <div className="space-y-3 w-full max-w-2xl flex flex-col items-center mt-6">
                        <div className="h-4 w-[90%] bg-white/[0.03] rounded-md animate-pulse"></div>
                        <div className="h-4 w-[70%] bg-white/[0.03] rounded-md animate-pulse"></div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center w-full">
                        <div className="h-12 w-40 bg-white/[0.08] rounded-full animate-pulse"></div>
                        <div className="h-12 w-40 bg-white/[0.03] border border-white/[0.08] rounded-full animate-pulse"></div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="mt-24 relative w-full h-[400px] max-w-5xl mx-auto border border-white/[0.08] rounded-2xl bg-white/[0.02] animate-pulse overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030115]/80 z-10"></div>
                </div>
            </div>
        </main>
    );
}
