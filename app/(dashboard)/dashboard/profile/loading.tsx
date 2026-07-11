import React from 'react';

export default function Loading() {
    return (
        <section className="min-h-screen p-6 space-y-6">
            <div className="space-y-4">
                <div className="h-8 w-32 bg-white/[0.08] rounded-md animate-pulse"></div>
                <div className="h-4 w-64 bg-white/[0.05] rounded-md animate-pulse"></div>
            </div>
            
            <div className="max-w-3xl space-y-4 mt-8">
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-white/[0.08] animate-pulse"></div>
                    <div className="space-y-2">
                        <div className="h-6 w-48 bg-white/[0.08] rounded animate-pulse"></div>
                        <div className="h-4 w-32 bg-white/[0.05] rounded animate-pulse"></div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                    <div className="h-24 bg-white/[0.03] border border-white/[0.08] rounded-xl animate-pulse"></div>
                    <div className="h-24 bg-white/[0.03] border border-white/[0.08] rounded-xl animate-pulse"></div>
                    <div className="h-24 bg-white/[0.03] border border-white/[0.08] rounded-xl animate-pulse"></div>
                    <div className="h-24 bg-white/[0.03] border border-white/[0.08] rounded-xl animate-pulse"></div>
                </div>
            </div>
        </section>
    );
}
