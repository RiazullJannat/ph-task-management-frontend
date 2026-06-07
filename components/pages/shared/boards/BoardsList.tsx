import { TBoard } from '@/types/baordType/board.type';
import Link from 'next/link';

export default function BoardsList({ boards, workspaceId }: { boards: TBoard[], workspaceId: string }) {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {boards?.map((board) => (
                <Link 
                    href={`/projects/${workspaceId}/${board.id}`} 
                    key={board.id}
                    className="block group min-h-[160px] rounded-lg relative overflow-hidden transition-all hover:ring-2 hover:ring-white/50"
                    style={{ 
                        backgroundColor: board.background_color || '#3B82F6',
                        backgroundImage: board.cover_image_url ? `url(${board.cover_image_url})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    {/* Dark overlay for better text readability if there's an image */}
                    {board.cover_image_url && <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all" />}
                    
                    <div className="relative z-10 p-4 h-full flex flex-col">
                        <div className="flex justify-between items-start gap-2">
                            <h3 className="text-white font-semibold text-lg truncate drop-shadow-md">{board.name}</h3>
                            {board.isStarred && (
                                <span className="text-yellow-400 drop-shadow-md text-sm shrink-0">★</span>
                            )}
                        </div>
                        
                        <p className="text-white/80 text-sm mt-1 line-clamp-2 drop-shadow-sm flex-grow">
                            {board.description || "No description provided."}
                        </p>
                        
                        <div className="mt-4 flex flex-col gap-2">
                            <div className="flex flex-wrap gap-2">
                                <span className="text-[10px] font-medium backdrop-blur-md bg-black/40 text-white/90 px-2 py-1 rounded-md capitalize border border-white/10">
                                    {board.visibility}
                                </span>
                                {board.status && (
                                    <span className={`text-[10px] font-medium backdrop-blur-md px-2 py-1 rounded-md capitalize border border-white/10 ${board.status === 'active' ? 'bg-green-500/40 text-green-100' : 'bg-gray-500/40 text-gray-200'}`}>
                                        {board.status}
                                    </span>
                                )}
                            </div>
                            <div className="text-[10px] text-white/70 font-medium drop-shadow-sm mt-1">
                                {board.created_at ? `Created ${new Date(board.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}` : ''}
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
            
            {(!boards || boards.length === 0) && (
                <div className="col-span-full py-12 text-center text-[#9B98AE] border border-dashed border-[#2C293D] rounded-xl bg-white/5">
                    No boards found. Create a new board to get started!
                </div>
            )}
        </div>
    );
}
