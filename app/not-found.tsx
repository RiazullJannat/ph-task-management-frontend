"use client"
import { useRouter } from 'next/navigation';
import { Construction, ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-[#0A0815] flex flex-col items-center justify-center p-6 overflow-hidden relative selection:bg-[#51A2FF]/30">
            {/* Abstract Background Elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#51A2FF]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#DC3FFF]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />

            {/* Glassmorphic Container */}
            <div className="relative z-10 w-full max-w-2xl bg-white/[0.03] p-10 md:p-16 rounded-3xl border border-white/[0.08] backdrop-blur-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] text-center flex flex-col items-center group">
                
                {/* Floating Icon */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-[#FFB13F]/20 rounded-full blur-xl animate-pulse" />
                    <div className="w-24 h-24 bg-gradient-to-br from-[#FFB13F] to-[#F50F0F] rounded-2xl flex items-center justify-center shadow-lg relative z-10 transform group-hover:-translate-y-2 group-hover:rotate-6 transition-all duration-500">
                        <Construction className="w-12 h-12 text-white" />
                    </div>
                </div>

                {/* Typography */}
                <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 mb-4">
                    404
                </h1>
                
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Page Under Construction
                </h2>
                
                <p className="text-[#9B98AE] text-sm md:text-base max-w-md mx-auto mb-10 leading-relaxed">
                    Oops! The page you are looking for is currently being built or doesn't exist. Please check back later or return to the dashboard.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <button 
                        onClick={() => router.back()}
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white font-medium hover:bg-white/[0.1] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                    
                    <button 
                        onClick={() => router.push('/')}
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#51A2FF] to-[#3B82F6] text-white font-medium shadow-[0_0_20px_rgba(81,162,255,0.3)] hover:shadow-[0_0_30px_rgba(81,162,255,0.5)] hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
                    >
                        <Home className="w-4 h-4" />
                        Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;