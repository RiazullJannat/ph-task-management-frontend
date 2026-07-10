'use client'
import dynamic from 'next/dynamic';
import { ProjectImage } from "@/types/annotate/annotate.types";

const CanvasView = dynamic(() => import('./AnotationClient'), {
    ssr: false,
    loading: () => (
        <div className="h-[75vh] w-full flex items-center justify-center bg-gray-900 border border-gray-800 rounded-xl">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-gray-400 font-medium">Loading Annotation Workspace...</div>
            </div>
        </div>
    )
});

export default function Anotation({ images }: { images: ProjectImage[] }) {
    return (
        <div className="w-full">
            <CanvasView images={images || []} />
        </div>
    );
}